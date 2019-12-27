import React from 'react';
import Board from './Board/Board';
import calculateWinner from '../utils/calculate-winner';
import getPositionByIndex from '../utils/get-position-by-index';
import './Game.css';

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history: [
        { 
          squares: Array(9).fill(null),
          last: null
        }
      ],
      xIsNext: true,
      stepNumber: 0,
      sortByAsc: true,
    };
    this.handleClick = this.handleClick.bind(this);
    this.toggleSort = this.toggleSort.bind(this);
  }

  toggleSort() {
    this.setState({
      sortByAsc: !this.state.sortByAsc
    })
  }

  handleClick(i) {
    let history = this.state.history.slice(0, this.state.stepNumber + 1);
    let current = history[history.length - 1];
    let squares = [...current.squares];

    if (squares[i]) return;
    if (calculateWinner(squares)) return;

    squares[i] = this.state.xIsNext ? 'x' : 'o';
    
    this.setState({
      history: history.concat([{
        squares,
        last: i
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  renderMovesList() {
    let list = this.state.history.map((step, move) => {
      const desc = move ?
        `Перейти к ходу #${move} (${getPositionByIndex(step.last)})` :
        'К началу игры';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    if (!this.state.sortByAsc) {
      list = list.reverse();
    }
    return list;
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const squares = current.squares;

    let moves = this.renderMovesList();
    
    const hasEmptyCells = squares.some(square => !square);
    const isFinished = calculateWinner(squares);

    const status = isFinished ?
      `Победил ${isFinished.winner}` :
        hasEmptyCells ?
          `Ходит ${this.state.xIsNext ? 'x' : 'o'}` :
          `Больше ходов нет`;

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            xIsNext={this.state.xIsNext}
            winner={isFinished && isFinished.winner}
            success={isFinished ? isFinished.line : []}
            squares={squares}
            selected={current.last}
            handleClick={this.handleClick}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
          <div onClick={this.toggleSort}>
            { this.state.sortByAsc 
              ? 'По убыванию' 
              : 'По возрастанию'
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Game;