const typeDefs = `
type User {
    _id: ID
    username: String
    email: String
    password: String
    company: String
    location: String
    bookings: [Booking]
}

type Booking {
    
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




type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!, company: String!, location: String!): Auth
    addBooking(name: String!, clientemail: String!, phone: String!, mooring: String!, boatname: String!, typeboat: String!, 
        length: String!, date: String!, description: String!, wishlist: String!): Booking
}
`;

module.exports = typeDefs;
