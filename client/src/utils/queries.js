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
      idlocation

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

export const GET_BOOKING = gql`
  query getBooking($bookingId: ID!) {
    booking(bookingId: $bookingId) {
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

export const TIDES = gql`
  query tides($idlocation: String!, $date: String!) {
    tides(idlocation: $idlocation, date: $date) {
      forecasts {
        tides {
          days {
            dateTime
            entries {
              dateTime
              height
              type
            }
          }
        }
      }
    }
  }
`;
