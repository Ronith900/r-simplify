import React from "react";
import BookingProvider from "../providers/booking";
import { Table, Image, DropdownButton, Dropdown, ButtonGroup } from "react-bootstrap";

class Owner extends React.Component {
  constructor(props) {
    super(props);
    this.state = { totalBookings: [] };
  }

  async componentDidMount() {
    const totalBookings = await new BookingProvider().getShopOwnerBookings();
    this.setState({ totalBookings });
  }

  getTotalCost(cycleCost, quantity) {
    return (quantity * parseFloat(cycleCost)).toFixed(2);
  }

  async actionStatus(status,cartObj){
    const cartData = {
        id:cartObj.id,
        user: cartObj.user_obj.url,
        shop: cartObj.shop_obj.url,
        cycle: cartObj.cycle_obj.url,
        total_number: cartObj.total_number,
        total_cost: this.getTotalCost(
            cartObj.cycle_obj.cost_per_hour,
            cartObj.total_number
        ),
        booking_status:status
      };
      const cartBooked = await new BookingProvider().createUpdateBooking(cartData,true);
      if(cartBooked.booking_status === 'rented'){
        cartObj.booking_status = cartBooked.booking_status;
        cartObj.updated_at = cartBooked.updated_at;
        const tasks = [...this.state.totalBookings];
        const index = tasks.indexOf(cartObj);
        tasks[index] = { ...cartObj };
        this.setState({ totalBookings: tasks});
      }else{
        const cart = this.state.totalBookings.filter((cart) => cart.id !== cartObj.id);
        this.setState({ totalBookings: cart });
        this.props.cycleReturned()
      }


  }

  getActionDetials(status){
      if(status === 'booked'){
          return [{val:'rented',Dval:'Rented'}]
      }else if(status === 'rented'){
          return [{val:'returned',Dval:'Returned'}]
      }else{
        return [{val:'alldone',Dval:'AllDone'}]
      }
  }
  render() {
    return (
      <>
        <Table striped bordered hover responsive className="text-center">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Item Info</th>
              <th>User Name</th>
              <th>Quantity</th>
              <th>Cost</th>
              <th>Pick-up Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.totalBookings.map((cart) => (
              <tr>
                <td>{cart.booking_id}</td>
                <td className="text-left">
                    {cart.shop_obj.name}
                  <div className="m-2">
                    <Image
                      src={cart.cycle_obj.image}
                      style={{ height: "100px" }}
                      rounded
                    />
                    <span className="ml-4">{cart.cycle_obj.name}</span>
                  </div>
                </td>
                <td>{cart.user_obj.username}</td>
                <td>{cart.total_number}</td>
                <td>
                  S$
                  {this.getTotalCost(
                    cart.cycle_obj.cost_per_hour,
                    cart.total_number
                  )}
                </td>
                <td>{cart.time_cycle_picked}</td>
                <td>{cart.booking_status}</td>
                <td>
                    <ButtonGroup vertical>
                    <DropdownButton
                    as={ButtonGroup}
                    title="Edit Status"
                    variant="success"
                  > {this.getActionDetials(cart.booking_status).map((status)=> (<Dropdown.Item onClick={() => this.actionStatus(status.val,cart)}>{status.Dval}</Dropdown.Item>))}
                  </DropdownButton>
                    </ButtonGroup>

                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  }
}

export default Owner;
