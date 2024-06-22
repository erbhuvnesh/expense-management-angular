# Expense Management Application

This Angular application provides functionalities for managing expenses, viewing exchange rates, and editing user profile information.

## Features

### Dashboard

- **List of Expenses**: Displays a table listing all expenses.
- **Summary of Expenses**: Provides summary cards showing total number of expenses, total expenditure, and top expenditure category.
- **Add, Edit, Delete Expenses**: Allows users to add new expenses, edit existing ones, and delete expenses.
- **Preferred Currency**: All expense data is displayed in the preferred currency format set by the user.

### Exchange Rates

- **Current Exchange Rates**: Fetches and displays current exchange rates for various currencies using the Open Exchange Rates API.
- **Set Preferred Currency**: Users can select their preferred currency, which is used globally throughout the application.

### User Profile

- **User Information**: Displays user's name, email, and profile picture.
- **Edit User Information**: Provides an option to edit user information, including uploading a new profile picture.

## Getting Started

To get the project up and running on your local machine, follow these steps:

### Prerequisites

Ensure you have the following installed:

- Node.js
- Angular CLI
- Git

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/erbhuvnesh/expense-management-angular.git
    ```

2. Navigate to the project directory:

    ```bash
    cd expense-management-angular
    ```

3. Install dependencies

    ```bash
    npm install
    ```

### Running the project

1. Start the mock server

    ```bash
    json-server --watch db.json --port 3000
    ```
> [!NOTE]  
> Port 3000 should be available to start mock server. If its occupied, please stop the process running on Port 3000.

2. Start the Angular Project

    ```bash
    ng serve
    ```
3. Open your browser and navigate to http://localhost:4200/ to view the application.
