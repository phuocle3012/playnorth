import Link from "next/link";
import '@/app/header/menu.sass';
import ImageContainer from "@/app/common-ui/images/ImageContainer";
import AnchoredText from "@/app/common-ui/anchored-text/AnchoredText";

const Menu = ({menu}) => {
  const src = menu.image && menu.image.original && menu.image.original.src;

  return <Link className="menu-link" href={`/casino/${menu.name}`}>
    <div className="menu-item--container">
      {src &&
        (<ImageContainer className="menu-img" src={src} alt={menu.image.alt}/>)
      }
      <AnchoredText label={menu.name} className="menu-text"/>
    </div>
  </Link>;
};

export default Menu;
