import ReactDOM from 'react-dom';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      fullname: '',
      username: '',
      _id: ''
    }
  }
  componentDidMount() {
    fetch("http://localhost:3001/api/users")
      .then(users => users.json())
      .then(users => this.setState({
        users: users
      }))
  }
  beforeCreate(event) {
    const name = event.target.name
    const value = event.target.value
    this.setState({ [name]: value });

  }
  createUser(event) {
    // event.preventDefault();
    fetch("http://localhost:3001/api/users/create", {
      method: "post",
      headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body: `fullname=${this.state.fullname}&username=${this.state.username}`
    });
    // window.location.reload(true);
  }

  beforeUpdate(event) {
    const name = event.target.name
    const value = event.target.value
    this.setState({ [name]: value });

  }
  updateUser(event) {
    //  event.preventDefault();
    fetch("http://localhost:3001/api/users/update", {
      method: "put",
      headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body: `_id=${this.state._id}&fullname=${this.state.fullname}&username=${this.state.username}`
    });
    //  window.location.reload(true);
  }

  deleteUser(uid, event) {
    fetch("http://localhost:3001/api/users/delete", {
      method: "delete",
      headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body: `_id=${uid}`
    });
    window.location.reload(true);
  }

  render() {
    return (
    <>
    <nav className="navbar-brand navbar-dark  ">CRUD MERN APP</nav>
      <div className="container mt-xl-5">
        <div >
          <table border="1" className="table-dark">
            <thead>
              <tr >
                <th className="col-6">ID</th>
                <th className="col-2">Full Name</th>
                <th className="col-3">Username</th>
                <th className="col-3">Operation</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.users.map(user => (
                  <tr >
                    <td className="col-4">{user._id}</td>
                    <td className="col-2">{user.fullname}</td>
                    <td className="col-3">{user.username}</td>
                    <td className="col-3"><button type="button" className="btn btn-danger" onClick={this.deleteUser.bind(this, user._id)}>Delete</button></td>

                  </tr>
                ))
              }
            </tbody>
          </table>

        </div>

        <div className="container mt-4">
          <div className="row">
            <div className="col-6">
              <h2>Create User</h2>
              <form onSubmit={this.createUser.bind(this)}>
                <p>Fullname:<input type="text" name="fullname" className="input-group mb-3"
                onChange={this.beforeCreate.bind(this)} /></p>

                <p>Username:<input type="text" name="username" className="input-group mb-3"
                 onChange={this.beforeCreate.bind(this)} /></p>
                <input type="submit" value="Create" className="btn btn-primary"  />
              </form>
            </div>



            <div className="col-6">
              <h2>Update User</h2>
              <form onSubmit={this.updateUser.bind(this)} >
                <p>ID:
                  <input type="text" name="_id" className="input-group mb-3"
                  onChange={this.beforeUpdate.bind(this)} /></p>

                <p>Fullname:
                  <input type="text" name="fullname"
                   onChange={this.beforeUpdate.bind(this)} className="input-group mb-3"/></p>

                <p>Username:
                  <input type="text" name="username" className="input-group mb-3"
                  onChange={this.beforeUpdate.bind(this)} /></p>
                <input type="submit" value="Update" className="btn btn-primary" />
              </form>
            </div>
          </div>
        </div>






      </div>
      </>
    )
  }
}

// export default App
ReactDOM.render(<App />, document.getElementById("root"));