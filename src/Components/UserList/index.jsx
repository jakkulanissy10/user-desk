import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const UserList = props => { 
  const {eachUsers, onHandleEdit, deleteUser} = props
  return (
    <div className="container-fluid">
      <h1 className = 'user-heading'>User Details</h1>
    <div className = 'table-container'>
      <table className="table table-bordered table-light table-responsive border border-dark">
  <thead>
    <tr className="border border-dark">
      <th>Id</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Email</th>
      <th>Department</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {eachUsers.map((user) => {
      // Split the name to fall into appropriate columns
      const [firstName, lastName] = user.name.split(' ');
      return (
        <tr key={user.id} className="border border-dark">
          <td>{user.id}</td>
          <td>{firstName}</td>
          <td>{lastName}</td>
          <td>{user.email}</td>
          <td>{user.company.name}</td>
          <td>
            {/* Edit button handler */}
            <button onClick={() => onHandleEdit(user)} className="edit-btn">Edit</button>
            {/* Delete button handler */}
            <button onClick={() => deleteUser(user.id)} className="delete-btn">Delete</button>
          </td>
        </tr>
      );
    })}
  </tbody>
</table>

    </div>
    </div>
  );
};

export default UserList;
