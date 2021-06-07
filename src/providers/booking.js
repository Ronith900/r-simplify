import s_base from './s_base';

class BookingProvider {

  constructor(){
    this.tokenString = localStorage.getItem('token')
    this.userToken = JSON.parse(this.tokenString);
    this.header = {Authorization: `Token ${this.userToken?.token}`}
  }
  api_url = "/api";
  

  async getUserBookings(){
    const { data: Userbookings } = await s_base.get(`${this.api_url}/booking/booking_list/`,{headers:this.header});
    return Userbookings;
  }

  async getShopOwnerBookings(){
    const {data:shopOwnerBookings} = await s_base.get(`${this.api_url}/booking/shop_owner_booking`,{headers:this.header})
    return shopOwnerBookings;
  }

  async getUserCart(){
    const { data: cart } = await s_base.get(`${this.api_url}/booking/cart_list/`,{headers:this.header});
    return cart;
  }

  createUpdateBooking(booking,cart) {
    if(cart){
      return s_base.put(`${this.api_url}/booking/${booking.id}/`, booking,{headers:this.header}).then((result) => result.data);
    }
    return s_base.post(`${this.api_url}/booking/`, booking,{headers:this.header});
  }

  deleteBooking(bookingID) {
    return s_base.delete(`${this.api_url}/booking/${bookingID}/`,{headers:this.header});
  }

}
export default BookingProvider;
