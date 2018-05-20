import React from 'react';
import gql from 'graphql-tag'
import { Query } from 'react-apollo';

const userQuery = gql` 
query {
  me {
    username
    categories {
      name
    }
  }
}`;

class Dashboard extends React.Component {

  render() {
    return (
      <Query query={ userQuery }>
        {({ loading, error, data }) => {

          if (loading) return null;
          if (error) return <p>Error!: {error}</p>;

          if(data) {

            const { me } = data;

            return (
              <div className="dashboard">
                <div className="dashboard__welcome">{`Welcome to Canvass, ${me.username}`}</div>
                <div>Here are your categories</div>

                <ul> {
                    me.categories.map((category) => (
                      <li key={category.name}>{category.name}</li>
                    ))}
                </ul>

              </div>
            )
          }
        }}
      </Query>
    );
  }
}

export default Dashboard;
