
# Social Network API

## Description
The Social Network API is a backend solution designed for social media startups that require a robust system capable of handling large amounts of unstructured data. Built with a NoSQL database, this API provides the foundation for creating, updating, and managing users, thoughts, reactions, and friend lists for a social networking platform.

## Installation
To install and set up the Social Network API, follow these steps:

### Getting the Repo

Clone the Repository from GitHub
GitHub Repo - https://github.com/krohnayden/socialNetwork

### Set up your MongoDB database:

Make sure you have MongoDB installed on your system.
Create a .env file in the root directory and add your MongoDB connection string:
arduino
Copy code
MONGODB_URI=mongodb://localhost/social-network

### Start the server:
Run "npm start", then the server will start, and the Mongoose models will be synced to the MongoDB database.

## Usage
To use the Social Network API, follow these instructions:

Open your preferred API testing tool (e.g., Insomnia, Postman).

Use the following API routes:

### GET Routes:

/api/users: Retrieve data for all users.
/api/users/:id: Retrieve data for a specific user by ID.
/api/thoughts: Retrieve data for all thoughts.
/api/thoughts/:id: Retrieve data for a specific thought by ID.
POST Routes:

/api/users: Create a new user.
/api/thoughts: Create a new thought.
/api/thoughts/:thoughtId/reactions: Add a reaction to a thought.
PUT Routes:

/api/users/:id: Update a user's information.
/api/thoughts/:id: Update a thought's content.
DELETE Routes:

/api/users/:id: Delete a user.
/api/thoughts/:id: Delete a thought.
/api/thoughts/:thoughtId/reactions/:reactionId: Remove a reaction from a thought.
Send requests to these routes using the appropriate HTTP methods (GET, POST, PUT, DELETE) to perform operations on users, thoughts, and reactions.

Test the API POST, PUT, and DELETE routes in your API testing tool to create, update, and delete users, thoughts, and reactions.

Test the API POST and DELETE routes to add and remove friends from a user's friend list.

## Notes
Ensure that your MongoDB server is running before starting the Social Network API server.
Customize the MongoDB connection string in the .env file to match your MongoDB setup.
Explore the API documentation or inspect the API routes to understand the available endpoints and their functionalities.

## License
This project is licensed under the MIT License.