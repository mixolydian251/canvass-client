import React from 'react';
import gql from 'graphql-tag'
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
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

const Dashboard = () => {

  const generateCanvasses = (categories) => {
    const canvasses = [];
    categories.forEach((category) => {
      category.canvasses.forEach((canvass) => {
        canvasses.push({...canvass, category: category.name})
      })
    });

    return canvasses.map(({ id, category, title, creator, options, comment_ids}) => (
      <Link to={`/c/${id}`}>
        <CanvassCard
          category={ category }
          title={ title }
          imageURL="https://picsum.photos/330/200/?random"
          username={ creator.username }
          totalVotes={ options.map((option) => option.voter_ids.length).reduce((a,b) => a + b) }
          totalComments={ comment_ids.length }
        />
      </Link>
    ))
  };

  return (
    <Query query={ userQuery }>
      {({ loading, error, data }) => {

        if (loading) return null;
        if (error) return <p>Error!: {error}</p>;

        if(data) {

          const { me } = data;

          return (
            <div className="dashboard">
              <h2 className="dashboard__title">Trending For You</h2>
              <div className="dashboard__canvasses">
                {generateCanvasses(me.categories)}
              </div>

            </div>
          )
        }
      }}
    </Query>
  );
};

export default Dashboard;