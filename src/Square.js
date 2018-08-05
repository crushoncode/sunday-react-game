import React from 'react';

// <button className="square" onClick={() => alert('click')}>
// passing a function as the onClick prop. It only fires after a click.
// if we forget () =>, it would fire the alert every time the component re-renders.

// <button className="square" onClick={() => this.props.onClick()}>
// In a class, we used an arrow function to access the correct this value,
// but in a functional component we don’t need to worry about this.

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export { Square };
