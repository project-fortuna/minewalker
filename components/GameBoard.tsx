import React, { ReactElement, useState, useEffect } from 'react';
import Modal from './Modal';
import Square from './Square';

/**
 * TODO: Check for impossible scenarios
 */

type Location = {
  r: number;
  c: number;
};

type GridData = {
  location: Location;
  nearbyMineCount: number;
  isMine: boolean;
  isRevealed: boolean;
};

type Player = {
  location: Location;
};

const GameState = {
  IN_GAME: 'IN_GAME',
  GAME_OVER: 'GAME_OVER',
};

const BOARD_WIDTH = 10,
  BOARD_HEIGHT = 10,
  NUM_MINES = 15;

const GOAL_LOCATION: Location = { r: BOARD_WIDTH - 1, c: BOARD_HEIGHT - 1 };

const GameBoard = () => {
  const [gameState, setGameState] = useState(GameState.IN_GAME);
  const [gridData, setGridData] = useState<GridData[]>([]);
  const [player, setPlayer] = useState<Player>({ location: { r: 0, c: 0 } });
  const [gameOverModalOpen, setGameOverModalOpen] = useState(false);
  const [winModalOpen, setWinModalOpen] = useState(false);

  useEffect(() => {
    setGridData(generateGridData());
    return () => {};
  }, []);

  const sameLocation = (locationA: Location, locationB: Location) => {
    return locationA.r === locationB.r && locationA.c === locationB.c;
  };

  const resetGame = () => {
    setGridData(generateGridData());
    setPlayer({ ...player, location: { r: 0, c: 0 } });
    setGameState(GameState.IN_GAME);
    setGameOverModalOpen(false);
    setWinModalOpen(false);
  };

  const generateGridData = () => {
    const mineLocations = generateMines();

    console.log(mineLocations);

    // Generate the initial grid data
    const squares: GridData[] = [];
    for (let i = 0; i < BOARD_WIDTH; i++) {
      for (let j = 0; j < BOARD_HEIGHT; j++) {
        const location: Location = { r: i, c: j };
        const isMine =
          mineLocations.filter(
            (mineLoc) => mineLoc.r === location.r && mineLoc.c == location.c,
          ).length >= 1;

        console.log(isMine);
        squares.push({
          location,
          isMine,
          nearbyMineCount: 0,
          isRevealed: false,
        });
      }
    }

    // Update the mine counts
    squares
      .filter((g) => g.isMine)
      .forEach((g) => {
        console.log('updating mine at', g.location);
        for (let x = g.location.r - 1; x < g.location.r + 2; x++) {
          for (let y = g.location.c - 1; y < g.location.c + 2; y++) {
            console.log('updating mine count at', x, y);
            if (x < 0 || x >= BOARD_WIDTH || y < 0 || y >= BOARD_HEIGHT) {
              continue;
            }
            squares[squareIdx(x, y)].nearbyMineCount += 1;
          }
        }
      });

    // Reveal the starting squares
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        squares[squareIdx(i, j)].isRevealed = true;
      }
    }

    return squares;
  };

  const squareIdx = (x: number, y: number) => {
    return x * BOARD_WIDTH + y;
  };

  const generateMines = () => {
    const mineLocations: Location[] = [];
    for (let i = 0; i < NUM_MINES; i++) {
      let randLocation: Location = {
        r: Math.floor(Math.random() * BOARD_WIDTH),
        c: Math.floor(Math.random() * BOARD_HEIGHT),
      };
      while (
        (randLocation.r === 0 && randLocation.c === 0) ||
        sameLocation(randLocation, GOAL_LOCATION)
      ) {
        randLocation = {
          r: Math.floor(Math.random() * BOARD_WIDTH),
          c: Math.floor(Math.random() * BOARD_HEIGHT),
        };
      }

      mineLocations.push(randLocation);
    }
    return mineLocations;
  };

  const handlePlayerMove = (
    squareLocation: Location,
    isMine: boolean,
    isGoal: boolean,
  ) => {
    // Only allow single step movements
    if (
      Math.abs(squareLocation.r - player.location.r) > 1 ||
      Math.abs(squareLocation.c - player.location.c) > 1
    ) {
      return;
    }

    // Move the player
    setPlayer({
      ...player,
      location: { r: squareLocation.r, c: squareLocation.c },
    });

    // Reveal the adjacent squares
    revealAdjacentSquares(squareLocation);

    // If the player hit a mine, set the state to game over
    if (isMine) {
      setGameState(GameState.GAME_OVER);
      setGameOverModalOpen(true);
    }

    // If the player wins, set the state to game over
    if (isGoal) {
      setGameState(GameState.GAME_OVER);
      setWinModalOpen(true);
    }
  };

  const revealAdjacentSquares = (squareLocation: Location) => {
    const newGridData = [...gridData];

    for (let x = squareLocation.r - 1; x < squareLocation.r + 2; x++) {
      for (let y = squareLocation.c - 1; y < squareLocation.c + 2; y++) {
        if (x < 0 || x >= BOARD_WIDTH || y < 0 || y >= BOARD_HEIGHT) {
          continue;
        }
        newGridData[squareIdx(x, y)].isRevealed = true;
      }
    }
    setGridData(newGridData);
  };

  return (
    <div>
      {/* Game over modal */}
      <Modal isOpen={gameOverModalOpen}>
        <div className=" border-white border-2 w-full max-w-sm p-6 my-8 overflow-hidden text-center align-middle backdrop-blur-md text-white">
          <div className="flex flex-col">
            <h2>Game over!</h2>
            <button onClick={resetGame}>Try again</button>
          </div>
        </div>
      </Modal>
      {/* Win modal */}
      <Modal isOpen={winModalOpen}>
        <div className=" border-white border-2 w-full max-w-sm p-6 my-8 overflow-hidden text-center align-middle backdrop-blur-md text-white">
          <div className="flex flex-col">
            <h2>You win!</h2>
            <button onClick={resetGame}>Play again</button>
          </div>
        </div>
      </Modal>
      <ul className={`grid grid-cols-10`}>
        {gridData.map((g) => (
          <Square
            key={g.location.r + '' + g.location.c}
            location={g.location}
            nearbyMineCount={g.nearbyMineCount}
            isMine={g.isMine}
            playerIsHere={sameLocation(player.location, g.location)}
            onClick={handlePlayerMove}
            isRevealed={g.isRevealed}
            gameOver={gameState === GameState.GAME_OVER}
            isGoal={sameLocation(GOAL_LOCATION, g.location)}
          ></Square>
        ))}
      </ul>
    </div>
  );
};

export default GameBoard;
