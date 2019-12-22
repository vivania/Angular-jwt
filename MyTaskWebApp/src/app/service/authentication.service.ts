import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
//import { Observable } from 'rxjs';
import { JwtHelper } from "angular2-jwt";
import { Observable, observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = "http://localhost:8085";
  jwtToken : string;
  roles : Array<any> = [];
  
  /* Definition du chemin du login */
  login(user: any) {
    return  this.http.post(this.baseUrl + "/login", user, { observe: 'response' });
   }

    register(user: any) {
    return  this.http.post(this.baseUrl + "/register", user);
   }


 /*   register(user: any){
    let headers = new Headers();
    headers.append("Authorization", this.jwtToken);
     return this.http.post(this.baseUrl + "/register", user, {headers: new HttpHeaders({'Authorization': this.jwtToken})});
   }  */

   saveTask(task: any){
    let headers = new Headers();
    headers.append('Authorization', this.jwtToken);
    return  this.http.post(this.baseUrl + "/save", task, {headers: new HttpHeaders({'Authorization': this.jwtToken})});
   }

   /* Enregistrement du token dans le localStorage recuperé */
   saveToken(jwt: any): void {
    this.jwtToken = jwt;
    localStorage.setItem('token', jwt);
    /* L'instanciation de jwtHelper permet derecupéré les claims et notament les roles   */
    let jwtHelper = new JwtHelper();
    this.roles = jwtHelper.decodeToken(this.jwtToken).roles;
   }

   //Avec le systeme
   getTask(){
     if(this.jwtToken == null) this.loadToken();
     return this.http.get(this.baseUrl + "/task", {headers: new HttpHeaders({'Authorization': this.jwtToken})}); 
   }

   logOut(){
     this.jwtToken == null;
     localStorage.removeItem('token');
   }

   isAdmin(){ 
     for(let role of this.roles){
       if(role.authority == "ADMIN"){
        return true;
       }
     }
   }

   //Cette method charge le token stocké en memoire
   loadToken(){
   this.jwtToken = localStorage.getItem('token')
   return this.jwtToken;
   }
}
