import React from 'react';
import vote from "../images/vote.svg";
import comment from "../images/comments.svg"

const CanvassCard = (props) => (
  <div className="canvassCard">

    <div className="canvassCard__header">
      <span className="canvassCard__header--category">{props.category}</span>
      <span className="canvassCard__header--creator">{`/u/${props.username}`}</span>
    </div>

    <img className="canvassCard__img" src={props.imageURL}/>

    <div className="canvassCard__element canvassCard__element--votes">
      <div className="canvassCard__elementContainer">
        <img src={vote} className="canvassCard__elementImg"/>
        <span className="canvassCard__elementNumber canvassCard__elementNumber--votes">{props.totalVotes}</span>
      </div>
    </div>

    <div className="canvassCard__element canvassCard__element--comments">
      <div className="canvassCard__elementContainer">
        <img src={comment} className="canvassCard__elementImg"/>
        <span className="canvassCard__elementNumber canvassCard__elementNumber--comment">{props.totalComments}</span>
      </div>
    </div>

    <h1 className="canvassCard__title">{props.title}</h1>

  </div>
);

export default CanvassCard;