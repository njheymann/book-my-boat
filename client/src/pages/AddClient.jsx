import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_BOOKING } from "../utils/mutations";

const Booking = () => {
  // Set form values to empty
  const [formState, setFormState] = useState({
    name: "",
    clientemail: "",
    phone: "",
    mooring: "",
    boatname: "",
    typeboat: "",
    length: "",
    date: "",
    description: "",
    wishlist: "",
  });
  // Add booking mutation
  const [addBooking] = useMutation(ADD_BOOKING);

  // Update state based on form input changes
  const handleAddBooking = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Checks for values inputed in the form and adds them to the database
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addBooking({
        variables: { ...formState },
      });
      window.location.href = "./home";
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div>
      <h3>Add client info below</h3>
      <div className="add-client-form">
        <form onSubmit={handleFormSubmit}>
          <input
            className="form-input"
            placeholder="Name"
            name="name"
            type="text"
            value={formState.name}
            onChange={handleAddBooking}
          />
          <input
            className="form-input"
            placeholder="Email"
            name="clientemail"
            type="email"
            value={formState.clientemail}
            onChange={handleAddBooking}
          />
          <input
            className="form-input"
            placeholder="Phone"
            name="phone"
            type="text"
            value={formState.phone}
            onChange={handleAddBooking}
          />
          <input
            className="form-input"
            placeholder="Mooring"
            name="mooring"
            type="text"
            value={formState.mooring}
            onChange={handleAddBooking}
          />
          <input
            className="form-input"
            placeholder="Boat Name"
            name="boatname"
            type="text"
            value={formState.boatname}
            onChange={handleAddBooking}
          />
          <input
            className="form-input"
            placeholder="Type of Boat"
            name="typeboat"
            type="text"
            value={formState.typeboat}
            onChange={handleAddBooking}
          />
          <input
            className="form-input"
            placeholder="Length"
            name="length"
            type="text"
            value={formState.length}
            onChange={handleAddBooking}
          />
          <input
            className="form-input"
            placeholder="Date"
            name="date"
            type="date"
            value={formState.date}
            onChange={handleAddBooking}
          />
          <input
            className="description"
            placeholder="Description"
            name="description"
            type="text"
            value={formState.description}
            onChange={handleAddBooking}
          />
          <input
            className="wishlist"
            placeholder="Wishlist"
            name="wishlist"
            type="text"
            value={formState.wishlist}
            onChange={handleAddBooking}
          />
          <button
            className="btn btn-block btn-primary"
            style={{ cursor: "pointer" }}
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
