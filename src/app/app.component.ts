import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GameCartService } from './services/game-cart.service';
import { GameUserService } from './services/game-user.service';
import { User } from './interfaces/User';
import { LoginRequest } from './interfaces/LoginRequest';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy{
  userLoginOn: boolean = false;
  userData: LoginRequest = {email:'', password: ''}
  open: boolean = false;
  
  constructor(private gameService: GameCartService,private loginService: GameUserService){
  }
  
  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) =>{
        this.userLoginOn = userLoginOn;
      }
    });
    this.loginService.currentUserData.subscribe({
      next:(userData) =>{
        this.userData = userData;
      }
    })
    
  }
  ngOnDestroy(): void {
    this.loginService.currentUserLoginOn.unsubscribe(); 
  }

  closeSession(){
    //this.userLoginOn = false;
    this.loginService.closeSession();
  }
  filter(event: Event){
    const inputElement = event.target as HTMLInputElement;
    const search: string = inputElement.value;
    this.gameService.filter(search);
  }

  toggleClass(){
    this.open = !this.open;
  }

  getClassMenu(): {}{
    let rdo:{} = {'menu-user': true};
      if(this.open){
      rdo = {
        'menu-user': true,
        'open': true,
      } 
    } 
    return rdo;
  }

}
