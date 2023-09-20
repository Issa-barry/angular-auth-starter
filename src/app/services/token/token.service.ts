import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { environment } from 'src/app/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  handle(token: any){

      this.set(token)     

  }

  set(token: any){

    localStorage.setItem('token', token);

  }

  get(){

    return localStorage.getItem('token');

  }

  remove(){

    localStorage.removeItem('token');

  }

  isValid(){

    const token = this.get();

    if(token){
       const payload = this.decode(token);

       if(payload){
        // return payload.iat === environment.hostLine ? true : false
        return true;
       }
    }

    return false;

  }

  //le token seule en chaine de caracter
  payload(token:any){ 

    const payload = token.split('.')[1];
    
    return payload;

  }

  decode(token:any)
  {

    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }

    // return JSON.parse(atob(token));
  }



}//Fin token
