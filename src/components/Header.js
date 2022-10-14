import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import LoadingElement from './LoadingElement';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      isLoading: false,
    };
    this.retrieveUser = this.retrieveUser.bind(this);
  }

  componentDidMount() {
    this.retrieveUser();
  }

  async retrieveUser() {
    this.setState({ isLoading: true });
    const { name } = await getUser();
    this.setState(({ isLoading: false, userName: name }));
  }

  render() {
    const { userName, isLoading } = this.state;
    return (
      isLoading === true ? (<LoadingElement />) : (
        <header data-testid="header-component">
          <h2 data-testid="header-user-name" className="username">{ userName }</h2>
          <nav className="nav-elements">
            <Link data-testid="link-to-search" to="/search">Pesquisar</Link>
          </nav>
        </header>
      ));
  }
}

export default Header;
