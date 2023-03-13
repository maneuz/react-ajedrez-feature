import React, { useEffect, useState } from 'react'
import './App.css'
import { gameSubject, initGame, resetGame } from './Game'
import Board from './Board'
import { useParams, useHistory } from 'react-router-dom'
import { db } from './firebase'

function GameApp() {
  const [board, setBoard] = useState([])
  const [isGameOver, setIsGameOver] = useState()
  const [result, setResult] = useState()
  const [position, setPosition] = useState()
  const [initResult, setInitResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('')
  const [game, setGame] = useState({})
  const { id } = useParams()
  const history = useHistory()
  const sharebleLink = window.location.href
  useEffect(() => {
    let subscribe
    async function init() {
      const res = await initGame(id !== 'local' ? db.doc(`games/${id}`) : null)
      setInitResult(res)
      setLoading(false)
      if (!res) {
        subscribe = gameSubject.subscribe((game) => {
          setBoard(game.board)
          setIsGameOver(game.isGameOver)
          setResult(game.result)
          setPosition(game.position)
          setStatus(game.status)
          setGame(game)
        })

      }

    }

    init()

    return () => subscribe && subscribe.unsubscribe()
  }, [id])

  async function copyToClipboard() {
    await navigator.clipboard.writeText(sharebleLink)
  }

  if (loading) {
    return 'Loading...'
  }
  if (initResult === 'notfound') {
    return 'Game Not found'
  }

  if (initResult === 'intruder') {
    return 'The game is already full'
  }

  return (
    <div className="app-container">
      {isGameOver && (
        <h2 className="vertical-text">
          GAME OVER
          <button onClick={async () => {
            await resetGame()
            history.push('/')
          }}>
            <span className="vertical-text"> NEW GAME</span>
          </button>
        </h2>
      )}
      <div className="board-container">
        {game.oponent && game.oponent.name && <span className="tag is-link">{game.oponent.name}</span>}
        <Board board={board} position={position} />
        {game.member && game.member.name && <span className="tag is-link">{game.member.name}</span>}
      </div>
      {result && <p className="vertical-text">{result}</p>}
      {status === 'waiting' && (
        <div className="notification is-link share-game">
          <strong>Share this game to continue</strong>
          <div className="field has-addons">
            <div className="control is-expanded">
              <input type="text" name="" id="" className="input" readOnly value={sharebleLink} />
            </div>
            <div className="control">
              <button className="button is-info" onClick={copyToClipboard}>Copy</button>
              <br />
              
            </div>
          </div>
          {/* Whatsapp */}
          <div className="icons">
              <a href={`https://api.whatsapp.com/send?text=${sharebleLink}`} target="_blank" onClick={copyToClipboard} rel="noopener noreferrer">
              <img src="https://img.icons8.com/color/48/000000/whatsapp.png" alt="social"/>
              </a>
              {/* Gmail */}
              <a href={`mailto:?Subject=&body=${encodeURI(sharebleLink)}`} onClick={copyToClipboard}rel="noopener noreferrer">
              <img src="https://img.icons8.com/fluent/48/000000/gmail.png" alt="social"/>
              </a>
              {/* Twitter */}
              <a href={`https://twitter.com/messages/compose?recipient_id=&text=${sharebleLink}`} target="_blank" onClick={copyToClipboard} rel="noopener noreferrer">
              <img src="https://img.icons8.com/fluent/48/000000/twitter.png" alt="social"/>
              </a>
              {/* Facebook */}
              <a href={`https://www.facebook.com/sharer/sharer.php?u=&text=${sharebleLink}`} target="_blank" onClick={copyToClipboard} rel="noopener noreferrer">
              <img src="https://img.icons8.com/fluent/48/000000/facebook.png" alt="social"/>
              </a>
              {/* Facebook */}
              <a href={`https://telegram.me/share/url?url=DIRECCION_URL&text=${sharebleLink}`} target="_blank" onClick={copyToClipboard} rel="noopener noreferrer">
              <img src="https://img.icons8.com/fluent/48/000000/telegram-app.png" alt="social"/>
              </a>
              </div>
        </div>
      )}

    </div>
  )
}

export default GameApp
