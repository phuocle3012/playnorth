export type GameType = {
  id: string,
  gameText: string;
  provider: string;
  image: {
    original: {
      src: string;
    };
    alt: string;
  };
};

export type GameResponse = {
  count: number,
  items: GameType[];
};

