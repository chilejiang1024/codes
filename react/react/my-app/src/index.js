import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  /**
   * check if that all squares filled
   * @param  {[type]} squares [description]
   * @return {[bool]}         [description]
   */
  allSquaresFilled(squares) {
    for (var i = squares.length - 1; i >= 0; i--) {
      if (null === squares[i]) {
        return false;
      }
    }
    return true;
  }

  /**
   * handler when click a square
   * @param  {[type]} i the index of square
   * @return {[type]}   [description]
   */
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (this.allSquaresFilled(squares) || this.calculateWinner(squares)) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares, 
      xIsNext: !this.state.xIsNext,
    });
  }

  /**
   * render square 
   * @param  {[type]} i [description]
   * @return {[type]}   [description]
   */
  renderSquare(i) {
    return (
      <Square 
        value={this.state.squares[i]} 
        onClick={() => this.handleClick(i)}
      />
    );
  }

  /**
   * check is there a winner
   * @param  {[type]} squares [description]
   * @return {[type]}         [description]
   */
  calculateWinner(squares) {
    const winCases = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (var i = winCases.length - 1; i >= 0; i--) {
      const [a, b, c] = winCases[i];
      if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  render() {
    let status;
    const winner = this.calculateWinner(this.state.squares);
    if (winner) {
      status = 'winner : ' + winner;
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

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ==========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);













