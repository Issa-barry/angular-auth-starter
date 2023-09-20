import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  public loggedIn: boolean = false;

  constructor(

    private authService : AuthenticationService,
    private router      : Router,
    private token       : TokenService

  ){}

  ngOnInit(): void {

     this.authService.authStatus.subscribe(value => this.loggedIn = value)
     console.log(this.loggedIn);
     
  }

  logout(event: MouseEvent)
  {
    event.preventDefault();
     
    this.authService.changeAuthStatus(false);

    this.token.remove();

    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}
