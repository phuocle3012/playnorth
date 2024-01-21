'use client';
import React, {JSX, useState} from 'react';
import Menu from "@/app/header/Menu";
import "@/app/header/header.sass";
import AnchoredText from "@/app/common-ui/anchored-text/AnchoredText";
import {ConfigResponse, MenuItem} from "@/app/header/types/ConfigResponse";
import Image from "next/image";
import {useAppDispatch, useAppSelector} from "@/lib/hook";
import {getSearchStore, updateSearchAction} from "@/lib/search-store";
import TextInput from "@/app/common-ui/text-input/TextInput";
import {useRouter} from "next/navigation";

type HeaderProps = {
  configResponse: ConfigResponse,
  searchInput: JSX.Element,
};

const Header: React.FC<HeaderProps> = ({configResponse}) => {
  let {searchText} = useAppSelector(getSearchStore);
  const dispatch = useAppDispatch();

  const handleChange = (searchText) => {
    dispatch(updateSearchAction(searchText));
  };

  const lobbyMenus: MenuItem[] = configResponse.menu.lobby.items || [];
  const liveLobbyMenus: MenuItem[] = configResponse.menu.liveLobby.items || [];
  const [lobbyMenuVisible, setLobbyMenuVisible] = useState(false);
  const [liveLobbyMenuVisible, setLiveLobbyMenuVisible] = useState(false);

  function toggleLobbyMenuVisible() {
    setLobbyMenuVisible(!lobbyMenuVisible);
    setLiveLobbyMenuVisible(false);
  }

  function toggleLiveLobbyMenuVisible() {
    setLiveLobbyMenuVisible(!liveLobbyMenuVisible);
    setLobbyMenuVisible(false);
  }

  const router = useRouter();

  const liveLobbyMenuItems = <div className="menu-list">
    {liveLobbyMenus.map(menu => (<Menu key={menu.id} menu={menu}/>))}
  </div>;

  const lobbyMenuItems = <div className="menu-list">
    {lobbyMenus.map(menu => (<Menu key={menu.id} menu={menu}/>))}
  </div>;

  return <div id="header">
    <div id="logo-container" onClick={() => router.push('/')}>
      <Image src={configResponse.footerContent.logoUrl} alt="logo" width={125} height={22}/>
    </div>

    <div className={`menu-group ${lobbyMenuVisible ? 'active' : ''}`} onClick={toggleLobbyMenuVisible}>
      <AnchoredText label="Lobby" underline={lobbyMenuVisible} color="white"/>
      {lobbyMenuVisible && lobbyMenuItems}
    </div>

    <div className={`menu-group ${liveLobbyMenuVisible ? 'active' : ''}`} onClick={toggleLiveLobbyMenuVisible}>
      <AnchoredText label="Live lobby" color="white"/>
      {liveLobbyMenuVisible && liveLobbyMenuItems}
    </div>

    <div id="search-input">
      {searchInput(searchText, handleChange)}
    </div>
  </div>
};

const searchInput = (searchText, handleChange) => {
 return  <TextInput
   label="Search"
   value={searchText}
   id="search-input"
   onChange={handleChange}
   appendIcon="mdi-magnify"
 />
};

export default Header;
