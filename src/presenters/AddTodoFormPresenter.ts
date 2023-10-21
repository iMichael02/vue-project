import { IAddTodoForm } from "@/interfaces/IAddTodoForm";
import { Todo } from "@/models/Todo";

export class AddTodoFormPresenter {
  constructor(private view: IAddTodoForm, private model: Todo) {}
  public setModel(todo: Todo) {
    this.model = todo;
  }
  public newTodo() {
    this.view.todos.push({
      id: this.view.todo.getId(),
      name: this.view.todo.getName(),
      done: this.view.todo.getDone(),
    });
    this.model.createTodo();
  }
}
