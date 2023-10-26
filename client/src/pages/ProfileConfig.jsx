import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME, LOCATIONS } from "../utils/queries";
import { ADD_LOCATION } from "../utils/mutations";

const ProfileConfig = () => {
  const { data: userData } = useQuery(GET_ME);
  const me = userData?.me || {};
  const { data: locationData } = useQuery(LOCATIONS, {
    variables: { postcode: me.postcode },
  });
  const locations = locationData?.locations || [];
  console.log(me);
  console.log({ locations });

  const [formState, setFormState] = useState({
    idlocation: "",
  });

  const [addLocation, { error, data }] = useMutation(ADD_LOCATION);

  const handleAddLocation = (locationid) => {
    setFormState({
      ...formState,
      idlocation: locationid,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await addLocation({
        variables: { ...formState },
      });
      window.location.href = "./home";
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main>
      <h1>Choose your Location:</h1>
      <div className="location-container">
        {locations?.map((location) => (
          <div
            onClick={() => handleAddLocation(location.id)}
            key={location._id}
            className="location"
            value={formState.idlocation}
          >
            <p>
              {location.name}, {location.region} <br></br>
              {location.state}
            </p>
          </div>
        ))}
        <form onSubmit={handleFormSubmit}>
          <button type="submit">Confirm</button>
        </form>
      </div>
    </main>
  );
};

export default ProfileConfig;
