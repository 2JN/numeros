import React from 'react';
import ReactDOM from 'react-dom';

function Form(props) {
  return (
    <form method="post" action="/users/register">
      <div className="formn-group">
        <label> Name </label>
        <input
          className="form-control"
          type="text"
          placeholder="username"
          name="username" />
      </div>
    </form>
  )
}

ReactDOM.render(
  <Form />,
  document.getElementById('register-form')
);
