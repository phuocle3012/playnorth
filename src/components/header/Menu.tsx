import Link from "next/link";
import styles from '@/components/header/menu.module.sass';
import ImageContainer from "@/components/common-ui/images/ImageContainer";
import AnchoredText from "@/components/common-ui/anchored-text/AnchoredText";

const Menu = ({menu}) => {
  const src = menu.image && menu.image.original && menu.image.original.src;

  return <Link className={styles['menu-link']} href={`/casino/${menu.name}`}>
    <div className={styles['menu-item--container']}>
      {src &&
        (<ImageContainer className={styles['menu-img']} src={src} alt={menu.image.alt}/>)
      }
      <AnchoredText label={menu.name} className={styles['menu-text']}/>
    </div>
  </Link>;
};

export default Menu;
