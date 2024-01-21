import '@/app/games/game-card/game-card.sass';
import {GameType} from "@/app/games/game-card/models/GameType";
import ImageContainer from "@/app/common-ui/images/ImageContainer";
import AnchoredText from "@/app/common-ui/anchored-text/AnchoredText";

type GameCardProps = {
  game: GameType;
};

const GameCard: React.FC<GameCardProps> = ({game}) => {
  return <div className="card-container">
    <div className="card-item">
      <ImageContainer className="card-img" src={game.image.original.src} alt={game.image.alt}/>
    </div>

    <div className="card-desc--container">
      <div className="card-item">
        <AnchoredText label={game.gameText} weight="bold"/>
      </div>

      <div className="card-item">
        <AnchoredText label={game.provider} weight="light"/>
      </div>
    </div>
  </div>
};

export default GameCard;
