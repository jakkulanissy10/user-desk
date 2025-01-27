# User Desk (Project Name)
A user management system to add, edit, and delete users.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jakkulanissy10/user-desk.git
   cd user-desk

2. **Install dependencies:** 
    npm install 

3. **Run the development server:**
    npm run dev 

## Directory Structure
   src/: Contains all the source code for the project.
      Components/: Contains the reusable components like UserForm, UserList, and ErrorBoundary.
    App.jsx: The main component where the routing and rendering logic resides.

## Challenges Faced
   . **Editing New Users:**

    Problem: While adding new users works correctly (they are added and deleted properly), the issue arises    when attempting to edit the newly added users. The data doesn't update as expected. This works fine for existing users, but newly added data can't be edited or saved correctly.
    Status: The underlying cause of this issue is yet to be identified
    
## Usage
- Add a user by clicking the "Add User" button.
- Edit or delete users using the corresponding buttons in Actions column. 

