import React from "react";
import '@/app/common-ui/images/image-container.sass';

type ImageProps = {
  src: string,
  alt: string,
  className?: string
};

const ImageContainer: React.FC<ImageProps> = ({src, alt, className}) => {
  return <img className={`${className ? className : ''} anchored-image`} src={src} alt={alt}/>
};

export default ImageContainer;
