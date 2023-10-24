import { gql } from "@apollo/client";

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      company
      location
      bookings {
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
