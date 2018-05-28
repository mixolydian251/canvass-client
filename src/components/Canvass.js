import React from 'react';
import gql from 'graphql-tag'
import { Query, Mutation } from 'react-apollo';
import Option from './Option';
import CommentSection from './CommentSection';
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
    }
  }
}`;

const voteMutation = gql`
mutation ($canvassId: String!, $optionId: String!) {
  vote(canvassId: $canvassId, optionId: $optionId){
    ok
  }      
}`;

class Canvass extends React.Component{

  state = {
    refetch: false,
  };

  refetchVotes = () => {
    this.setState({ refetch: true })
  };

  resetState = () => {
    this.setState({ refetch: false })
  };

  render() {

    return (
    <Mutation mutation={voteMutation}>
      {(vote) => {

        return(
        <Query  query={ canvassQuery }
                variables={{canvassId: this.props.match.params.canvassId}}>

          {({ loading, error, data }) => {

            if (loading) return null;
            if (error) return error;
            if (data) {

              const {
                title,
                category,
                creator,
                options,
              } = data.getCanvassById;

              return(
                <div className="canvass">

                  <div className="canvass__header">
                    <h1 className="canvass__header--title">{title}</h1>
                    <p className="canvass__header--category">{category.name}</p>
                    <p className="canvass__header--username">{creator.username}</p>
                  </div>

                  <div className="canvass__chart">
                    <Chart canvassId={this.props.match.params.canvassId}
                           refetch={this.state.refetch}
                           reset={this.resetState}/>
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
                          refetch={this.refetchVotes}/>
                      ))
                    }
                  </div>

                  <CommentSection className="canvass__commentSection"
                                  canvassId={this.props.match.params.canvassId}/>

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