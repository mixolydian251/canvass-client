import React from 'react';
import gql from 'graphql-tag'
import { Query } from 'react-apollo';
import CanvassCard from './CanvassCard'

const userQuery = gql` 
query {
  me {
    username
    categories {
      id
      name
      canvasses {
        id
        title
        comment_ids
        options {
          voter_ids
        }
        creator{
          username
        }
      }
    }
  }
}`;

class Dashboard extends React.Component {

  generateCanvasses = (categories) => {
    const canvasses = [];
    categories.forEach((category) => {
      category.canvasses.forEach((canvass) => {
        canvasses.push({...canvass, category: category.name})
      })
    });

    return canvasses.map(({category, title, creator, options, comment_ids}) => (
      <CanvassCard
        category={ category }
        title={ title }
        username={ creator.username }
        totalVotes={ options.map((option) => option.voter_ids.length).reduce((a,b) => a + b) }
        totalComments={ comment_ids.length }
      />
    ))
  };

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

                <div className="dashboard__canvasses">
                  {this.generateCanvasses(me.categories)}
                </div>

              </div>
            )
          }
        }}
      </Query>
    );
  }
}

export default Dashboard;