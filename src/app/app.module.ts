import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {AppRoutingModule} from "./app-routing.module";
import { HttpModule } from '@angular/http'

//组件
import { AppComponent } from './app.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodosComponent } from './todos/todos.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'

//服务
import {TodoService} from "./todo.service";
import {UserService} from "./user.service";
import {AuthGuardService} from "./auth-guard.service";

@NgModule({
  declarations: [
    AppComponent,
    TodoItemComponent,
    TodosComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [TodoService, UserService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
