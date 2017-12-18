import { Component } from '@angular/core';
import {TodoService} from "./todo.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Todo List';
  constructor() {}

  // onUpdate(id, text){
  //   this.mailService.update(id, text);
  //   console.log(this.mailService.message)
  // }
}
