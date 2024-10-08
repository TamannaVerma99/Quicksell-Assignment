# Kanban Board Application

This project is an interactive Kanban board application built using React JS, designed to interact with the provided API.

## Tech Stack

- **React**: Used for building the user interface.
- **JavaScript (ES6)**: Employed for creating interactive web applications.
- **CSS**: Utilized for styling the application without relying on CSS libraries.
- **HTML**: Markup language for structuring the web pages.


## File Structure

/kanban-board-app 
```
├── /public 
│   ├── index.html          # Main HTML file that serves as the entry point for the React application
│   └── favicon.ico         # Application favicon for the web app
├── /src 
│   ├── /assets             # Directory containing all image assets used throughout the project
│   ├── /components         # Directory containing all React components used in the application
│   │   ├── Board.js        # Component representing the overall Kanban board layout, integrating different views (Status, GroupByUser)
│   │   ├── Card.js         # Base component for displaying individual ticket cards; used by CardStatus and CardUser
│   │   ├── CardPriority.js  # Component for managing and displaying cards based on priority criteria (if applicable)
│   │   ├── CardStatus.js    # Component for displaying individual tickets grouped by their status (e.g., To-Do, In Progress)
│   │   ├── CardUser.js      # Component for displaying individual tickets grouped by the assigned user
│   │   ├── Dropdown.js      # Dropdown component for selecting grouping and ordering options for tickets
│   │   ├── GroupByUser.js   # Component responsible for displaying tickets grouped by user assignments
│   │   ├── Navbar.js        # Navigation bar component for app-wide navigation and actions
│   │   ├── Priority.js      # Component for managing and displaying tickets based on priority levels
│   │   └── Status.js        # Component for rendering tickets based on their current status
│   ├── /styles              # Directory containing all CSS files for styling the application
│   │   ├── App.css          # Main CSS file for global styling of the app
│   │   ├── Card.css         # Styles specifically for individual ticket cards
│   │   ├── Dropdown.css      # Styles for the dropdown component
│   │   ├── index.css        # Global styles applied to the entire application
│   │   └── Status.css       # Styles specific to the Status component for rendering status sections
│   ├── App.js               # Main application component that sets up routing and layout for the app
│   ├── index.js             # Entry point of the React application, rendering the App component
└── package.json             # Project metadata and dependencies, listing libraries and scripts for the project
```

## Getting Started

To get started with the project, follow these simple steps:

1. Clone this repository to your local machine.
2. Install dependencies using `npm install` or `yarn install`.
3. Start the development server using `npm run dev` or `yarn dev`.
4. Explore the project by navigating to the provided URLs in your browser.
