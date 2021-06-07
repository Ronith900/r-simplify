import axios from "axios";
import s_base from './s_base';

class Token {
  api_url = "/authenticate/";

  getAccessToken(credentials) {
    return s_base.post(`${this.api_url}`,credentials)

  }
}

export default Token;
