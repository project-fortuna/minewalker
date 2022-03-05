import React from 'react';
import Player from './Player';

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
      className="flex justify-center items-center w-[80px] h-[80px] bg-gray-500 border-2 border-gray-700"
      onClick={handleClick}
    >
      {props.gameOver && props.isMine && <p className="text-red-500">MINE</p>}
      {props.playerIsHere && <Player></Player>}
      {props.isRevealed && (
        <p className="absolute text-white">{props.nearbyMineCount}</p>
      )}
      {props.isGoal && <p className="text-green-500">GOAL</p>}
    </li>
  );
};

export default Square;
