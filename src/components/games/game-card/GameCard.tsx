import styles from '@/components/games/game-card/game-card.module.sass';
import {GameType} from "@/components/games/game-card/models/GameType";
import ImageContainer from "@/components/common-ui/images/ImageContainer";
import AnchoredText from "@/components/common-ui/anchored-text/AnchoredText";

type GameCardProps = {
  game: GameType;
};

const GameCard: React.FC<GameCardProps> = ({game}) => {
  return <div className={styles['card-container']}>
    <div className={styles['card-item']}>
      <ImageContainer className={styles['card-img']} src={game.image.original.src} alt={game.image.alt}/>
    </div>

    <div className={styles['card-desc--container']}>
      <div className={styles['card-item']}>
        <AnchoredText label={game.gameText} weight="bold"/>
      </div>

      <div className={styles['card-item']}>
        <AnchoredText label={game.provider} weight="light"/>
      </div>
    </div>
  </div>
};

export default GameCard;
