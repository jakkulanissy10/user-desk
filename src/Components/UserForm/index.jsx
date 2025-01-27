import React, { Component } from 'react'; 
import './style.css'

class UserForm extends Component {
  state = {
    name: '',
    email: '',
    company: '',
    showForm: false, // State to toggle
    errorMessage: '', // State for error message
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, company } = this.state;

    // Check if any field is empty
    if (!name || !email || !company) {
      this.setState({ errorMessage: '*Required' });
      return;
    }

    const newUser = {
      name,
      email,
      company: { name: company }, // Assuming company is an object
    };

    // Pass the new user to onAddUser function
    this.props.newUser(newUser);

    // Reset form fields and hide the form
    this.setState({ name: '', email: '', company: '', showForm: false, errorMessage: '' });
  };

  toggleForm = () => {
    this.setState((prevState) => ({ showForm: !prevState.showForm }));
  };

  render() {
    const { showForm, errorMessage } = this.state; 
   

    return (
      <div className = 'form-container'>
        <button onClick={this.toggleForm}>
          {showForm ? 'Cancel' : 'Add User'}
        </button>

        {showForm && (
          <div>
            <h3 className = "addUser-heading">Add User</h3>
            <form onSubmit={this.handleSubmit} className="form-styling">
  <div className="row mb-3">
    <label className="col-12">Name:</label>
    <div className="col-12">
      <input
        type="text"
        name="name"
        value={this.state.name}
        onChange={this.handleInputChange}
        className="form-control"
      />
    </div>
  </div>
  <div className="row mb-3">
    <label className="col-12">Email:</label>
    <div className="col-12">
      <input
        type="email"
        name="email"
        value={this.state.email}
        onChange={this.handleInputChange}
        className="form-control"
      />
    </div>
  </div>
  <div className="row mb-3">
    <label className="col-12">Company:</label>
    <div className="col-12">
      <input
        type="text"
        name="company"
        value={this.state.company}
        onChange={this.handleInputChange}
        className="form-control"
      />
    </div>
  </div>
  {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
  <button type="submit" className="btn btn-primary w-100 mt-3">Add User</button>
</form>

          </div>
        )}
      </div>
    );
  }
}

export default UserForm;


