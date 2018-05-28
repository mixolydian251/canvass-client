import React from 'react';
import moment from 'moment';

const Comment = ({ id, creator, text, created_at }) => {

  return (
    <div className="canvass__comment" key={id}>
      <div className="canvass__commentHeader">
        <h4 className="canvass__comment--username">{creator.username}</h4>
        <p>{moment(created_at).fromNow()}</p>
      </div>
      <p className="canvass__comment--text">
        {text}
      </p>
    </div>
  )
};

export default Comment;