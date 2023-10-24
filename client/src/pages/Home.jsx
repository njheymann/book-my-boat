import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { getLocations } from "../utils/weatherAPI";

const Home = () => {
  const { data } = useQuery(GET_ME);
  const me = data?.me || data?.user || {};
  console.log(data);
  console.log(me);

  getLocations();

  return (
    <main>
      <button>
        <Link to="/booking">New Booking</Link>
      </button>
      <h2>Welcome: {me.username}</h2>
      <p>Company: {me.company}</p>
      <p>Location: {me.location} </p>
      <div>
        <h3>Bookings</h3>
        <ul>
          {me.bookings?.map((booking) => (
            <li key={booking._id}>
              <div className="booking-container">
                <p>{booking.boatname}</p>
                <p>{booking.date}</p>
                <div className="client-info">
                  <p>{booking.clientname}</p>
                  <p>{booking.clientemail}</p>
                  <p>{booking.phone}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Home;
