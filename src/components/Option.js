import React from 'react';

const Option = ({ vote, refetch, canvassId, optionId, text}) => {

  const voteForOption = async () => {
    await vote({
      variables: {
        canvassId,
        optionId
      }
    });

    refetch();

    const startPosition =  window.scrollY;
    let t = 0;
    for (let i = startPosition; i > 0; i = i - 4 ){
      requestAnimationFrame(() => {
        setTimeout(() => {
          window.scrollTo(0, i)
        }, t);
        t += 1;
      });

    }
  };

  return (
    <button className="canvass__options--option" onClick={voteForOption}>
      <p className="canvass__options--text">{text}</p>
    </button>

  )
};

export default Option;
