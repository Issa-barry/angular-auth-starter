import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { TokenService } from 'src/app/services/token/token.service';
 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private submitted;


  constructor(
    private router      : Router,
    private fb          : FormBuilder ,
    private route       : ActivatedRoute,
    private authService : AuthenticationService,
    private token       : TokenService){
    this.submitted = false;
  }

 
 ngOnInit() {

}


  /********************************************************************
   *
   *                  GESTION DU FORMULAIRE, REACTIVEFORM
   *
   ********************************************************************/
  error_messages   = {
    'mail' : [
      {type:'required', message:'L\'mail est obligqtoire.'},
      {type: 'pattern', message: 'Format d\'mail invalid.' },
    ],
    'pwd' : [
      {type:'required', message:'Le mot de passe est obligqtoire.'},
       {type: 'minlength', message: 'Mot de passe trop court.' },
      {type: 'maxlength', message: 'Mot de passe trop trop long.' },
      // {type: 'pattern', message: 'Fortmat mot de passe non valide.' },
    ],

  }

  loginForm: FormGroup = this.fb.group({

    mail: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100),
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ])),

    pwd: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(200),
      // Validators.pattern(
      //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/
      // ),
    ])),

  })

    // Getter pour un accès facile aux champs du formulaire (loginForm)
    get f() { return this.loginForm.getRawValue(); }

  /********************************************************************
   *                  GESTION LOGIN
   *
   ********************************************************************/

  user = {
    "mail": "messi@gmail.com",
    "pwd": "azerty"
  }

  onSubmit() {

      this.submitted = true;

        // Si on a des erreurs on stop
        if (this.loginForm.invalid) {
          return;
      }
      
      this.authService.login(this.f).subscribe(
        (data:any) => {this.handleResponse(data)},
      )//fin subscribe
  }

  handleResponse(data:any){

    this.token.handle(data.token);
   
    this.authService.changeAuthStatus(true);

    this.router.navigate(['/dashboard']).then(() => {
      window.location.reload();
    });
     
  }



} //Fin login component
