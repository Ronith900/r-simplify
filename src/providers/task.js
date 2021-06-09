import axios from "axios";

class Tasks {
  api_url = "http://localhost:8000/api/tasks/";

  async getTasks(user_id) {
    const { data: tasks } = await axios.get(this.api_url + "?ID=" + user_id);
    return tasks;
  }

  createUpdateTask(task, edit_existing) {
    if (edit_existing) {
      return axios.put(this.api_url + task.id + "/", task);
    }
    return axios.post(this.api_url, task);
  }

  getCurrentUser(user_id) {
    return axios.get("https://b-simplify.herokuapp.com/current_user/" + user_id).then(result => result.data);
  }

  deleteTask(task_id) {
    return axios.delete(this.api_url + task_id);
  }
}

export default Tasks;
