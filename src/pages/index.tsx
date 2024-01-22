import type { NextPage } from "next";
import fetchData from "@/components/configs/fetch-data";
import {GameResponse, GameType} from "@/components/games/game-card/models/GameType";
import HomePageClientComponent from "@/components/home-page/HomePageClientComponent";

export async function getServerSideProps() {
  const [resp] = await fetchData('/en/games/tiles', {pageSize: 20});
  const games: GameType[] = (resp as GameResponse).items || [];
  const totalGames: number = (resp as GameResponse).count;

  return {
    props: {
      games,
      totalGames
    },
  };
}

const HomePage: NextPage = ({games, totalGames}) => {
  return (
    <>
      <HomePageClientComponent defaultGames={games} totalDefaultGames={totalGames}/>
    </>
  );
};

export default HomePage;
