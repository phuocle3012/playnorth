'use client';
import React from "react";
import { GameType } from "@/app/games/game-card/models/GameType";
import GameCard from "@/app/games/game-card/GameCard";
import '@/app/games/list/game-search-results.sass';

const GameSearchResults: React.FC<GameType[]> = ({games}: GameType[]) => {
  const noSearchResult = <div id="no-game-found">No Game Found!</div>;

  return <div>
    <div id="game-results-container">
      {games.map(game => (<GameCard key={game.id} game={game} />))}
    </div>

    {games.length == 0 && noSearchResult}
  </div>;
};

export default GameSearchResults;
