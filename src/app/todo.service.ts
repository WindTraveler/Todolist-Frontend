import { Injectable } from '@angular/core';
import { Todo } from "./todo";

@Injectable()
export class TodoService {

  res: object = {
    "totalNum": 0,
    "leftNum": 0,
    "completedNum": 0,
    "isAllCompleted": false,
    "data": [
      {id: 0, content: "luffy", completed: true, deleted: false},
      {id: 1, content: "zoro", completed: false, deleted: true},
      {id: 2, content: "sanji", completed: false, deleted: false}
    ]
  }
  // todos: Array<{id: number, content: string, completed: boolean, deleted: boolean}> = [
  //   {id: 0, content: "luffy", completed: true, deleted: false},
  //   {id: 1, content: "zoro", completed: false, deleted: true},
  //   {id: 2, content: "sanji", completed: false, deleted: false}
  // ];

  constructor() { }

  /*
  更新
   */
  private update() {
    this.res["totalNum"] = this.res["data"].length;
    this.res["isAllCompleted"] = this.isAllComplete();
    this.res["leftNum"] = this.getLeftNum();
    this.res["completedNum"] = this.getCompletedNum()
  }

  //随机数
  private getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  //全部完成了吗？
  private isAllComplete() {
    return this.res["data"].every(item => item.completed === true)
  }
  //留下数量
  private getLeftNum() {
    var num = 0;
    this.res["data"].map(item => {
      if(!item.completed)
        num++;
    });
    return num;
  }
  //已完成数量
  private getCompletedNum() {
    var num = 0;
    this.res["data"].map(item => {
      if(item.completed)
        num++;
    });
    return num;
  }

  //------------公有方法-----------------------

  //获取所有
  getResponse() {
    this.update();
    return this.res;
  }

  //根据id返回单个todo
  getTodo(id) {
    return this.res["data"].find(item => item.id === id);
  }

  ///新增一个todo
  addTodo(content){
    this.res["data"].push({
      id: this.getRandomInt(0, 1000),
      content: content,
      completed: false,
      deleted: false
    })
    this.update();
  }

  //删除一个todo
  deleteTodo(id) {
    var i = this.res["data"].findIndex(item => item.id === id);
    console.log(i);
    this.res["data"].splice(i , 1);
    this.update();
  }

  //设置为全部的完成状态
  setAllCompletedState(){
    var flag = !this.res["isAllCompleted"];
    this.res["data"].forEach(item => item.completed = flag);
    this.update();
  }

  //设置单个的完成状态
  setCompeltedState(id) {
    var i = this.res["data"].findIndex(item => item.id === id);
    console.log(i);
    this.res["data"][i].completed = !this.res["data"][i].completed;
    this.update();
  }

  //部分删除
  deleteCompleted() {
    this.res["data"] = this.res["data"].filter(item => !item.completed);
    this.update();
  }
}
