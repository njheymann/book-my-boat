const typeDefs = `
type User {
    _id: ID
    username: String
    email: String
    password: String
    company: String
    location: String
    postcode: String
    idlocation: String
    bookings: [Booking]
}

type Booking {
    _id: ID
    name: String
    clientemail: String
    phone: String
    mooring: String
    boatname: String
    typeboat: String
    length: String
    date: String
    description: String
    wishlist: String
}

type Location {
    id: ID
    name: String
    region: String
    state: String
    postcode: String
}

type TideEntry {
    dateTime: String
    height: Float
    type: String
}
  
type TideDay {
    dateTime: String
    entries: [TideEntry]
}
  
type Tides {
    days: [TideDay]
}

type Forecast {
    tides: Tides
}
  
type LocationForecast {
    forecasts: Forecast
}

type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
    locations(postcode: String): [Location]
    tides(idlocation: String, date: String): LocationForecast
    booking(bookingId: ID!): Booking
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!, company: String!, location: String!, postcode: String!, idlocation: String): Auth
    addBooking(name: String!, clientemail: String!, phone: String!, mooring: String!, boatname: String!, typeboat: String!, 
        length: String!, date: String!, description: String!, wishlist: String!): Booking
    addLocation(idlocation: String!): User
}
`;

module.exports = typeDefs;
