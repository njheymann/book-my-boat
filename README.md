# book-my-boat
A full stack app using the power of react to simplify the booking processes for marina managers, with the power of WillyWeather API  
to access tide information and client information all at your fingertips.  

## Table of Contents  
1. [User Story](#8)

## User Story  
AS a marina manager  
I WANT an app that allows me to book in clients  
SO THAT I don't have to be pulled away from what I'm doing to go and look at my booking diary.

## Acceptance Criteria  
GIVEN a full stack web app  
WHEN I open the link to the deployed page  
THEN I am presented with a login screen  
IF I do not have an account  
THEN I can click on the signup button  
WHEN I click on the signup button  
THEN I am presented with a signup screen that asks for my username, email, password, company name, location and postcode  
WHEN I fill out the form and click submit  
THEN I am presented with a config page which will give me locations around my area  
WHEN I click on a location  
THEN it will change color so I know it is selected  
WHEN I click 'confirm'  
THEN I will be re directed to the homepage  
WHEN I first visit the home page  
THEN I am presented with my user information, todays tides and times for my location, an empty bookings container and an option to add a booking  
WHEN I click on 'new booking'  
THEN I am redirected to an add client form page  
WHEN I fill out any of the inputs and click 'submit'  
THEN I am redirected back to the homepage and will see my booking inside the booking container with info for the date, client, name of boat and length of boat  
WHEN I click on the booking in the booking container  
THEN I am redirected to a page showing all information for my booking including tides for the date that it is booked in for, aswell as an 'home', 'edit', and 'delete booking' button  
WHEN I click on 'home'  
THEN I am redirected to the homepage  
WHEN I click on delete booking  
THEN I am redirected to the homepage and the booking will be deleted  
WHEN I click on 'edit'  
THEN I am redirected to another page with inputs to change any booking information for the client  
WHEN I click 'save changes'  
THEN I am redirected back to the booking info page with the changes I have made  
WHEN I close the application and re-enter before 2 hours has passed  
THEN I will be logged in still and redirected to the homepage instead of the login page  
WHEN I click 'logout'  
THEN I am safely logged out and brought back to the login page  
WHEN I open the app in my phone  
THEN I am presented with a phone friendly version of the app  

## Technologies used  
Node.js/Express.js for server framework  

ApolloServer, Mongoose, GraphQL for database intergration  

Axios for third-party API requests  

Bcrypt/JWT for password hasing and user authentication/authorisation  

React/Vite for front end UI  

Apollo Client for fetching GraphQL APIs  

## Directions for use  
Follow the link to the deployed app on heroku.  
For viewing purposes login with "nils.heymann@hotmail.com" password: "Password123"

## Screenshots  

LOGIN PAGE  
![BMB-Login](https://github.com/njheymann/book-my-boat/assets/125000756/f4e58158-e35c-46f2-add2-c293639b508e)  

SIGNUP PAGE  
![BMB-Signup](https://github.com/njheymann/book-my-boat/assets/125000756/d23bdcc6-da4b-4df2-bda3-30935112ead1)  

PROFILE CONFIG  
![BMB-Config- Choice](https://github.com/njheymann/book-my-boat/assets/125000756/f059e9a1-50cd-4f3f-b8cb-ff7dd729396a)  

HOMEPAGE W/OUT BOOKINGS  
![BMB-Homepage](https://github.com/njheymann/book-my-boat/assets/125000756/30dc36fd-37bb-4e82-9209-cda9e5c0bff9)  

HOMEPAGE WITH BOOKINGS  
![BMB-Home-W-Client](https://github.com/njheymann/book-my-boat/assets/125000756/ed78966c-6581-4d6a-a95b-c0d92279dc2c)  

CLIENT INFO PAGE  
![BMB-Client-Info](https://github.com/njheymann/book-my-boat/assets/125000756/83adf416-8c96-4ef8-9951-14a6ddeeae77)  

ADD CLIENT PAGE  
![BMB-Add-Client](https://github.com/njheymann/book-my-boat/assets/125000756/95ff85df-193d-442e-816d-3f5404c9d301)  

EDIT CLIENT PAGE  
![BMB-Edit-Client-Info](https://github.com/njheymann/book-my-boat/assets/125000756/59242ad8-729d-4b79-ae43-ce188d334dd8)

## Links  
Github repository: https://github.com/njheymann/book-my-boat  
Deployed app URL: https://book-my-boat-c0be683581a2.herokuapp.com/  











