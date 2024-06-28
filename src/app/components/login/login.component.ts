import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { GameUserService } from '../../services/game-user.service';
import { User } from '../../interfaces/User';
import { LoginRequest } from '../../interfaces/LoginRequest';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginError: string = '';
  loginForm = this.formBuilder.group({
    email:['', [Validators.required, Validators.email]],
    password:['', [Validators.required]]
  })

  constructor(private formBuilder: FormBuilder, 
              private router: Router, 
              private loginService: GameUserService,
              private toastr: ToastrService){

  }
  ngOnInit(): void {
    
  }
  get email(){
    return this.loginForm.controls.email;
  }
  get password(){
    return this.loginForm.controls.password;
  }

  login2():void{
    if(this.loginForm.valid){
      this.loginService.loginServer(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) =>{
            this.toastr.success("Has iniciado sesión", 'Sesión iniciada!');
            this.router.navigateByUrl('/games');
            this.loginForm.reset();
        },
        error : (e: HttpErrorResponse) =>{
          if(e.error.msg){
            this.toastr.error(e.error.msg, 'Error');
          } else {
            this.toastr.error("Ha ocurrido un error, comuniquese con el administrador", 'Error');
          }
          //this.loginError = error;
          //alert(errorData);
        }, complete: () => {}
      });
      
    }else{
      this.loginForm.markAllAsTouched();
      //this.toastr.success('Todos los campos son requeridos', 'Error!');
      this.loginError = "Todos los campos son requeridos";
    }
  }


  login():void{
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) =>{
          console.log(userData);
        },
        error: (errorData) =>{
          console.error(errorData);
        this.loginError = errorData;
        },
        complete: () =>{
          console.info("Login completado");
          this.router.navigateByUrl('/games');
          this.loginForm.reset();
        }

      });
      
    }else{
      this.loginForm.markAllAsTouched();
      this.loginError = "todos los campos son requeridos";
      
    }
  }

}
