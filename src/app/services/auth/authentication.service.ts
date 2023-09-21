import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { environment } from 'src/app/environments/environment.dev';
import { TokenService } from '../token/token.service';

//Hedaer Option
const httpOption = {
  headers: new HttpHeaders({
      // 'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Headers': 'Content-Type',
      // 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',

  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  //VARIABLES
  private  api = environment.hostLine+"/users";

  private loggedIn = new BehaviorSubject<boolean>(this.isloggedIn());
  
  public authStatus =  this.loggedIn.asObservable();

  //CONSTRUCTEUR
  constructor(
      private http: HttpClient,
      private token: TokenService,
    ) { }

/************************************************
   *        METHODES UTILES
   ************************************************/
   


  private log(log: string){
    console.info(log)
  }

  private handleError<T>(operation = 'operation', result?: T) {

    return (error: any): Observable<T> => {

      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);

    };

  }

  /************************************************
   *        METHODES
   ************************************************/
  register(obj: any){

    return this.http.post(this.api+"/register", obj, httpOption).pipe(

      catchError(this.handleError(`register`, obj))

    )

   }



//    register(
//     nom     : string, 
//     prenom  : string, 
//     tel     : string, 
//     email   : string, 
//     adresse : string, 
//     pwd     : string,
//     role    : string){

// return this.http.post(this.api+"/register", {nom, prenom, tel, email, adresse, pwd, role}, httpOption).pipe(

// catchError(this.handleError(`register`, {nom, prenom, tel, email, adresse, pwd, role}))

// )

// }

  login(obj:any){

    return this.http.post(this.api+"/login", obj, httpOption).pipe(

      catchError(this.handleError(`login`, obj))

    )

   }

   isloggedIn(){

    return this.token.isValid()

  }
 
  changeAuthStatus(value: boolean){

    this.loggedIn.next(value)

  }

}//#
