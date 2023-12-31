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

  // Grab user data
  const { data: userData, loading: userLoading } = useQuery(GET_ME);
  const me = userData?.me || {};

  // Inject user data into location query
  const { data: locationData, loading: locationLoading } = useQuery(LOCATIONS, {
    variables: { postcode: me.postcode },
  });
  const locations = locationData?.locations || [];
  console.log({ locations });

  // Inject user data and formatted date into tide query
  const { data: tideData, loading: tideLoading } = useQuery(TIDES, {
    variables: { idlocation: me.idlocation, date: formattedDate },
  });
  const tides = tideData?.tides || [];

  // Grab todays tides and set as an object
  const todaysTides = tides.forecasts?.tides?.days[0]?.entries || [];

  // Sort bookings by date in ascending order
  const sortedBookings = me.bookings?.slice().sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    return dateA - dateB;
  });

  return (
    <main>
      {tideLoading || userLoading || locationLoading ? (
        <div className="loader"></div>
      ) : (
        <div className="welcome-container">
          <div className="welcome-info">
            <h4>Welcome {me.username}</h4>
            <p>Company {me.company}</p>
            <p>Location {me.location} </p>
          </div>

          <div className="todays-tides">
            <h4>Todays tides</h4>

            {todaysTides.map((tide, index) => (
              <div key={index}>
                {tide.type === "high" ? "▲" : "▼"} {tide.height}m at{" "}
                {tide.dateTime.split(" ")[1]}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="new-booking">
        <button className="new-booking">
          <Link to="/booking">New Booking</Link>
        </button>
      </div>
      <h3>Bookings</h3>
      <div className="booking-container">
        {userLoading || locationLoading ? (
          <div className="loader"></div>
        ) : sortedBookings && sortedBookings.length > 0 ? (
          sortedBookings?.map((booking) => (
            <Link to={`/bookinginfo/${booking._id}`} key={booking._id}>
              <div key={booking._id} className="booking">
                <h3>{booking.date}</h3>
                <p>Client: {booking.name}</p>
                <p>Name of boat: {booking.boatname}</p>
                <p>{booking.length}</p>
                <p>Click for more info</p>
              </div>
            </Link>
          ))
        ) : (
          <h1>No bookings yet!</h1>
        )}
      </div>
    </main>
  );
};

export default Home;
