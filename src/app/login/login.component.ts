import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {UserService} from "../user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  pwd: string;
  errMsg: string;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  //验证
  validation(){
    if(!this.username){
      this.errMsg = "Email is required."; return false;
    }
    if(!/^\w+@[\w\.]+$/.test(this.username)){
      this.errMsg = "Please enter a correct format email."; return false;
    }

    if(!this.pwd){
      this.errMsg = "Password is required."; return false;
    }
    if(this.pwd.length < 6){
      this.errMsg = "The length of password is at least 6."; return false;
    }
    this.errMsg = "";
    return true;
  }

  onLogin(){
    if(this.validation()){
      var userInfo = {
        "username": this.username,
        "pwd": this.pwd
      }
      this.userService.login(userInfo)
        .then(response =>{
          if(response.success){
            sessionStorage["isLoggedIn"] = true;
            this.router.navigate(["/todolist"])
          }
          else {
            this.errMsg = response.errorMsg;
          }
        });
    }
  }
}
