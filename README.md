
# FriendBook

FriendBook is a web application built with Node.js, Express, HTML, and CSS. It provides users with a platform to connect with friends, share posts, send friend requests, and engage in real-time chat conversations. The application utilizes JWT for user authorization and Socket.io for real-time messaging.

## Features

- User Sign Up: New users can create an account on FriendBook by providing their required information.
- User Log In: Users who have signed up can log in using their credentials to access the platform.
- JWT Authorization: FriendBook uses JSON Web Tokens (JWT) to authenticate and authorize users.
- Post Sharing: Authenticated users can create and share posts with other users on FriendBook.
- Friend Requests: Users can send and receive friend requests to connect with other users on the platform.
- Real-Time Chat: FriendBook incorporates Socket.io to enable real-time chat functionality between friends.
- User Search: Users can search for posts by username to find specific content on FriendBook.
- Log Out: Users can log out of their accounts, clearing the authentication token.

## Installation

To run FriendBook locally, follow these steps:

1. Clone the repository:
2. Navigate to the project directory:
3. Install the dependencies: (npm i)
4. Set up environment variables:
   - Create a `.env` file in the root directory of the project.
   - Define the following environment variables in the `.env` file:
     - `PORT`: The port number for the server to listen on (e.g., `8080`).
     - `DB_CONNECTION`: The connection URL for your MySql database.
     - `JWT_SECRET`: A secret key used for JWT token signing and verification.
     - `JWT_EXPIRATION`: The expiration time for JWT tokens (e.g., `1d` for one day).
     - `SOCKET_IO_ORIGIN`: The allowed origin URL for Socket.io connections (e.g., `http://localhost:8080`).

5. Start the server:

6. Access FriendBook in your browser at `http://localhost:8080` (or the configured `PORT`).

## Usage

1. Sign Up: Create a new account on FriendBook by providing the required information.
2. Login: Log in using your credentials to access the platform.
3. Share Posts: Once logged in, you can create and share posts with other users.
4. Friend Requests: Send and accept friend requests to connect with other users.
5. Chat: Start real-time conversations with your friends using the built-in chat system.
6. Search Posts: Use the search feature to find posts by username.
7. Log Out: When you're done, log out of your account to clear the authentication token.

## License

The FriendBook project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as permitted by the license.






