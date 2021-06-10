import React from "react";
import Shop from "../providers/shops";
import { Link } from "react-router-dom";
import BookingProvider from "../providers/booking";
import { Table, Image, Button} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

class Booking extends React.Component {
  
  getTotalCost(cycleCost, quantity) {
    return (quantity * parseFloat(cycleCost)).toFixed(2);
  }

  getBookedTime(bookedTime){
    const d = new Date(String(bookedTime)).toLocaleTimeString()
    console.log(d,bookedTime)
    return bookedTime
  }

  async removeBooking(cart) {
    const cartRemoved = await new BookingProvider().deleteBooking(cart.id);
    this.props.onCancelBooking(cart)
  }

  render() {
    if (this.props.myBookings.length === 0) {
      return (
        <div className="text-center align-top">
          <h4>You have no Bookings</h4>
          <Link to="/cart">Go to Cart</Link>
        </div>
      );
    }
    return (
      <>
        <Table striped bordered hover responsive className="text-center">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Item Info</th>
              <th>Quantity</th>
              <th>Cost</th>
              <th>Pick-up Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.myBookings.map((cart) => (
              <tr>
                <td>{cart.booking_id}</td>
                <td className="text-left">
                  <Link to={`/shops/${cart.shop_obj.shop_id}`}>
                    {cart.shop_obj.name}
                  </Link>
                  <div className="m-2">
                    <Image
                      src={cart.cycle_obj.image}
                      style={{ height: "100px" }}
                      rounded
                    />
                    <span className="ml-4">{cart.cycle_obj.name}</span>
                  </div>
                </td>
                <td>{cart.total_number}</td>
                <td>S$
                  {this.getTotalCost(
                    cart.cycle_obj.cost_per_hour,
                    cart.total_number
                  )}
                </td>
                <td>{this.getBookedTime(cart.time_cycle_picked)}</td>
                <td>
                    Booked
                </td>
                <td>
                <Button
                    variant="outline-danger"
                    onClick={() => this.removeBooking(cart)}
                  >
                                        <FontAwesomeIcon
                      icon={faTrash}
                    />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  }
}

export default Booking;
