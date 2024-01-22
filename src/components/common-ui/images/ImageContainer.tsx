import React from "react";
import styles from '@/components/common-ui/images/image-container.module.sass';
import classNames from "classnames";

type ImageProps = {
  src: string,
  alt: string,
  className?: string
};

const ImageContainer: React.FC<ImageProps> = ({src, alt, className}) => {
  const classes = classNames(
    className && className,
    styles['anchored-image']
  );
  return <img className={classes} src={src} alt={alt}/>
};

export default ImageContainer;
