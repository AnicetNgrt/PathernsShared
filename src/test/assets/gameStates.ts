import GameState from "../../core/GameState"

export function blankGs():GameState {
    return new GameState([], 0, new Map(), new Map(), new Map(), new Map());
}