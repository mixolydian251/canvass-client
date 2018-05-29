import React from 'react';
import moment from 'moment';

const Comment = ({ id, creator, text, created_at }) => {

  return (
    <div className="comment" key={id}>
      <div className="commentHeader">
        <h4 className="comment__username">{creator.username}</h4>
        <p className="comment__created">{moment(created_at).fromNow()}</p>
      </div>
      <p className="comment__text">
        {text}
      </p>
    </div>
  )
};

export default Comment;