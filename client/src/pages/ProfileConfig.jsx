import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME, LOCATIONS } from "../utils/queries";
import { ADD_LOCATION } from "../utils/mutations";

const ProfileConfig = () => {
  // Grab user data
  const { data: userData } = useQuery(GET_ME);
  const me = userData?.me || {};
  console.log({ me });

  // Inject user data into location query, this request grabs the postcode and sends it to our third-party API
  const { data: locationData } = useQuery(LOCATIONS, {
    variables: { postcode: me.postcode },
  });
  const locations = locationData?.locations || [];

  // Setting formstate to empty string, variable being idlocation
  const [formState, setFormState] = useState({
    idlocation: "",
  });

  // This adds the region code to the users idLocation so we can use it for the API
  const [addLocation] = useMutation(ADD_LOCATION);

  const handleAddLocation = (locationid) => {
    setFormState({
      ...formState,
      idlocation: locationid,
    });
  };

  // This is the function that submits the form, it takes the formstate and adds it to the database
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      await addLocation({
        variables: { ...formState },
      });
      window.location.href = "./home";
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h4>Choose your Location:</h4>
      <div className="location-container">
        {locations?.map((location) => (
          <div
            onClick={() => handleAddLocation(location.id)}
            key={location.id}
            className={`location ${
              formState.idlocation === location.id ? "selected" : ""
            }`}
            value={formState.idlocation}
          >
            <p>
              {location.name}, {location.region} <br></br>
              {location.state}
            </p>
          </div>
        ))}
      </div>
      <div className="location-confirm">
        <form onSubmit={handleFormSubmit}>
          <button type="submit">Confirm</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileConfig;
