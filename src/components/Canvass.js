import React from 'react';
import gql from 'graphql-tag'
import { Query } from 'react-apollo';
import Chart from './Chart';

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

                <div className="canvass__header">
                  <h1 className="canvass__header--title">{title}</h1>
                  <p className="canvass__header--category">{category.name}</p>
                  <p className="canvass__header--username">{creator.username}</p>
                </div>

                <div className="canvass__chart">
                  <Chart options={options}/>
                </div>

                <div className="canvass__options">
                  <h2>Options</h2>
                  { options.map((option) => <button className="canvass__option" key={option.id}>{option.text}</button>) }
                </div>



                <div className="canvass__commentSection">
                  <h2>Comments</h2>

                  { comments.map((comment) => (
                    <div className="canvass__comment" key={comment.id}>
                      <h4 className="canvass__comment--username">
                        {comment.creator.username}
                      </h4>
                      <p className="canvass__comment--text">
                        {comment.text}
                      </p>
                    </div>
                  )) }
                </div>

              </div>
            )
          }
        }}
      </Query>
    )
  }
}

export default Canvass