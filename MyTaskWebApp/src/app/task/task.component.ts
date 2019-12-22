import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../service/authentication.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  //Represente l'object
  task: any;
  constructor(public authService: AuthenticationService, private route: Router) { }

  ngOnInit() {
    //Apple de la page task
    this.authService.getTask().
    subscribe(data => {
      this.task = data;
      console.log(this.task)
    }, error => { 
      //Si le token est expiré alors retour a la page login / et permet de deconnecté
      console.log(error);
      this.authService.logOut();
      this.route.navigate[('/login')];
    })
  }

  newTask(){
    this.route.navigateByUrl('/new-task');
  }
}
