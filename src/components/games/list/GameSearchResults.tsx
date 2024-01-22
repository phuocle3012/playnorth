'use client';
import React from "react";
import { GameType } from "@/components/games/game-card/models/GameType";
import GameCard from "@/components/games/game-card/GameCard";
import styles from '@/components/games/list/game-search-results.module.sass';

const GameSearchResults: React.FC<GameType[]> = ({games}: GameType[]) => {
  const noSearchResult = <div className={styles['no-game-found']}>No Game Found!</div>;

  return <div>
    <div className={styles['game-results-container']}>
      {games.map(game => (<GameCard key={game.id} game={game} />))}
    </div>

    {games.length == 0 && noSearchResult}
  </div>;
};

export default GameSearchResults;
