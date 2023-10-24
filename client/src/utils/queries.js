import { gql } from "@apollo/client";

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      company
      postcode
      location
      bookings {
        _id
        name
        clientemail
        phone
        mooring
        boatname
        typeboat
        length
        date
        description
        wishlist
      }
    }
  }
`;

export const LOCATIONS = gql`
  query locations($postcode: String!) {
    locations(postcode: $postcode) {
      id
      name
      region
      state
      postcode
    }
  }
`;
