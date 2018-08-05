import React from 'react';
import { Board } from './Board';
import { calculateWinner } from './CalculateWinner';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      // add stepNumber to the Game component’s state to indicate which step we’re currently viewing.
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    // if we “go back in time” and then make a new move from that point,
    // we throw away all the “future” history that would now become incorrect.
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    // call .slice() to create a new copy of the squares array after every move to modify, and treat it as immutable.
    // The original array will not be modified.
    const squares = current.squares.slice();
    // ignore a click if someone has won the game or if a Square is already filled.

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      // After we make a new move, we need to update stepNumber
      // by adding stepNumber: history.length as part of the this.setState argument.
      // Unlike the array push() method, the concat() method doesn’t mutate the original array.
      // we don’t get stuck showing the same move after a new one has been made.
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  render() {
    const history = this.state.history;
    // modify the Game component’s render method from always rendering the last move
    // to rendering the currently selected move according to stepNumber
    // const current = history[history.length - 1];
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    // map our history of moves to React elements representing buttons
    // on the screen, and display a list of buttons to “jump” to past moves.

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';

      // In the tic-tac-toe game’s history, each past move has a unique ID associated with it:
      // it’s the sequential number of the move. The moves are never re-ordered, deleted,
      // or inserted in the middle, so it’s safe to use the move index as a key.

      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export { Game };
