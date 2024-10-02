# Kanban Board Application

This project is an interactive Kanban board application built using React JS, designed to interact with the provided API from [Quicksell](https://api.quicksell.co/v1/internal/frontend-assignment).

## Tech Stack

- **React**: Frontend library for building user interfaces.
- **JavaScript (ES6)**: Scripting language used for interactive web applications.
- **CSS**: For styling the application without any CSS libraries.
- **HTML**: Markup language used for structuring the web pages.

## File Structure

/kanban-board-app ├── /public │ ├── index.html │ └── favicon.ico ├── /src │ ├── /assets │ │ ├── plusmore.png │ │ ├── canceled.png │ │ ├── Done.png │ │ ├── backlog.png │ │ └── in progress.png │ ├── /components │ │ ├── Board.js # Component representing a board section. │ │ ├── Card.js # Component for displaying an individual ticket card. │ │ ├── CardPriority.js # Component to handle priority display of cards. │ │ ├── CardStatus.js # Component for displaying the status of a ticket. │ │ ├── CardUser.js # Component to show the user assigned to a ticket. │ │ ├── Dropdown.js # Dropdown component for grouping options. │ │ ├── GroupByUser.js # Component for grouping tickets by user. │ │ ├── Navbar.js # Navigation bar component. │ │ ├── Priority.js # Component for handling priority-related actions. │ │ └── Status.js # Component for displaying ticket statuses. │ ├── /styles │ │ ├── App.css # Main CSS file for app styling. │ │ ├── Card.css # Styles for individual ticket cards. │ │ ├── Dropdown.css # Styles for dropdown components. │ │ ├── index.css # Global styles for the app. │ │ └── Status.css # Styles specific to the Status component. │ ├── App.js # Main application component. │ ├── index.js # Entry point of the React application. └── package.json
