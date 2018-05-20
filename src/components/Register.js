import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const createUserMutation = gql`
        mutation register($username: String!, $email: String!, $password: String!) {
          register(username: $username, email: $email, password: $password){
            ok
            errors {
              path
              message
            }
          }        
        }`;

class Register extends React.Component {

  state = {
    username: '',
    email: '',
    password: '',
    verifyPassword: '',
    passwordDoesNotMatch: false,
    submitError: false,
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({[name]: value})
  };

  createUser = async (register) => {
    if(!this.state.username || !this.state.email || !this.state.password || !this.state.verifyPassword){
      this.setState({submitError: true});
    }
    else if (this.state.password !== this.state.verifyPassword) {
      this.setState({passwordDoesNotMatch: true, submitError: false});
    }
    else {
      this.setState({passwordDoesNotMatch: false,  submitError: false});
      const response = await register({
        variables: {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password
        }
      });

      if (response.data.register.ok) {
        this.props.history.push("/")
      }
    }
  };

  render() {
    return (
      <Mutation mutation={createUserMutation}>
        { (register, { data }) => (

          <div className="login">

            <h1 className="register__title">Create an account</h1>

            <div className="register__form">

              <div>
                <input  name="username"
                        placeholder="Username"
                        type="text"
                        className="register__form--item"
                        value={this.state.username}
                        onChange={this.onChange}/>

                { // display error if username is already taken
                  data && !data.register.ok && data.register.errors[0].path === 'username'
                  && <p className="register__form--error">{data.register.errors[0].message}</p> }
              </div>

              <div>
                <input  name="email"
                        placeholder="Email"
                        type="text"
                        className="register__form--item"
                        value={this.state.email}
                        onChange={this.onChange}/>

                { // display error if username is already taken
                  data && !data.register.ok && data.register.errors[0].path === 'email'
                  && <p className="register__form--error">{data.register.errors[0].message}</p> }
              </div>

              <div>
                <input  name="password"
                        placeholder="Password"
                        type="password"
                        className="register__form--item"
                        value={this.state.password}
                        onChange={this.onChange}/>

                { // display error if password does not meet requirements
                  data && !data.register.ok && data.register.errors[0].path === 'password'
                  && <p className="register__form--error">{data.register.errors[0].message}</p> }
              </div>

              <div>
                <input  name="verifyPassword"
                        placeholder="Re-type Password"
                        type="password"
                        className="register__form--item"
                        value={this.state.verifyPassword}
                        onChange={this.onChange}/>

                { // display error if passwords do not match
                  this.state.passwordDoesNotMatch &&
                  <p className="register__form--error">Passwords do not match.</p> }
              </div>

              <button className="register__form--button"
                      onClick={() => {this.createUser(register)}}>
                Create Account
              </button>

              { // display error if passwords do not match
                this.state.submitError &&
                <p className="register__form--error">Fill out all of the fields to register</p> }

            </div>
          </div>
        )}
      </Mutation>
    )
  }
}

export default Register;