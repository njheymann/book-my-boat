import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME, TIDES, GET_BOOKING } from "../utils/queries";
import { REMOVE_BOOKING, EDIT_BOOKING } from "../utils/mutations";

const BookingInfo = () => {
  // Setting mutations
  const [removeBooking] = useMutation(REMOVE_BOOKING);
  const [editBooking] = useMutation(EDIT_BOOKING);

  // Setting state for editmode
  const [editMode, setEditMode] = useState(false);

  // Delete booking by ID
  const deleteBooking = async () => {
    try {
      await removeBooking({
        variables: { bookingId: booking._id },
      });
      window.location.href = ".././home";
    } catch (e) {
      console.error(e);
    }
  };

  // Setting params for booking ID
  const { id } = useParams();

  // Get booking data and create loading variable
  const { data: bookingData, loading: bookingLoading } = useQuery(GET_BOOKING, {
    variables: { bookingId: id },
  });
  const booking = bookingData?.booking || {};

  // Get user data and creating loading variable
  const { data: userData, loading: userLoading } = useQuery(GET_ME);
  const me = userData?.me || {};

  // Get tide data and create loading variable
  const { data: tideData, loading: tideLoading } = useQuery(TIDES, {
    variables: { idlocation: me.idlocation, date: booking.date },
  });
  const tides = tideData?.tides || [];

  // Variable that fetches tides for today
  const todaysTides = tides.forecasts?.tides?.days[0]?.entries || [];

  // Toggle edit mode function
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // Setting state for the form when in edit mode, will keep any values that dont get changed.
  const [formState, setFormState] = useState({
    name: booking.name,
    clientemail: booking.clientmail,
    phone: booking.phone,
    mooring: booking.mooring,
    boatname: booking.boatname,
    typeboat: booking.typeboat,
    length: booking.length,
    date: booking.date,
    description: booking.description,
    wishlist: booking.wishlist,
  });

  // Update state based on form input changes
  const handleEditBooking = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Handles the form sumit for editing a booking
  const handleEditFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      await editBooking({
        variables: { ...formState, bookingId: booking._id },
      });
      window.location.href = `../bookinginfo/${booking._id}`;
    } catch (e) {
      console.error(e);
    }
  };

  return bookingLoading || userLoading || tideLoading ? (
    <div className="loader"></div>
  ) : (
    <div>
      <h3>Booking Info for {booking.name}</h3>
      <button>
        <Link to="/home">Home</Link>
      </button>
      <button onClick={toggleEditMode}>Edit</button>
      <div className="booking-info">
        {editMode ? (
          <form onSubmit={handleEditFormSubmit}>
            <input
              className="form-input"
              placeholder={booking.name}
              name="name"
              type="text"
              value={formState.name}
              onChange={handleEditBooking}
            />
            <input
              className="form-input"
              placeholder={booking.clientemail}
              name="clientemail"
              type="email"
              value={formState.clientemail}
              onChange={handleEditBooking}
            />
            <input
              className="form-input"
              placeholder={booking.phone}
              name="phone"
              type="text"
              value={formState.phone}
              onChange={handleEditBooking}
            />
            <input
              className="form-input"
              placeholder={booking.mooring}
              name="mooring"
              type="text"
              value={formState.mooring}
              onChange={handleEditBooking}
            />
            <input
              className="form-input"
              placeholder={booking.boatname}
              name="boatname"
              type="text"
              value={formState.boatname}
              onChange={handleEditBooking}
            />
            <input
              className="form-input"
              placeholder={booking.typeboat}
              name="typeboat"
              type="text"
              value={formState.typeboat}
              onChange={handleEditBooking}
            />
            <input
              className="form-input"
              placeholder={booking.length}
              name="length"
              type="text"
              value={formState.length}
              onChange={handleEditBooking}
            />
            <input
              className="form-input"
              placeholder={booking.date}
              name="date"
              type="date"
              value={formState.date}
              onChange={handleEditBooking}
            />
            <input
              className="form-input"
              placeholder={booking.description}
              name="description"
              type="text"
              value={formState.description}
              onChange={handleEditBooking}
            />
            <input
              className="form-input"
              placeholder={booking.wishlist}
              name="wishlist"
              type="text"
              value={formState.wishlist}
              onChange={handleEditBooking}
            />
            <button type="submit  ">Save Changes</button>
          </form>
        ) : (
          <div>
            <h3>{booking.date}</h3>
            <p>Email: {booking.clientemail}</p>
            <p>Phone: {booking.phone}</p>
            <p>Mooring: {booking.mooring}</p>
            <p>Boat Name: {booking.boatname}</p>
            <p>Type of Boat: {booking.typeboat}</p>
            <p>Length: {booking.length}</p>
            <p>Description: {booking.description}</p>
            <p>Wishlist: {booking.wishlist}</p>
            <p>Tides</p>
            {todaysTides.map((tide, index) => (
              <div key={index}>
                {tide.type === "high" ? "▲" : "▼"} {tide.height}m at{" "}
                {tide.dateTime.split(" ")[1]}
              </div>
            ))}
            <button onClick={deleteBooking}>Delete Booking</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingInfo;
