import { IEditTodoForm } from "@/interfaces/IEditTodoForm";
import { Todo } from "@/models/Todo";

export class EditTodoFormPresenter {
  constructor(private view: IEditTodoForm, private model: Todo) {}
  public setModel(todo: Todo) {
    this.model = todo;
  }
  public updateTodo() {
    this.view.todos[this.view.index] = {
      id: this.view.model.getId(),
      name: this.view.model.getName(),
      done: this.view.model.getDone(),
    };
    this.model.updateTodo();
  }
}
