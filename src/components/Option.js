import React from 'react';

const Option = ({ vote, refetch, canvassId, optionId, text}) => {

  const voteForOption = () => {
    vote({
      variables: {
        canvassId,
        optionId
      }
    });
    refetch();
  };

  return (
    <div>
      <p>{text}</p>
      <button onClick={voteForOption}>Vote</button>
    </div>
  )
};

export default Option;
