import { Component, OnInit, Input} from '@angular/core';
import {Todo} from "../entity/todo";
import {TodoService} from "../todo.service";

@Component({
  selector: 'app-todo-item',
  template: `
    <div>
      <div class="view"
           [ngClass]="{hidden: viewHide}"
           (dblclick)="onDbclick(item)">
        <input type="checkbox" class="toggle" 
               [ngModel]="todo.completed" 
               (click)="onCbClick($event)" (dblclick)="$event.stopPropagation()">
        <label [ngClass]="{completed:todo.completed}">{{ todo.content }}</label>
        <a class="destroy" (click)="onDelete()"></a>
      </div>
      <input class="edit" type="text" #item
             [ngClass]="{hidden: editHide}"
             [(ngModel)]="todo.content"
             (blur)="onBlur($event)" 
             (keydown.enter)="onBlur()">
    </div>
  `,
  styleUrls: ["./todo-item.component.css"]
})
export class TodoItemComponent implements OnInit {
  @Input() id: number;
  todo: Todo;
  viewHide: boolean = false;
  editHide: boolean = true;

  constructor(private todoService: TodoService) { }
  ngOnInit() {
    this.todo = this.todoService.getTodo(this.id)
  }

  editMode() {
    this.viewHide = true;
    this.editHide = false;
    //inputDom.focus;
  }
  viewMode() {
    this.viewHide = false;
    this.editHide = true;
  }

  //事件响应
  onDbclick(inputDom) {
    //todo 可以试一下preventDefault方法
    this.editMode();
    //inputDom.focus();
    setTimeout(() => {
      inputDom.focus();
    }, 0);

  }
  onBlur($event){
    this.viewMode();

    //todo 如果内容为空则删除
    //todo 不为空则更新
    if($event.target.value){
      this.todoService.updateTodo(this.todo);
    }
    else{
      this.onDelete();
    }

  }

  onCbClick(e) {
    //todo http请求成功之后再设置完成状态
    this.todo.completed = !this.todo.completed;
    //this.todoService.setCompeltedState(this.id);
    this.todoService.updateTodo(this.todo);
    console.log(e);
    e.stopPropagation();
  }
  onDelete() {
    this.todoService.deleteTodo(this.id);
  }
}
