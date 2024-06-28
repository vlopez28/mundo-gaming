import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription, catchError, tap, throwError } from 'rxjs';
import { LoginRequest } from '../interfaces/LoginRequest';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class GameUserService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<LoginRequest> = new BehaviorSubject<LoginRequest>({email:'', password:''});

  constructor(private http: HttpClient) {}

  login(credentials:LoginRequest): Observable<User>{
    return this.http.get<User>('../assets/data.json').pipe(
      tap( (userData: User) =>{
       // this.currentUserData.next(userData);
        this.currentUserLoginOn.next(true);
      }),
      catchError(this.handleError)
    );
  }
  //loguear en el server
  loginServer(credentials:LoginRequest): Observable<any>{
    console.log(credentials, "llega")
    const result = this.http.post('http://localhost:3001/api/users/login', credentials);
    //this.currentUserData.next()
    this.currentUserLoginOn.next(true);
    console.log("resultado",result);
    return result;
  }

  closeSession(){
    this.currentUserLoginOn.next(false);
  }

  private handleError(error:HttpErrorResponse){
    if(error.status === 0){
      console.error("Se ha producido un error ", error.error)
    } else{
      console.log("Código de estado ", error.status, error.error);
    }
    return throwError(() => new Error("Algo falló. Por favor intente nuevamente"));
  }

  getUserData():Observable<LoginRequest>{
    return this.currentUserData.asObservable();
  }

  getUserLoginOn():Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }
}
