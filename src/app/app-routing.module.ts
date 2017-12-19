/**
 * Created by maxiangyu on 2017/12/18.
 */
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {TodosComponent} from "./todos/todos.component";
import {AuthGuardService} from "./auth-guard.service";

const routes : Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'todolist', component: TodosComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
