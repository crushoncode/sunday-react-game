import React from 'react';
import { calculateWinner } from './CalculateWinner';
import { Square } from './Square';

// Since the Square components no longer maintain state,
// the Square components receive values from the Board component and
// inform the Board component when they’re clicked. In React terms,
// the Square components are now controlled components.
// The Board has full control over them.

class Board extends React.Component {
  handleClick(i) {
    // call .slice() to create a new copy of the squares array after every move to modify, and treat it as immutable.
    // The original array will not be modified.
    const squares = this.state.squares.slice();
    // ignore a click if someone has won the game or if a Square is already filled.
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
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
