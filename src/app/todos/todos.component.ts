import { Component, OnInit } from '@angular/core';
import {TodoService} from "../todo.service";
import {Todo} from "../todo";

@Component({
  selector: 'app-todos',
  template: `
    <div>
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

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.res = this.todoService.getResponse();
    //this.todos = this.res["data"] as Todo[];
  }

  //事件处理
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
}
