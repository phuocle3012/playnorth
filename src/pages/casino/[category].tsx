import fetchData from "@/components/configs/fetch-data";
import {GameResponse} from "@/components/games/game-card/models/GameType";
import React from "react";
import CasinoClientComponent from "@/pages/casino/CasinoClientComponent.tsx";

const CasinoServerPage = ({ games, totalGames, categoryName }) => {
  return <CasinoClientComponent defaultGames={games} totalDefaultGames={totalGames} categoryName={categoryName}/>;
};

export async function getServerSideProps({ params }) {
  const categoryName = toCamelCase(params.category);
  const [resp] = await fetchData('/en/games/tiles', { gameCategories: categoryName, search: '' });
  const games = (resp && (resp as GameResponse).items) || [];
  const totalGames: number = resp && (resp as GameResponse).count;
  return {
    props: {
      games,
      totalGames,
      categoryName,
    },
  };
}

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
