import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import LoadingElement from '../components/LoadingElement';
import Title from '../components/Title';
import './Login_css/login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      inputName: '',
      isLoginButtonDisabled: true,
      isLoading: false,
      requisitionState: false,
    };
    this.setInputs = this.setInputs.bind(this);
    this.onButton = this.onButton.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  onButton(event) {
    event.preventDefault();
    this.loginUser();
  }

  setInputs({ target }) {
    const { value } = target;
    const tamMin = 3;
    this.setState({ inputName: value, isLoginButtonDisabled: value.length < tamMin });
  }

  async loginUser() {
    const { inputName } = this.state;
    const objInput = { name: inputName };
    this.setState({ isLoading: true });
    const callApi = await createUser(objInput);
    if (callApi === 'OK') {
      return this.setState({ isLoading: false, requisitionState: true });
    }
  }

  render() {
    const {
      requisitionState,
      isLoginButtonDisabled,
      isLoading,
      inputName,
    } = this.state;
    return (
      <div data-testid="page-login" className="card-login">
        <div className="title-div">
          <Title />
        </div>
        <div className="div-form">
          <form>
            <h3 className="insert-name">Insira seu nome</h3>
            <label htmlFor="name-input">
              <input
                className="input-name"
                data-testid="login-name-input"
                type="text"
                name="inputName"
                value={ inputName }
                onChange={ this.setInputs }
              />
            </label>
            <div className="class-submit-btn">
              <input
                className="submit-btn"
                data-testid="login-submit-button"
                type="submit"
                value="Entrar"
                disabled={ isLoginButtonDisabled }
                onClick={ this.onButton }
              />
              {isLoading && <LoadingElement />}
              {requisitionState && <Redirect to="/search" />}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
