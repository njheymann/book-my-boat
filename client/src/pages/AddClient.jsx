import { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_BOOKING } from "../utils/mutations";

const Booking = () => {
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

  const [addBooking] = useMutation(ADD_BOOKING);

  const handleAddBooking = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await addBooking({
        variables: { ...formState },
      });
    } catch (e) {
      console.error(e);
    }
  };
  return (
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
        className="form-input"
        placeholder="Description"
        name="description"
        type="text"
        value={formState.description}
        onChange={handleAddBooking}
      />
      <input
        className="form-input"
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
  );
};

export default Booking;
