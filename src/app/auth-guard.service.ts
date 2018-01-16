import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot}    from '@angular/router';
import {UserService} from "./user.service";

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(
    private userService : UserService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    console.log(url);
    if(url === "/todolist"){
      return this.checkLogin();
    }
    // switch(url){
    //   case "/todolist":
    //     console.log("b toto");
    //     return this.checkLogin();
    //
    //   case "/login": case "/register":
    //     console.log("b lll");
    //     return this.checkLogout();
    // }
  }

  checkLogin(): boolean {
    console.log("会话",sessionStorage["isLoggedIn"]);
    if (sessionStorage["isLoggedIn"] === "true") {
      console.log("会话2",sessionStorage["isLoggedIn"]);
      console.log("登录了");
      return true;
    }
    console.log("没登录");
    this.router.navigate(['/login']);
    return false;
  }
  // checkLogout(): boolean {
  //   console.log(this.userService.isLoggedIn);
  //   if (!this.userService.isLoggedIn) { console.log("没登录");return true; }
  //   this.router.navigate(['/todolist']);
  //   return false;
  // }
}
