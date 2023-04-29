class TaskModel {
  #tasks = [];

  #updateCallbacks = [];
  constructor() {}

  set tasks(value) {
    this.#tasks = value;
    this.#update();
  }

  #update() {
    this.#updateCallbacks.forEach((c) => c(this.#tasks));
  }

  addUpdateCallback(updateCallback) {
    if (!updateCallback || !(updateCallback instanceof Function)) {
      throw new Error(`Wrong callback : ${updateCallback}`);
    }
    this.#updateCallbacks.push(updateCallback);
  }

  getTaskById(id) {
    const taskId = parseInt(id);
    const taskVO = tasks.find((task) => task.id === taskId);
    console.log('> taskVO:', taskVO);
    return taskVO;
  }

  deleteTaskById(taskId) {
    console.log('> TaskModel -> deleteTaskById:', taskId);
    const index = this.#tasks.indexOf(taskVO);
    this.#tasks.splice(index, 1);
    this.#update();
    // this.tasks = this.#tasks. filter((taskVO) => taskVO.id !== taskId);
  }

  addTask(taskVO) {
    console.log('TaskModel -> addTask:', taskVO);
    this.#tasks.push(taskVO);
    this.#update();
  }
}
export default TaskModel;
