import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
    $company: String!
    $location: String!
    $postcode: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
      company: $company
      location: $location
      postcode: $postcode
    ) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_BOOKING = gql`
  mutation addBooking(
    $name: String!
    $clientemail: String!
    $phone: String!
    $mooring: String!
    $boatname: String!
    $typeboat: String!
    $length: String!
    $date: String!
    $description: String!
    $wishlist: String!
  ) {
    addBooking(
      name: $name
      clientemail: $clientemail
      phone: $phone
      mooring: $mooring
      boatname: $boatname
      typeboat: $typeboat
      length: $length
      date: $date
      description: $description
      wishlist: $wishlist
    ) {
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
