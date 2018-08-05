import React from 'react';

// <button className="square" onClick={() => alert('click')}>
// passing a function as the onClick prop. It only fires after a click.
// if we forget () =>, it would fire the alert every time the component re-renders.

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    };
  }

  render() {
    return (
      <button className="square" onClick={() => this.setState({ value: 'X' })}>
        {this.state.value}
      </button>
    );
  }
}

export { Square };
