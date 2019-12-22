import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: any;
  mode: number = 0;
  errorMessage: string;

  constructor(private authService: AuthenticationService, private route: Router) { }

  ngOnInit() {
    }

  onRegister(user: any){
    this.authService.register(user).subscribe(
      RespnseData => {
        console.log(RespnseData);
        this.user = RespnseData;
        this.mode = 1;
      },
      err => {
        this.errorMessage = err.error
        this.mode = 0; 
      });
  }

}
