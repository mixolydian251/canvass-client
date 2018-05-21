import React from 'react';
import vote from "../images/vote.svg";
import comment from "../images/comments.svg"
import pie from "../images/pie.svg";

const CanvassCard = (props) => (
  <div className="canvassCard">

    <div className="canvassCard__header">
      <span className="canvassCard__header--category">{props.category}</span>
      <span className="canvassCard__header--creator">{props.username}</span>
    </div>

    <h1 className="canvassCard__title">{props.title}</h1>

    <img className="canvassCard__img" src={pie}/>

    <div className="canvassCard__footer">
      <div className="canvassCard__footerElement">
        <img src={vote} className="canvassCard__footerElement--img"/>
        <span className="canvassCard__footerElement--number">{props.totalVotes}</span>
      </div>

      <div className="canvassCard__footerElement">
        <img src={comment} className="canvassCard__footerElement--img"/>
        <span className="canvassCard__footerElement--number">{props.totalComments}</span>
      </div>
    </div>

  </div>
);

export default CanvassCard;