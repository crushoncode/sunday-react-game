import React from 'react';
import { Square } from './Square';

// Since the Square components no longer maintain state,
// the Square components receive values from the Board component and
// inform the Board component when they’re clicked. In React terms,
// the Square components are now controlled components.
// The Board has full control over them.

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    };
  }

  handleClick(i) {
    // call .slice() to create a copy of the squares array to modify
    // The original array will not be modified.
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export { Board };

// Immutability makes complex features much easier to implement.
// Later implement a “time travel” feature that allows us to review
// the tic-tac-toe game’s history and “jump back” to previous moves.
// This functionality isn’t specific to games — an ability to undo
// and redo certain actions is a common requirement in applications.
// Avoiding direct data mutation lets us keep previous versions of
// the game’s history intact, and reuse them later.
