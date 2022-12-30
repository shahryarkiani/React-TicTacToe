import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'


function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    )
}

class Board extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        }
    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        )
    }

    handleClick(i) {
        //Check if there's a winner or if this square is already taken
        if (calculateWinner(this.state.squares) || this.state.squares[i])
            return
        const newSquares = this.state.squares.slice()
        newSquares[i] = this.state.xIsNext ? 'X' : 'O'
        this.setState({
            squares: newSquares,
            xIsNext: !this.state.xIsNext,
        })
    }

    render() {
        const winner = calculateWinner(this.state.squares)
        //Determines what to print
        const status = winner ? 'Winner: ' + winner : 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')

        return (
            <div>
                <div className="status">{status}</div>
                <div>
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div>
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div>
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board/>
                </div>
            </div>
        )
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<Game/>)


function calculateWinner(squares) {

    //Checks rows
    for (let i = 0; i <= 2; i++) {
        if (squares[3 * i] && squares[3 * i] === squares[3 * i + 1] && squares[3 * i] === squares[3 * i + 2])
            return squares[3 * i]
    }

    //Checks cols
    for (let i = 0; i <= 2; i++) {
        if (squares[i] && squares[i] === squares[i + 3] && squares[i] === squares[i + 6])
            return squares[i]
    }

    //Check diagonals
    if (squares[0] && squares[0] === squares[4] && squares[0] === squares[8])
        return squares[0]
    if (squares[2] && squares[2] === squares[4] && squares[2] === squares[6])
        return squares[2]

    //All checks complete, so no winner yet
    return null

}

