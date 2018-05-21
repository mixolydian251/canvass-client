import React from 'react';
import vote from "../images/vote.svg";
import comment from "../images/comments.svg"

const CanvassCard = (props) => (
  <div className="canvassCard">

    <div className="canvassCard__header">
      <span className="canvassCard__header--category">{props.category}</span>
      <span className="canvassCard__header--creator">{props.username}</span>
    </div>

    <img className="canvassCard__img" src={props.imageURL}/>

    <h1 className="canvassCard__title">{props.title}</h1>

    <div className="canvassCard__footer">
      <div className="canvassCard__footerElement">
        <span className="canvassCard__footerElement--number">{props.totalVotes}</span>
        <img src={vote} className="canvassCard__footerElement--img"/>
      </div>

      <div className="canvassCard__footerElement">
        <span className="canvassCard__footerElement--number">{props.totalComments}</span>
        <img src={comment} className="canvassCard__footerElement--img"/>
      </div>
    </div>

  </div>
);

export default CanvassCard;