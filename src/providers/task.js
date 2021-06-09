import axios from "axios";
import s_base from './s_base';

class Tasks {
  constructor(){
    this.tokenString = localStorage.getItem('token')
    this.userToken = JSON.parse(this.tokenString);
    this.header = {Authorization: `Token ${this.userToken?.token}`}
  }
  api_url = "/api";

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
    return s_base.get("/current_user/" + user_id).then(result => result.data);
  }

  deleteTask(task_id) {
    return axios.delete(this.api_url + task_id);
  }
}

export default Tasks;
