'use client';
import React, {JSX, useState} from 'react';
import Menu from "@/components/header/Menu";
import styles from "@/components/header/header.module.sass";
import AnchoredText from "@/components/common-ui/anchored-text/AnchoredText";
import {ConfigResponse, MenuItem} from "@/components/header/types/ConfigResponse";
import Image from "next/image";
import {useAppDispatch, useAppSelector} from "@/lib/hook";
import {getSearchStore, updateSearchAction} from "@/lib/search-store";
import TextInput from "@/components/common-ui/text-input/TextInput";
import {useRouter} from "next/router";
import classNames from "classnames";

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

  const logo = buildLogo(router, configResponse);
  const lobbyMenu = buildLobbyMenu(lobbyMenuVisible, toggleLobbyMenuVisible, lobbyMenus);
  const liveLobbyMenu = buildLiveLobbyMenu(liveLobbyMenuVisible, toggleLiveLobbyMenuVisible, liveLobbyMenus);

  return <div className={styles['header']}>
    {logo}

    {lobbyMenu}

    {liveLobbyMenu}

    <div className={styles['search-input']}>
      {searchInput(searchText, handleChange)}
    </div>
  </div>
};

const searchInput = (searchText, handleChange) => {
 return  <TextInput
   label="Search"
   value={searchText}
   className={styles['search-input']}
   onChange={handleChange}
   appendIcon="mdi-magnify"
 />
};

const buildLogo = (router, configResponse) => {
  return <div className={styles['logo-container']} onClick={() => router.push('/')}>
    <Image src={configResponse.footerContent.logoUrl} alt="logo" width={125} height={22}/>
  </div>
}

const buildLobbyMenu = (lobbyMenuVisible, toggleLobbyMenuVisible, lobbyMenus) => {
  const lobbyMenuItems = <div className={styles['menu-list']}>
    {lobbyMenus.map(menu => (<Menu key={menu.id} menu={menu}/>))}
  </div>;

  const menuGroupClasses = classNames(
    styles['menu-group'],
    lobbyMenuVisible && styles['active']
  );

  return <div className={menuGroupClasses} onClick={toggleLobbyMenuVisible}>
    <AnchoredText label="Lobby" underline={lobbyMenuVisible} color="white"/>
    {lobbyMenuVisible && lobbyMenuItems}
  </div>
}

const buildLiveLobbyMenu = (liveLobbyMenuVisible, toggleLiveLobbyMenuVisible, liveLobbyMenus) => {
  const liveLobbyMenuItems = <div className={styles['menu-list']}>
    {liveLobbyMenus.map(menu => (<Menu key={menu.id} menu={menu}/>))}
  </div>;

  const menuGroupClasses = classNames(
    styles['menu-group'],
    liveLobbyMenuVisible && styles['active']
  );

  return <div className={menuGroupClasses} onClick={toggleLiveLobbyMenuVisible}>
    <AnchoredText label="Live lobby" color="white"/>
    {liveLobbyMenuVisible && liveLobbyMenuItems}
  </div>
}


export default Header;
