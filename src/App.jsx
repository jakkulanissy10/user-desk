import { Component } from 'react';
import axios from 'axios';
import UserList from './Components/UserList';
import UserForm from './Components/UserForm';
import ErrorBoundary from './Components/ErrorBoundary';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css' 

class App extends Component {
  state = {
    users: [],
    isLoading: true,
    editUser: null,  // Set to null initially instead of an empty object
    currentPage: 1,
    usersPerPage: 5,
    nextId: 11,  // Starting from 11 (10 users initially present)
    errorMessage: '',  // Add error message state
  };

  componentDidMount() {
    this.getUserDetails();
  }

  // Retrieving Data Using 'GET'
  getUserDetails = async () => {
    const { currentPage, usersPerPage } = this.state;
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users', {
        params: { _page: currentPage, _limit: usersPerPage },
      });
      
      this.setState({ users: response.data, isLoading: false });
    } catch (error) {
      console.log('Error While Fetching Data');
      this.setState({ isLoading: false, errorMessage: 'Error loading user data' });  // Set error message
    }
  };

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber, isLoading: true }, this.getUserDetails);
  };

  // Adding New User Using 'POST'
  onAddUser = async (newUser) => {
    const { nextId, users } = this.state;
    const newUserWithId = { ...newUser, id: nextId };
    try {
      this.setState((prevState) => ({
        users: [...prevState.users, newUserWithId],
        nextId: nextId + 1,  // Increment nextId for the next user
      }));
    } catch (error) {
      console.log('Error while adding new user', error);
    }
  };

  // Update User Using 'PUT'
  onSaveUser = async () => {
    const { editUser } = this.state;
    if (!editUser) return;

    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${editUser.id}`, editUser);
      this.setState((prevState) => ({
        users: prevState.users.map((user) => (user.id === editUser.id ? response.data : user)),
        editUser: null,  // Reset editUser after saving
      }));
    } catch (error) {
      console.error('Error updating user data', error);
    }
  };

  // Delete User using 'DELETE'
  onDeleteUser = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      this.setState((prevState) => ({
        users: prevState.users.filter((user) => user.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  // Handle edit button click
  onHandleEdit = (user) => {
    this.setState({ editUser: { ...user } });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      editUser: {
        ...prevState.editUser,
        [name]: value,
      },
    }));
  };

  render() {
    const { users, editUser, isLoading, currentPage, errorMessage } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div className = "main-container">
        <ErrorBoundary>
          {/* Error message display */}
          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
          
          {/* Pass users and handlers as props to UserList */}
          <UserList eachUsers={users} onHandleEdit={this.onHandleEdit} deleteUser={this.onDeleteUser} />

          {/* Pass onAddUser handler to UserForm */}
          <UserForm newUser={this.onAddUser} />

          <div>
            <button onClick={() => this.handlePageChange(currentPage - 1)} disabled={currentPage <= 1} className = "prev-btn">
              -
            </button>
            <button onClick={() => this.handlePageChange(currentPage + 1)} className = "nxt-btn" >+</button>
          </div>

          {/* Edit Form - Render only if editUser is not null */}
          {editUser && (
            <div>
              <h3>Edit User</h3>
              <input
                type="text"
                name="name"
                value={editUser.name}
                onChange={this.handleInputChange}
              />
              <input
                type="email"
                name="email"
                value={editUser.email}
                onChange={this.handleInputChange}
              />
              <input
                type="text"
                name="company"
                value={editUser.company?.name || ''}
                onChange={this.handleInputChange}
              />
              <button onClick={this.onSaveUser} className = "btn btn-success">Save</button>
            </div>
          )}
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;



