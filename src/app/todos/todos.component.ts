import { Component, OnInit } from '@angular/core';
import {TodoService} from "../todo.service";
import {Todo} from "../entity/todo";

import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {TodoResInterface} from "../entity/todo-res-interface";

@Component({
  selector: 'app-todos',
  templateUrl: "./todos.component.html",
  styleUrls: ["./todos.component.css"]
})

export class TodosComponent implements OnInit {
  public res: TodoResInterface;

  constructor(
    private todoService: TodoService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    //this.res = this.todoService.getResponse();
    this.todoService.getResponse().then(res =>{
      this.res = res as TodoResInterface;
      console.log(this.res)
    })
  }

  //事件处理

  //Done
  // 输入一个新项
  onEnter(event, inputDom) {
    if(inputDom.value.trim()){
      this.todoService.addTodo(inputDom.value);
      inputDom.value = null;
      //console.log(this.todos)
    }
  }

  //全选或全反选
  onToggleAllClick() {
    this.todoService.setAllCompletedState();
  }
  //部分删除
  onDeleteCompleted() {
    this.todoService.deleteCompleted();
    console.log(this.res["data"]);
    //console.log(this.todos);
  }

  onLogout(){
    this.userService.logout()
      .then(response => {
        if(response.success){
          sessionStorage["isLoggedIn"] = false;
          //this.userService.setIsLoggedIn(true);
          this.router.navigate(["/login"])
        }
      });
  }
}
