'use client';
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/lib/hook";
import {getSearchStore} from "@/lib/search-store";
import {GameType} from "@/app/games/game-card/models/GameType";
import PagingRequest from "@/app/common-ui/pagination/types/PagingRequest";
import {useDebouncedCallback} from "use-debounce";
import {updateLoadingAction} from "@/lib/loading-store";
import fetchData from "@/app/configs/fetch-data";
import GameSearchResults from "@/app/games/list/GameSearchResults";
import Pagination from "@/app/common-ui/pagination/Pagination";
import '@/app/casino/[category]/category.sass';

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
    setGames(resp.items || []);
    setTotalGames(resp.count || 0);
    dispatch(updateLoadingAction(false));
  }, 300);

  const {searchText} = useAppSelector(getSearchStore);
  useEffect(() => {
    if (searchText || totalDefaultGames !== totalGames) {
      handleSearch(pagingRequest, categoryName, searchText);
    }
  }, [searchText]);

  const updatePagingRequest = (newPagingRequests) => {
    setPagingRequest((prevPagingRequest) => ({ ...prevPagingRequest, ...newPagingRequests }));
    handleSearch({ ...pagingRequest, ...newPagingRequests }, categoryName, searchText);
  };

  return <div>
    <GameSearchResults games={games}/>

    <Pagination
      className="search-pagination"
      pagingRequest={pagingRequest}
      totalItems={totalGames}
      updateItemsPerPage={updatePagingRequest}
    />
  </div>
};

export default CasinoClientComponent;
