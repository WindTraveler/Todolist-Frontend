import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errMsg:string;
  username: string;
  pwd: string;
  confirm: string;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  //表单验证
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

    if(!this.confirm){
      this.errMsg = "Confirm is required."; return false;
    }
    if(this.pwd != this.confirm){
      console.log(this.pwd, this.confirm);
      this.errMsg = "Please make sure the two entered passwords are consistent."; return false;
    }

    this.errMsg = "";
    return true;
  }

  //注册
  onRegister(){
    if(this.validation()){
      //console.log("pass");
      var userInfo = {
        "username": this.username,
        "pwd": this.pwd
      }
      this.userService.register(userInfo)
        .then(response =>{
          if(response.success){
            //console.log("注册成功")
            this.router.navigate(["/login"]);
          }
          else{
            this.errMsg = response.errorMsg;
          }
        })
    }
  }
}
