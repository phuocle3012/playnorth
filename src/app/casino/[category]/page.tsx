import fetchData from "@/app/configs/fetch-data";
import {GameResponse} from "@/app/games/game-card/models/GameType";
import React from "react";
import CasinoClientComponent from "@/app/casino/[category]/CasinoClientComponent.tsx";

const CasinoServerPage = async ({ params }: { params: { category: string } }) => {
  const categoryName = toCamelCase(params.category);
  const [resp] = await fetchData('/en/games/tiles', { gameCategories: categoryName, search: '' });
  const games = (resp as GameResponse).items || [];
  const totalGames: number = (resp as GameResponse).count;

  return <CasinoClientComponent defaultGames={games} totalDefaultGames={totalGames} categoryName={categoryName}/>;
};

function toCamelCase(str) {
  return decodeURIComponent(str)
    .split(' ')
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');
}

export default CasinoServerPage;
