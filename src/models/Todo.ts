import { createData, deleteData, loadData, updateData } from "@/services";

export class Todo {
  constructor(private id: number, private name: string, private done: boolean) {}
  public getId() {
    return this.id;
  }
  public setId(id: number) {
    this.id = id;
  }
  public getName() {
    return this.name;
  }
  public setName(name: string) {
    this.name = name;
  }
  public getDone() {
    return this.done;
  }
  public setDone(done: boolean) {
    this.done = done;
  }
  public getTodos() {
    return loadData("todos");
  }
  public createTodo() {
    let data = {
      id: this.id,
      name: this.name,
      done: this.done,
    }
    createData("todos", JSON.stringify(data));
  }
  public updateTodo() {
    let data = {
      id: this.id,
      name: this.name,
      done: this.done,
    }
    updateData("todos", this.id, JSON.stringify(data));
  }
  public deleteTodo() {
    deleteData("todos", this.id);
  }
}