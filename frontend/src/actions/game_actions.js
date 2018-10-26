import * as GameUtil from '../util/game_util';

export const START_GAME = "START_GAME";
export const GAME_OVER = "GAME_OVER";

const startGame = (name) => ({
  type: START_GAME,
  name
});

export const gameOver = () => ({
  type: GAME_OVER
});

export const initializeGame = (name) => dispatch => {
  GameUtil.initializeGame(name, dispatch);
  dispatch(startGame(name));
}