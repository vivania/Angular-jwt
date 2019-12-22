import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../service/authentication.service";
import { NgModule } from "@angular/core";
import { Router } from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  task : any;
 
  constructor(private authService: AuthenticationService, private route: Router) { }
  mode: number = 0;

  ngOnInit() {
    let jwt = this.authService.loadToken();
    if(jwt){
      this.route.navigateByUrl("/task");
    }
  }

  onLogin(user: any){
    console.log(user);
    this.authService.login(user).subscribe(
      resp => {
      /* Cette declaration verifie si le mot de passe est ok 
      et donne l'authorisation, et le save dans la base de donné*/
      let jwt = resp.headers.get('Authorization');
      console.log(jwt);
      this.authService.saveToken(jwt);
      this.route.navigateByUrl('/task');
    }, 
    error => {
      this.mode = 1;
      console.log(error)
    });
  }

  onRegister(){
    this.route.navigateByUrl("/register");
  }
}
