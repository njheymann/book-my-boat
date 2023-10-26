import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ME, TIDES, GET_BOOKING } from "../utils/queries";

const BookingInfo = () => {
  const { id } = useParams();
  console.log({ id });
  const { data: bookingData } = useQuery(GET_BOOKING, {
    variables: { bookingId: id },
  });
  const booking = bookingData?.booking || {};
  console.log({ booking });

  const { data: userData } = useQuery(GET_ME);
  const me = userData?.me || {};
  console.log({ me });

  const { data: tideData } = useQuery(TIDES, {
    variables: { idlocation: me.idlocation, date: booking.date },
  });
  const tides = tideData?.tides || [];

  const todaysTides = tides.forecasts?.tides?.days[0]?.entries || [];
  console.log({ todaysTides });

  return (
    <div>
      <button>
        <Link to="/home">Home</Link>
      </button>
      <h1>Booking Info for {booking.name}</h1>
      <p>{booking.date}</p>
      <p>Email: {booking.clientemail}</p>
      <p>Phone: {booking.phone}</p>
      <p>Mooring: {booking.mooring}</p>
      <p>Boat Name: {booking.boatname}</p>
      <p>Type of Boat: {booking.typeboat}</p>
      <p>Length: {booking.length}</p>
      <p>Description: {booking.description}</p>
      <p>Wishlist: {booking.wishlist}</p>
      {todaysTides.map((tide, index) => (
        <div key={index}>
          {tide.height}m at {tide.dateTime.split(" ")[1]}
        </div>
      ))}
    </div>
  );
};

export default BookingInfo;
