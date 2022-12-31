import React, {useState} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'


function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    )
}

function Board() {

    const [squares, setSquares] = useState(Array(9).fill(null))
    const [xIsNext, setXIsNext] = useState(true)

    const renderSquare = (i) => {
        return (
            <Square
                value={squares[i]}
                onClick={() => handleClick(i)}
            />
        )
    }

    const handleClick = (i) => {
        //Check if there's a winner or if this square is already taken
        if (calculateWinner(squares) || squares[i])
            return
        const newSquares = squares.slice()
        newSquares[i] = xIsNext ? 'X' : 'O'
        setSquares(newSquares)
        setXIsNext(!xIsNext)
    }

    const winner = calculateWinner(squares)
    const status = winner ? 'Winner: ' + winner
        : 'Next player: ' + (xIsNext ? 'X' : 'O') //No winner yet, show next player

    return (
        <div>
            <div className="status">{status}</div>
            <div>
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div>
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div>
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    )

}

function Game() {
    return (
        <div className="game">
            <div className="game-board">
                <Board/>
            </div>
        </div>
    )
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

