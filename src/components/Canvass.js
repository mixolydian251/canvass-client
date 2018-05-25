import React from 'react';
import gql from 'graphql-tag'
import { Query, Mutation } from 'react-apollo';
import Option from './Option';
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
        id
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

const voteMutation = gql`
mutation ($canvassId: String!, $optionId: String!) {
  vote(canvassId: $canvassId, optionId: $optionId){
    ok
    options {
      id
      text
      voter_ids
    }
  }      
}`;

class Canvass extends React.Component{

  render() {

    return (
    <Mutation mutation={voteMutation}>
      {(vote, { data }) => {

        return(
        <Query  query={ canvassQuery }
                variables={{canvassId: this.props.match.params.canvassId}}>

          {({ loading, error, data, refetch }) => {

            if (loading) return null;
            if (error) return error;
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
                    {
                      options.map((option) => (
                        <Option
                          key={option.id}
                          text={option.text}
                          optionId={option.id}
                          canvassId={this.props.match.params.canvassId}
                          vote={vote}
                          refetch={refetch}/>
                      ))
                    }
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
      )}}
    </Mutation>
    )
  }
}

export default Canvass