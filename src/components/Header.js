import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
const pie = require("../images/pie.svg");

const usernameQuery = gql` 
query {
  me {
    username
  }
}`;


const Header = () => (
  <Query query={ usernameQuery }>
    {({ loading, error, data }) => {

      if (loading) return null;
      if (error) return <p>Error!: </p>;

      if(data) {

        const { username } = data.me;

        return (

          <div className="header-container">
            <div className="header">

              <Link to="/" className="header__banner">
                <img className="header__banner--logo" src={pie}/>
                <span className="header__banner--name">Canvass</span>
              </Link>

              <div className="header__search">
                <input className="header__search--bar"/>
                <button className="header__search--button">Search</button>
              </div>

              <div className="header__user">
                <span className="header__user--name">{`/u/${username ? username : "sign in"}`}</span>
              </div>

            </div>
          </div>

        )
      }
    }}
  </Query>
);

export default Header
