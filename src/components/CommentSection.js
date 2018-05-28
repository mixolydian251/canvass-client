import React from 'react';
import gql from 'graphql-tag'
import { Query, Mutation } from 'react-apollo';
import Comment from './Comment'

const getCommentsQuery = gql`
query ($canvassId: String!){
  getComments(canvassId: $canvassId) {
    id
    text
    creator {
      id
      username
    }
    replies{
      id
    }
  }
}`;

const createCommentMutation = gql`
mutation ($text: String!, $canvassId: String!){
  createComment(text: $text, canvassId: $canvassId) {
    ok
    comment {
      id
      text
      creator_id
      reply_ids
    }
  }
}`;

class CommentSection extends React.Component {

  state = {
    comments: undefined,
    commentText: '',
    createComment: false
  };

  toggleCreateComment = () => {
    this.setState((prevState) => ({ createComment: !prevState.createComment }))
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({[name]: value});
  };

  loadComments = (comments) => {
    this.setState({ comments })
  };

  createComment = async (createComment) => {
    await createComment({
      variables: {
        canvassId: this.props.canvassId,
        text: this.state.commentText
      }
    });
    this.refetchData();
  };

  render() {
    return (
      <Mutation mutation={createCommentMutation}>
        {(createComment) => {

          return (
            <Query query={getCommentsQuery}
                   variables={{canvassId: this.props.canvassId}}>

              {({ loading, error, data, refetch }) => {

                if (loading) return null;
                if (error) return error;
                if (data) {

                  const comments = data.getComments;
                  this.refetchData = refetch;

                  return (
                    <div>

                      {() => { this.loadComments(comments) }}

                      <h2>Comments</h2>
                      <button onClick={this.toggleCreateComment}> Add Comment </button>

                      { this.state.createComment &&
                        <div>
                          <input
                            name="commentText"
                            type="text"
                            placeholder="Write a comment"
                            autoFocus
                            value={this.state.commentText}
                            onChange={this.onChange}
                          />
                          <button onClick={() => { this.createComment(createComment) }}> Submit Comment </button>
                        </div>
                      }

                      {
                        comments && comments.map((comment) => (
                        <Comment
                          key={comment.id}
                          id={comment.id}
                          creator={comment.creator}
                          created_at={comment.created_at}
                          text={comment.text}/>
                      ))}
                    </div>
                  )
                }
              }}
            </Query>
          )
        }}
      </Mutation>
    )
  }
}

export default CommentSection