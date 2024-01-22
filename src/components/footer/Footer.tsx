import React from "react";
import {ConfigResponse, FooterLink} from "@/components/header/types/ConfigResponse";
import Link from "next/link";
import styles from '@/components/footer/footer.module.sass';

type FooterProps = {
  config: ConfigResponse
};
const Footer: React.FC<FooterProps> = ({config}) => {

  const footerLinks = config.footerContent.links.map(link => buildFooterItem(link));

  return <div className={styles['footer-container']}>
    {footerLinks}
  </div>
};

const buildFooterItem = (link: FooterLink) => {
  return <Link key={link.text} href={`${link.pagePath}`}>{link.text}</Link>
}

export default Footer;
