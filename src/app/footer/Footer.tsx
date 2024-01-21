import React from "react";
import {ConfigResponse, FooterLink} from "@/app/header/types/ConfigResponse";
import Link from "next/link";
import '@/app/footer/footer.sass';

type FooterProps = {
  config: ConfigResponse
};
const Footer: React.FC<FooterProps> = ({config}) => {

  const footerItem = (link: FooterLink) => {
    return <Link key={link.text} className="footer-link" href={`${link.pagePath}`}>{link.text}</Link>
  }

  const footerLinks = config.footerContent.links.map(link => footerItem(link));

  return <div id="footer-container">
    {footerLinks}
  </div>
};

export default Footer;
