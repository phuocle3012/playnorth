'use client';
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/lib/hook";
import {getSearchStore} from "@/lib/search-store";
import {GameType} from "@/components/games/game-card/models/GameType";
import PagingRequest from "@/components/common-ui/pagination/types/PagingRequest";
import {useDebouncedCallback} from "use-debounce";
import {updateLoadingAction} from "@/lib/loading-store";
import fetchData from "@/components/configs/fetch-data";
import GameSearchResults from "@/components/games/list/GameSearchResults";
import Pagination from "@/components/common-ui/pagination/Pagination";
import styles from "@/pages/casino/category.module.sass";

const defaultPaging: PagingRequest = {
  pageNumber: 1,
  pageSize: 20
}

interface CasinoClientProps {
  defaultGames: GameType[],
  totalDefaultGames: number,
  categoryName: string,
}

const CasinoClientComponent: React.FC<CasinoClientProps> = ({defaultGames, totalDefaultGames, categoryName}) => {
  const [games, setGames] = useState<GameType[]>(defaultGames || []);
  const [totalGames, setTotalGames] = useState<number>(totalDefaultGames);
  const [pagingRequest, setPagingRequest] = useState<PagingRequest>(defaultPaging);

  const dispatch = useAppDispatch();
  const handleSearch = useDebouncedCallback(async (currentPagingRequest: PagingRequest, currentCategoryName: string, currentSearchText: string) => {
    dispatch(updateLoadingAction(true));
    const [resp] = await fetchData('/en/games/tiles', {
      ...currentPagingRequest,
      gameCategories: currentCategoryName,
      search: currentSearchText || '',
    });

    if (resp) {
      setGames(resp.items || []);
      setTotalGames(resp.count || 0);
    }

    dispatch(updateLoadingAction(false));
  }, 300);

  const {searchText} = useAppSelector(getSearchStore);
  useEffect(() => {
    if (searchText || totalDefaultGames !== totalGames) {
      handleSearch(pagingRequest, categoryName, searchText);
    }
  }, [searchText]);

  useEffect(() => {
    setGames(defaultGames);
  }, [defaultGames]);

  const updatePagingRequest = (newPagingRequests) => {
    setPagingRequest((prevPagingRequest) => ({ ...prevPagingRequest, ...newPagingRequests }));
    handleSearch({ ...pagingRequest, ...newPagingRequests }, categoryName, searchText);
  };

  return <div>
    <GameSearchResults games={games}/>

    <Pagination
      className={styles['search-pagination']}
      pagingRequest={pagingRequest}
      totalItems={totalGames}
      updatePagingRequest={updatePagingRequest}
    />
  </div>
};

export default CasinoClientComponent;
