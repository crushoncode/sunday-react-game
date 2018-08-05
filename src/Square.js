import React from 'react';

// <button className="square" onClick={() => alert('click')}>
// passing a function as the onClick prop. It only fires after a click.
// if we forget () =>, it would fire the alert every time the component re-renders.

class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

export { Square };
