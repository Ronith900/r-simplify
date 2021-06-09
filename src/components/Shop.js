import React from "react";
import {Link} from "react-router-dom";
import { Card } from "react-bootstrap";

class Shops extends React.Component {

  render() {
    return (
      <>
        <h2>Rental Shops</h2>
        <br></br>
        <div className="row">
          {this.props.rentalShops.map((shop) => (
            <div className="col-lg-4 col-md-6 col-sm-12">
              <Card s>
              <Card.Img variant="top" src={shop.image} style={{height:"200px"}} fluid/>
                <Card.Body>
                  <Card.Title>{shop.name}</Card.Title>
                  <hr></hr>
                  <Card.Subtitle className="mb-2 text-muted">Address: {shop.address} <br/><br/> Timings:{shop.open_time} - {shop.close_time}</Card.Subtitle>
                  <Card.Text>
                    
                  </Card.Text>
                  <hr></hr>
                  <Link to={`/shops/${shop.shop_id}`}>View Cycles</Link>
                </Card.Body>
              </Card>
              <br></br>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default Shops;
