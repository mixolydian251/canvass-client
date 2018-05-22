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

  const generateCanvasses = (canvasses, category) => (
    canvasses.map(({ id, title, creator, options, comment_ids}) => (
      <Link to={`/c/${id}`}
            key={id}>
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
  );

  const generateCategories = (categories) => {
    return categories.map((category) => {
      return(
        <div key={category.id}>
          <h2 className="dashboard__title">{category.name}</h2>
          <div className="dashboard__canvasses">
            {generateCanvasses(category.canvasses, category.name)}
          </div>
        </div>
      )
    });
  };

  return (
    <Query query={ userQuery }>
      {({ loading, error, data }) => {

        if (loading) return null;
        if (error) return <p>Error!: {error}</p>;

        if(data) {

          const { categories } = data.me;

          return (
            <div className="dashboard">
              {generateCategories(categories)}
            </div>
          )
        }
      }}
    </Query>
  );
};

export default Dashboard;