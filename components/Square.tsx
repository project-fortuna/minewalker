import React from 'react';

type Location = {
  r: number;
  c: number;
};

const Square = (props: {
  location: Location;
  nearbyMineCount: number;
  isMine: boolean;
  playerIsHere: boolean;
  isRevealed: boolean;
  onClick: Function;
  isGoal: boolean;
  gameOver: boolean;
}) => {
  const handleClick = () => {
    if (props.gameOver) {
      return;
    }
    props.onClick(props.location, props.isMine, props.isGoal);
  };
  return (
    <li
      className="flex justify-center items-center w-20 h-20 bg-gray-500 border-2 border-gray-700"
      onClick={handleClick}
    >
      {props.gameOver && props.isMine && <p className="text-red-500">MINE</p>}
      {props.isRevealed && (
        <p className="text-white">{props.nearbyMineCount}</p>
      )}
      {props.playerIsHere && <p className="absolute text-red-500">Player</p>}
      {props.isGoal && <p className="text-green-500">GOAL</p>}
    </li>
  );
};

export default Square;