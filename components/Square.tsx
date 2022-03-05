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
  playerLocation: Location;
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

  const isHoverable = () => {
    return (
      Math.abs(props.location.r - props.playerLocation.r) <= 1 &&
      Math.abs(props.location.c - props.playerLocation.c) <= 1
    );
  };
  return (
    <li
      className={`flex justify-center items-center w-[80px] h-[80px]  border-2 border-gray-700 ${
        isHoverable()
          ? 'cursor-pointer bg-gray-500 hover:bg-gray-400'
          : 'cursor-default bg-gray-600'
      } transition-all`}
      onClick={handleClick}
    >
      {props.gameOver && props.isMine && <p className="text-red-500">MINE</p>}
      {props.playerIsHere && <Player></Player>}
      {props.isRevealed && (
        <p className="absolute text-gray-50 text-lg font-bold">
          {props.nearbyMineCount}
        </p>
      )}
      {props.isGoal && <p className="font-bold text-green-500">GOAL</p>}
    </li>
  );
};

export default Square;
