import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME, TIDES, GET_BOOKING } from "../utils/queries";
import { REMOVE_BOOKING, EDIT_BOOKING } from "../utils/mutations";

const BookingInfo = () => {
  const [removeBooking] = useMutation(REMOVE_BOOKING);
  const [editBooking] = useMutation(EDIT_BOOKING);
  const [editMode, setEditMode] = useState(false);

  const deleteBooking = () => {
    removeBooking({
      variables: { bookingId: booking._id },
    });
    window.location.href = ".././home";
  };

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

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

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

  const handleEditBooking = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      await editBooking({
        variables: { ...formState, bookingId: booking._id },
      });
      window.location.href = ".././home";
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <button>
        <Link to="/home">Home</Link>
      </button>
      <button onClick={toggleEditMode}>Edit</button>
      <h1>Booking Info for {booking.name}</h1>

      {editMode ? (
        <form onSubmit={handleEditFormSubmit}>
          <p>Edit here</p>
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
              {tide.height}m {tide.type} at {tide.dateTime.split(" ")[1]}
            </div>
          ))}
          <button onClick={deleteBooking}>Delete Booking</button>
        </div>
      )}
    </div>
  );
};

export default BookingInfo;
