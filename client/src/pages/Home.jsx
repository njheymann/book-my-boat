import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ME, LOCATIONS, TIDES } from "../utils/queries";

const Home = () => {
  // Format dates for tide query
  const todaysDate = new Date();
  const year = todaysDate.getFullYear();
  const month = String(todaysDate.getMonth() + 1).padStart(2, "0");
  const day = String(todaysDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  console.log(formattedDate);

  // Grab user data
  const { data: userData } = useQuery(GET_ME);
  const me = userData?.me || {};
  console.log({ me });
  console.log(me.bookings);

  // Inject user data into location query
  const { data: locationData } = useQuery(LOCATIONS, {
    variables: { postcode: me.postcode },
  });
  const locations = locationData?.locations || [];
  console.log({ locations });

  // Inject user data and formatted date into tide query
  const { data: tideData } = useQuery(TIDES, {
    variables: { idlocation: me.idlocation, date: formattedDate },
  });
  const tides = tideData?.tides || [];

  // Grab todays tides and set as an object
  const todaysTides = tides.forecasts?.tides?.days[0]?.entries || [];
  console.log({ todaysTides });

  // Sort bookings by date in ascending order
  const sortedBookings = me.bookings?.slice().sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    return dateA - dateB;
  });

  return (
    <main>
      <div className="welcome-container">
        <div className="welcome-info">
          <h3>Welcome {me.username}</h3>
          <p>Company {me.company}</p>
          <p>Location {me.location} </p>
        </div>

        <div className="todays-tides">
          <h3>Todays tides</h3>
          {todaysTides.map((tide, index) => (
            <div key={index}>
              {tide.height}m at {tide.dateTime.split(" ")[1]}
            </div>
          ))}
        </div>
      </div>
      <button>
        <Link to="/booking">New Booking</Link>
      </button>
      <h3>Bookings</h3>
      <div className="booking-container">
        {sortedBookings?.map((booking) => (
          <Link to={`/bookinginfo/${booking._id}`} key={booking._id}>
            <div key={booking._id} className="booking">
              <p>{booking.date}</p>
              <p>{booking.boatname}</p>

              <div className="client-info">
                <p>{booking.name}</p>
                <p>{booking.clientemail}</p>
                <p>{booking.phone}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Home;
