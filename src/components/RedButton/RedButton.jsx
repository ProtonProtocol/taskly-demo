import React from 'react';
import PropTypes from 'prop-types';
import './RedButton.sass';

const RedButton = ({text, text2, handleOnClick, className, isLoading}) => {
  let buttonContent;
  if (isLoading) {
    buttonContent = (<div class="sk-fading-circle">
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
  </div>)
  } else {
    if (text2) {
      buttonContent = (<><span>{text}</span><span>{text2}</span></>)
    } else {
      buttonContent = (<span>{text}</span>);
    }
  }
  return (
    <button className={`red-button ${className}`} type="button" onClick={handleOnClick}>
      { buttonContent }
    </button>
  );
}

RedButton.propTypes = {
  text: PropTypes.string.isRequired,
  text2: PropTypes.string,
  handleOnClick: PropTypes.func,
  isLoading: PropTypes.bool,
};

RedButton.defaultProps = {
  handleOnClick: () => {},
  isLoading: false,
}

export default RedButton;
