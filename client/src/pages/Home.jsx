import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ME, LOCATIONS } from "../utils/queries";

const Home = () => {
  const { data: userData } = useQuery(GET_ME);
  const me = userData?.me || {};
  const { data: locationData } = useQuery(LOCATIONS, {
    variables: { postcode: me.postcode },
  });
  const locations = locationData?.locations || [];
  console.log(locations);

  return (
    <main>
      <button>
        <Link to="/booking">New Booking</Link>
      </button>
      <h2>Welcome: {me.username}</h2>
      <p>Company: {me.company}</p>
      <p>Location: {me.location} </p>

      <h3>Bookings</h3>
      <div className="booking-container">
        {me.bookings?.map((booking) => (
          <div key={booking._id} className="booking">
            <p>{booking.boatname}</p>
            <p>{booking.date}</p>
            <div className="client-info">
              <p>{booking.clientname}</p>
              <p>{booking.clientemail}</p>
              <p>{booking.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;
