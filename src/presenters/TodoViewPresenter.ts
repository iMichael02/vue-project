import TodosView from "@/views/TodosView.vue";
import { Todo } from "@/models/Todo";

export class TodoViewPresenter {
  constructor(private view: typeof TodosView, private model: Todo) {}
  public loadDataToView() {
    const todos = this.model.getTodos();
    this.view
  }
}