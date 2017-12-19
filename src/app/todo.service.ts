import { Injectable } from '@angular/core';
import { Todo } from "./entity/todo";

import { Headers, Http } from "@angular/http"

import 'rxjs/add/operator/toPromise';

@Injectable()
export class TodoService {

  private base = "http://localhost:5270/api";
  private todosUrl = this.base + '/todos/';  // URL to web api
  private compeletedUrl = this.base + "/compeleted/";
  private  delUrl = this.base + "/delete/";

  private headers = new Headers({'Content-Type': 'application/json'});

  res: object = {
    "totalNum": 0,
    "leftNum": 0,
    "completedNum": 0,
    "isAllCompleted": false,
    "data": []
  }
  // todos: Array<{id: number, content: string, completed: boolean, deleted: boolean}> = [
  //   {id: 0, content: "luffy", completed: true, deleted: false},
  //   {id: 1, content: "zoro", completed: false, deleted: true},
  //   {id: 2, content: "sanji", completed: false, deleted: false}
  // ];

  constructor(private http : Http) { }

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

  //update-全部完成了吗？
  private isAllComplete() {
    return this.res["data"].every(item => item.completed === true)
  }
  //update-留下数量
  private getLeftNum() {
    var num = 0;
    this.res["data"].map(item => {
      if(!item.completed)
        num++;
    });
    return num;
  }
  //update-已完成数量
  private getCompletedNum() {
    var num = 0;
    this.res["data"].map(item => {
      if(item.completed)
        num++;
    });
    return num;
  }

  //错误处理
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  //------------公有方法-----------------------

  //获取所有
  getResponse(): Promise<object> {
    this.update();
    //return this.res;
    return this.http.get(this.todosUrl)
      .toPromise()
      .then(response => {
        this.res["data"] = response.json().data as Todo[]
        this.update()
        return this.res
      })
      .catch(this.handleError);
  }

  //更新单个todo
  updateTodo(todo: Todo){
    return this.http
      .put(this.todosUrl, JSON.stringify(todo), {headers: this.headers})
      .toPromise()
      .then(response => {
        if(response.json().success)
          this.update();
      })
      .catch(this.handleError);
  }

  //根据id返回单个todo
  getTodo(id) {
    return this.res["data"].find(item => item.id === id);
  }

  ///新增一个todo
  addTodo(content){
    // this.res["data"].push({
    //   id: this.getRandomInt(0, 1000),
    //   content: content,
    //   completed: false,
    //   deleted: false
    // })
    return this.http
      .post(this.todosUrl, JSON.stringify({content: content}), {headers: this.headers})
      .toPromise()
      .then(response => {
        var newTodo = response.json().data[0];
        this.res["data"].unshift(newTodo);
        this.update();
      })
      .catch(this.handleError);
  }

  //删除一个todo
  deleteTodo(id) {
    // var i = this.res["data"].findIndex(item => item.id === id);
    // console.log(i);
    // this.res["data"].splice(i , 1);
    // this.update();
    return this.http
      .put(this.delUrl, JSON.stringify({"idList": [id]}), {headers: this.headers})
      .toPromise()
      .then(response =>{
        if(response.json().success){
          var i = this.res["data"].findIndex(item => item.id === id);
          console.log(i);
          this.res["data"].splice(i , 1);
          this.update();
        }
      })
      .catch(this.handleError);
  }

  //设置为全部的完成状态
  setAllCompletedState(){
    var flag = !this.res["isAllCompleted"];

    return this.http
      .put(this.compeletedUrl, JSON.stringify({
        "type": (flag) ? "1" : "0"
      }), {headers: this.headers})
      .toPromise()
      .then(response => {
        this.res["data"].forEach(item => item.completed = flag);
        this.update();
      })
      .catch(this.handleError);
  }

  //设置单个的完成状态
  setCompeltedState(id) {
    // var i = this.res["data"].findIndex(item => item.id === id);
    // console.log(i);
    // this.res["data"][i].completed = !this.res["data"][i].completed;
    // this.update();
  }

  //批量删除已完成的todo
  deleteCompleted() {
    var idList = [];

    this.res["data"].forEach(item => {
      if(item.completed)
        idList.push(item.id)
    })

    // this.res["data"] = this.res["data"].filter(item => !item.completed);
    // this.update();

    return this.http
      .put(this.delUrl, JSON.stringify({idList: idList}), {headers: this.headers})
      .toPromise()
      .then(response => {
        //response = response.json();
        this.res["data"] = response.json().data;
        this.update();
      })
      .catch(this.handleError);
  }
}
