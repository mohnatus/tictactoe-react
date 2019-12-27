import React from 'react';
import './Square.css';

const Square = props => {
  let classes = ['square'];
  if (props.selected) {
    classes.push('selected');
  }
  if (props.success) {
    classes.push('success');
  }
  
  return (
    <button 
      className={classes.join(' ')} 
      onClick={props.onClick}
    >
        { props.value }
    </button>
  );
};

export default Square;