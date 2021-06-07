import axios from "axios";
import s_base from './s_base';

class Shops {
  constructor(){
    this.tokenString = localStorage.getItem('token')
    this.userToken = JSON.parse(this.tokenString);
    this.header = {Authorization: `Token ${this.userToken?.token}`}
  }
  api_url = "/api";


  async getRentalShops(user_id) {
    const { data: shops } = await s_base.get(`${this.api_url}/shops/`,{headers:this.header});
    return shops;
  }

  async getCycles(shop_id){
    const { data: cycles } = await s_base.get(`${this.api_url}/cycles/list_cycles_shops/?ID=${shop_id}`,{headers:this.header});
    return cycles;
  }

  async getShopDetail(shop_id){
    console.log(shop_id)
    const { data: shop } = await s_base.get(`${this.api_url}/shops/shop_name/?shop_id=${shop_id}`,{headers:this.header});
    return shop;
  }


}
export default Shops;
