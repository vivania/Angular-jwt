import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  user: any;
  mode: number = 0;
  errorMessage: string;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  onRegister(user: any){
    this.authService.register(user).subscribe(
      RespnseData => {
        this.user = RespnseData;
        this.mode = 1;
      },
      err => {
        this.errorMessage = err.error;
        this.mode = 0; 
      });
  }


}
