import React from 'react';
import ReactDOM from 'react-dom';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };

    this.checkUserName = this.checkUserName.bind(this);
  }

  checkUserName(node) {
    fetch(`/users/${node.target.value}`).then((response) => {
      return response.text();
    }).then((user) => {
      let j_user = JSON.parse(user);
      if (j_user) {
        this.setState({
          username: j_user.username
        });
      } else {
        this.setState({
          username: ''
        });
      }
    });
  }

  render() {
    const username = this.state.username;
    let error = null;

    if (username) {
      error = (
        <div className="alert alert-danger">
          username {username} already exists
        </div>
      );
    }

    return (
      <form method="post" action="/users/register">
        <div className="form-group">
          <label> Name </label>
          <input
            className="form-control"
            type="text"
            placeholder="name"
            name="name" />
        </div>
        <div className="form-group">
          <label> UserName </label>
          <input
            className="form-control"
            placeholder="username"
            type="text"
            name="username"
            onChange={this.checkUserName} />
        </div>

        {error}

        <div className="form-group">
          <label> Email </label>
          <input
            className="form-control"
            placeholder="email"
            type="email"
            name="email" />
        </div>
        <div className="form-group">
          <label> Password </label>
          <input
            className="form-control"
            placeholder="password"
            type="password"
            name="password" />
        </div>
        <div className="form-group">
          <label> Confirm Password </label>
          <input
            className="form-control"
            placeholder="password"
            type="password"
            name="password2" />
        </div>
        <button className="btn btn-default" type="submit">
          submit
        </button>
      </form>
    )
  }
}

ReactDOM.render(
  <Form />,
  document.getElementById('register-form')
);
