'use client';
import styles from '@/components/home-page/home-page.module.sass';
import fetchData from '@/components/configs/fetch-data';
import GameSearchResults from "@/components/games/list/GameSearchResults";
import React, {useEffect, useState} from "react";
import ImageContainer from "@/components/common-ui/images/ImageContainer";
import {GameResponse, GameType} from "@/components/games/game-card/models/GameType";
import {useDebouncedCallback} from "use-debounce";
import PagingRequest from "@/components/common-ui/pagination/types/PagingRequest";
import Pagination from "@/components/common-ui/pagination/Pagination";
import {useAppDispatch, useAppSelector} from "@/lib/hook";
import {updateLoadingAction} from "@/lib/loading-store";
import {getSearchStore} from "@/lib/search-store";

const defaultPaging: PagingRequest = {
  pageNumber: 1,
  pageSize: 20
}

interface HomePageClientProps {
  defaultGames: GameType[],
  totalDefaultGames: number
}

const HomePageClientComponent: React.FC<HomePageClientProps> = ({defaultGames, totalDefaultGames}) => {
  const [games, setGames] = useState<GameType[]>(defaultGames || []);
  const [totalGames, setTotalGames] = useState<number>(totalDefaultGames);
  const [pagingRequest, setPagingRequest] = useState<PagingRequest>(defaultPaging);

  const dispatch = useAppDispatch();
  const handleSearch = useDebouncedCallback(async (currentPagingRequest: PagingRequest, currentSearchText) => {
    dispatch(updateLoadingAction(true));

    const [resp] = await fetchData('/en/games/tiles', {...currentPagingRequest, search: currentSearchText || ''});
    if (resp) {
      setGames((resp as GameResponse).items || []);
      setTotalGames((resp as GameResponse).count);
    }

    dispatch(updateLoadingAction(false));
  }, 300);

  const {searchText} = useAppSelector(getSearchStore);
  useEffect(() => {
    if (searchText || totalDefaultGames !== totalGames) {
      handleSearch(pagingRequest, searchText);
    }
  }, [searchText]);

  const updatePagingRequest = (newPagingRequests) => {
    setPagingRequest((prevPagingRequest) => ({ ...prevPagingRequest, ...newPagingRequests }));
    handleSearch({ ...pagingRequest, ...newPagingRequests }, searchText);
  };

  return <div className={styles['home-page']}>
    <ImageContainer src="banner.jpg" alt="banner" className={styles['banner']}/>

    <GameSearchResults games={games}/>

    <Pagination
      className={styles['search-pagination']}
      pagingRequest={pagingRequest}
      totalItems={totalGames}
      updatePagingRequest={updatePagingRequest}
    />
  </div>;
};

export default HomePageClientComponent;
