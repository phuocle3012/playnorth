import fetchData from "@/app/configs/fetch-data";
import {GameResponse, GameType} from "@/app/games/game-card/models/GameType";
import HomePageClientComponent from "@/app/home-page/HomePageClientComponent";

const HomePageServerComponent = async () => {
  const [resp, err] = await fetchData('/en/games/tiles', {pageSize: 20});

  if (err) {
    return <div>
      There are some error happen. Sorry for any inconveniences. Please reload or come back later.
    </div>;
  }
  const games: GameType[] = (resp as GameResponse).items || [];
  const totalGames: number = (resp as GameResponse).count;

  return (
    <div>
      <HomePageClientComponent defaultGames={games} totalDefaultGames={totalGames}/>
    </div>
  );
};

export default HomePageServerComponent;
