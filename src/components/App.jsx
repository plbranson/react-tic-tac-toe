/*
 *  Copyright 2023 Patrick L. Branson
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

import Board from './Board'
import ScoreBoard from './ScoreBoard'
import ResetButton from './ResetButton'

import '../styles/App.css'

function App() {
  // An Array of the all possible winning combination
  const winningCombinations = [
    /* Horizontal Winning Combinations */
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    /* Vertical Winning Combinations */
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    /* Diagonal Winning Combinations */
    [0, 4, 8],
    [2, 4, 6],
  ]

  const [crossTurn, setCrossTurn] = useState(true)
  const [gameOver, setGameOver] = useState(false)
  const [board, setBoard] = useState(Array(9).fill(null))
  const [scores, setScores] = useState({ crossScore: 0, circleScore: 0 })

  function handleSquareClick(squareIndex) {
    // Step One: Update the board
    const updatedBoard = board.map((value, index) => {
      if (index === squareIndex) {
        return crossTurn ? 'X' : 'O'
      } else {
        return value
      }
    })

    setBoard(updatedBoard)

    // Step Two: Check if either player has won the game
    const winner = checkWinner(updatedBoard)

    if (winner) {
      if (winner === 'O') {
        let { circleScore } = scores
        circleScore += 1
        setScores({ ...scores, circleScore })
      } else {
        let { crossScore } = scores
        crossScore += 1
        setScores({ ...scores, crossScore })
      }
    }

    // Step Three: Change active player
    setCrossTurn(!crossTurn)
  }

  function checkWinner(board) {
    for (let index = 0; index < winningCombinations.length; ++index) {
      const [x, y, z] = winningCombinations[index]

      // Iterate through win conditions and check if either player satisfies them
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver(true)
        return board[x]
      }
    }
  }

  function resetBoard() {
    setGameOver(false)
    setBoard(Array(9).fill(null))
  }

  return (
    <div>
      <ScoreBoard scores={scores} crossTurn={crossTurn} />
      <Board board={board} onClick={gameOver ? resetBoard : handleSquareClick} />
      <ResetButton resetButton={resetBoard} />
    </div>
  )
}

const app = ReactDOM.createRoot(document.getElementById('app'))
app.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
