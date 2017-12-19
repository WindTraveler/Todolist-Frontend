import { Component, OnInit } from '@angular/core';
import {TodoService} from "../todo.service";
import {Todo} from "../entity/todo";

import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-todos',
  template: `
    <div class="container">
      <button (click)="onLogout()">Log Out</button>
      <h1>Todos</h1>
      <input #new_todo id="new_todo" type="text" placeholder="What needs to be done?"
             (keydown.enter)="onEnter($event, new_todo)">
      <div *ngIf="res.totalNum > 0">
        <section>
        <input id="toggle_all"type="checkbox"
               [ngModel]="res.isAllCompleted" 
               (click)="onToggleAllClick()">
        <label id="mark" for="toggle_all">Mark all as complete</label>
  
        <ul>
          <li *ngFor="let todo of res.data; index as i">
            <app-todo-item [id]="todo.id"></app-todo-item>
          </li>
        </ul>
      </section>
        <footer>
        <label><b>{{ res.leftNum }}</b> item left</label>
        <a href="javascript:void(0)" 
           *ngIf="res.completedNum > 0"
           (click)="onDeleteCompleted()">Clear {{ res.completedNum }} completed item</a>
      </footer>
      </div>
    </div>
  `,
  styleUrls: ["./todos.component.css"]
})
export class TodosComponent implements OnInit {
  res: object;

  constructor(
    private todoService: TodoService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    //this.res = this.todoService.getResponse();
    this.todoService.getResponse().then(res =>{
      this.res = res;
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
