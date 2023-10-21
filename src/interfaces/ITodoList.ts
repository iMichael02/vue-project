export interface ITodoList {
  todos: Array<{ id: number, name: string, done: boolean }>,
  todosLoaded: boolean,
  newId: number,
  showCompleted: boolean,
  filteredTodos: Array<{ id: number, name: string, done: boolean }>,
  displayedTodos: Array<{ id: number, name: string, done: boolean }>,
  page: number,
  loadDataToView(): () => void,
  handleCompletedTodo(todo: object): () => void,
  handleDeletedTodo(todo: object): () => void,
}