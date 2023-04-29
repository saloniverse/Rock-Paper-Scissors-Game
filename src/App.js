import './App.css';
import rps from './images/rock-paper-scissors.jpg'
import { FaHandRock, FaHandPaper, FaHandScissors } from 'react-icons/fa';
import {useState} from 'react';

const actions = {
  rock: ["scissors"],
  paper: ["rock"],
  scissors: ["paper"],
};

function randomAction() {
  const keys = Object.keys(actions);
  const index = Math.floor(Math.random() * keys.length);

  return keys[index];
}

function calculateWinner(action1, action2) {
  if (action1 === action2) {
    return 0;
  } else if (actions[action1].includes(action2)) {
    return -1;
  } else if (actions[action2].includes(action1)) {
    return 1;
  }

  // This should never really happen
  return null;
}

function ActionIcon({ action, ...props }) {
  const icons = {
    rock: FaHandRock,
    paper: FaHandPaper,
    scissors: FaHandScissors,
  };
  const Icon = icons[action];
  return <Icon {...props} />;
}

function Player({ name = "Player", score = 0, action = "rock" }) {
  return (
    <div className="player">
      <div className="score">{`${name}: ${score}`}</div>
      <div className="action">
        {action && <ActionIcon action={action} size={60} />}
      </div>
    </div>
  );
}

function ActionButton({ action = "rock", onActionSelected }) {
  return (
    <button className="round-btn" onClick={() => onActionSelected(action)}>
      <ActionIcon action={action} size={20} />
    </button>
  );
}

function ShowWinner({winner = 0}) {
  const text = {
    "-1": "You Win!",
    0: "It's a Tie",
    1: "You Lose!",
  };

  return (
    <h2>{text[winner]}</h2>
  )
}

function App() {
  const [playerAction, setPlayerAction] = useState("");
  const [computerAction, setComputerAction] = useState("");

  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [winner, setWinner] = useState(0);

  const onActionSelected = (selectedAction) => {
    const newComputerAction = randomAction();

    setPlayerAction(selectedAction);
    setComputerAction(newComputerAction);

    const newWinner = calculateWinner(selectedAction, newComputerAction);
    setWinner(newWinner);
    if (newWinner === -1) {
      setPlayerScore(playerScore + 1);
    } else if (newWinner === 1) {
      setComputerScore(computerScore + 1);
    }
  };

  return (
    <div className="center">
      <h1>Rock Paper Scissors</h1>
      <div>
        <div className="container">
          <Player name="Player" score={playerScore} action={playerAction} />
          <Player
            name="Computer"
            score={computerScore}
            action={computerAction}
          />
        </div>
        <div>
          <ActionButton action="rock" onActionSelected={onActionSelected} />
          <ActionButton action="paper" onActionSelected={onActionSelected} />
          <ActionButton action="scissors" onActionSelected={onActionSelected} />
        </div>
        <ShowWinner winner={winner}/>
      </div>
      <div className='left'>
        <div className='mr'>
          <img src={rps} alt="rock-paper-scissors rule" />
        </div>
        <div>
          <h4 className='ruleshead'>HOW TO PLAY ROCK-PAPER-SCISSORS</h4>
          <p>Rock-Paper-Scissors is a game played to settle disputes between two people. Thought to be a game of chance that depends on random luck similar to flipping coins or drawing straws, the game is often taught to children to help them settle arguments between themselves on their own without adult intervention. However, the game actually can be a game that has an element of skill that requires quick thinking and perceptive reasoning</p>
          <p>The game is played with three possible hand signals that represent a rock, paper, and scissors. The rock is a closed fist; paper is a flat hand with fingers and thumb extended and the palm facing downward; and scissors is a fist with the index and middle fingers fully extended toward the opposing player. Rock wins against scissors; paper wins against rock; and scissors wins against paper. If both players throw the same hand signal, it is considered a tie, and play resumes until there is a clear winner.</p>
          <p>The hand signals are given simultaneously by both players. The ritual used to get players in sync with each other so they can deliver their throws simultaneously is called the prime. This action requires retracting the player’s fist from full-arm extension towards the shoulder and then back to full extension. To ensure a fair match the players must be in sync with their primes. Players must determine before play how many times they pump their arms during the prime phase, usually two or three times before the final delivery of their throw.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
