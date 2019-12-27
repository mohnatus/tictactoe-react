import React from 'react';
import Square from './Square/Square';
import './Board.css';

class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square 
          key={i}
          value={this.props.squares[i]} 
          selected={this.props.selected == i}
          success={this.props.success && this.props.success.indexOf(i) !== -1}
          onClick={ () => this.props.handleClick(i) }
        />
      );
    }
  
    render() {
      return Array(3).fill(null).map((el, row) => (
          <div className="board-row" key={row}>
            {
              Array(3).fill(null).map((el, col) => this.renderSquare(row * 3 + col))
            }
          </div>
        )
      );
    }
}

export default Board;