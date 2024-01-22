
export type MenuItem = {
  id: string,
  name: string,
};

export type FooterLink = {
  text: string,
  pagePath: string,
};

export type ConfigResponse = {
  menu: {
    lobby: {
      items: MenuItem[];
    };

    liveLobby: {
      items: MenuItem[];
    },
  };

  sidebarLinks: [];
  footerContent: {
    logoUrl: string,
    links: FooterLink[],
  };
}
