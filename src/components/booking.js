import React from "react";
import Shop from "../providers/shops";
import BookingProvider from "../providers/booking";
import { Table, Image, Button} from "react-bootstrap";

class Booking extends React.Component {
  
  getTotalCost(cycleCost, quantity) {
    return (quantity * parseFloat(cycleCost)).toFixed(2);
  }

  getBookedTime(bookedTime){
    return (new Date(bookedTime).toTimeString())
  }

  async removeBooking(cart) {
    const cartRemoved = await new BookingProvider().deleteBooking(cart.id);
    this.props.onCancelBooking(cart)
  }

  render() {
    return (
      <>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Cycle</th>
              <th>Shop Name</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Cost</th>
              <th>Booking Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.myBookings.map((cart) => (
              <tr>
                <td>{cart.booking_id}</td>
                <td>
                  <Image
                    src={cart.cycle_obj.image}
                    style={{ height: "200px" }}
                  />
                </td>
                <td>{cart.shop_obj.name}</td>
                <td>{cart.cycle_obj.name}</td>
                <td>{cart.total_number}</td>
                <td>S$
                  {this.getTotalCost(
                    cart.cycle_obj.cost_per_hour,
                    cart.total_number
                  )}
                </td>
                <td>{this.getBookedTime(cart.updated_at)}</td>
                <td>
                    Booked
                </td>
                <td>
                <Button
                    variant="danger"
                    onClick={() => this.removeBooking(cart)}
                  >
                    Cancel
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <p>Note: <i>All the bookings will be automatically cancelled 30 minutes after the booking time</i></p>
      </>
    );
  }
}

export default Booking;
