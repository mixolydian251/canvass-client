import React from 'react';
import gql from 'graphql-tag'
import { Query } from 'react-apollo';

const canvassQuery = gql` 
query ($canvassId: String!){
  getCanvassById(canvassId: $canvassId) {
    title
    category {
      name
      canvass_ids
    }
    creator {
      username
    }
    options {
      id
      text
      voters {
        username
      }
    }
    comments {
      id
      text
      creator{
        username
      }
      replies{
        id
      	text
      	creator{
        	username
      	}
      }
    }
  }
}`;

class Canvass extends React.Component{

  render() {
    return (
      <Query  query={ canvassQuery }
              variables={{canvassId: this.props.match.params.canvassId}}>

        {({loading, data}) => {

          if (loading) return null;

          if (data) {

            const {
              title,
              category,
              creator,
              options,
              comments
            } = data.getCanvassById;

            return(
              <div className="canvass">
                <h1>{title}</h1>
                <p>{creator.username}</p>
                <p>{category.name}</p><br/>
                <h2>Options:</h2>
                <ol>
                  { options.map((option) => <li key={option.id}>{option.text}</li>) }
                </ol><br/>

                <h2>Comments:</h2>
                <ol>
                  { comments.map((comment) => <li key={comment.id}>{`${comment.creator.username} says: ${comment.text}`}</li>) }
                </ol>
              </div>
            )
          }
        }}
      </Query>
    )
  }
}

export default Canvass