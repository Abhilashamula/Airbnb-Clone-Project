# Wanderlust Application

Wanderlust is a full-stack Node.js application that helps users manage and explore room listings. It features functionality for CRUD operations, review management, and user interaction, all built using MongoDB, Express, and EJS templates.

## Features

- Add, edit, and delete room listings.
- View all listings with detailed information.
- Leave reviews on listings with ratings.
- Flash messages for success or error notifications.
- Cookie handling for user-specific data.
- Basic privacy and terms pages.

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Project Structure](#project-structure)
5. [Routes](#routes)
6. [Error Handling](#error-handling)

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose ODM)
- **Templating Engine**: EJS (with EJS Mate for layouts)
- **CSS Framework**: Bootstrap
- **Session Management**: Express-Session
- **Flash Messages**: Connect-Flash
- **Error Handling**: Custom Middleware

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd wanderlust
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the MongoDB server locally:

   ```bash
   mongod
   ```

5. Run the application:

   ```bash
   node app.js
   ```

6. Open your browser and navigate to:

   ```
   http://localhost:3000
   ```

## Usage

### Home Page

- Visit the home page to see an overview of all listings.
- Navigate to specific listings for more details or to add reviews.

### Adding Listings

- Use the `/listings/new` endpoint to create a new listing with title, description, price, and image details.

### Editing Listings

- Edit listings via the `/listings/:id/edit` endpoint.

### Reviews

- Add reviews with ratings for specific listings.
- Delete reviews via the `/listings/:id/reviews/:reviewId` endpoint.

## Project Structure

```
project-folder
├── models
│   ├── listing.js       # Schema for room listings
│   ├── review.js        # Schema for reviews
├── public
│   ├── css              # Static stylesheets
│   └── js               # Client-side JavaScript
├── utils
│   ├── ExpressErrors.js # Custom error class
│   ├── WrapAsync.js     # Async wrapper for error handling
├── views
│   ├── includes         # Shared templates (header, footer, etc.)
│   ├── listings         # Templates for CRUD operations
│   └── error.ejs        # Error handling view
├── data.js              # Sample data for initial database setup
├── app.js               # Main application file
├── package.json         # Dependencies and scripts
└── README.md            # Project documentation
```

## Routes

### Main Routes

| Method | Endpoint             | Description                  |
| ------ | -------------------- | ---------------------------- |
| GET    | `/`                  | Home page                    |
| GET    | `/listings`          | View all listings            |
| GET    | `/listings/new`      | Form to create a new listing |
| POST   | `/listings`          | Create a new listing         |
| GET    | `/listings/:id`      | View a specific listing      |
| GET    | `/listings/:id/edit` | Form to edit a listing       |
| PUT    | `/listings/:id`      | Update an existing listing   |
| DELETE | `/listings/:id`      | Delete a listing             |

### Review Routes

| Method | Endpoint                          | Description                  |
| ------ | --------------------------------- | ---------------------------- |
| POST   | `/listings/:id/reviews`           | Add a review to a listing    |
| DELETE | `/listings/:id/reviews/:reviewId` | Delete a review from listing |

### Additional Routes

| Method | Endpoint      | Description               |
| ------ | ------------- | ------------------------- |
| GET    | `/privacy`    | Privacy policy page       |
| GET    | `/terms`      | Terms and conditions page |
| GET    | `/getcookies` | Save a test cookie        |
| GET    | `/getcoo`     | Retrieve cookies          |

## Error Handling

### Middleware

- `ExpressErrors` class is used to create custom error messages with HTTP status codes.
- `WrapAsync` wrapper is used to handle errors in asynchronous routes gracefully.

### Default Error Handling

- Unhandled routes or errors render the `error.ejs` template with a status code of 404.
- Other exceptions are logged and sent to the client with appropriate status codes.

## Sample Data Initialization

Use the `initDb` function to populate the database with sample data:

```js
const initDb = async () => {
  await Listing.insertMany(initData.data);
  console.log("Data was initialized");
};
```

please continue



