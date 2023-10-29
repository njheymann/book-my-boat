import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Signup = () => {
  // Setting formstate for signup form
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    company: "",
    location: "",
    postcode: "",
  });

  // Setting the mutation for adding a user
  const [addUser, { error, data }] = useMutation(ADD_USER);

  // This is the function that handles the change in the form
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // This is the function that submits the form, it takes the formstate and adds it to the database
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
      window.location.href = "./config";
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main>
      <div>
        <h4>Sign Up</h4>
        <div className="signup-form">
          <div>
            {data ? (
              <p>Success!</p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Your username"
                  name="username"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Company name"
                  name="company"
                  type="company"
                  value={formState.company}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Location"
                  name="location"
                  type="location"
                  value={formState.location}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Postcode"
                  name="postcode"
                  type="postcode"
                  value={formState.postcode}
                  onChange={handleChange}
                />
                <br></br>
                <button
                  className="btn btn-block btn-primary"
                  style={{ cursor: "pointer" }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
