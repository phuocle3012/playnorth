import React from 'react';
import Icon from "@mdi/react";
import styles from '@/components/common-ui/icons/mdi-icon.module.sass';

const SvgIcon = ({ icon, size = 'normal', color = 'grey', className, onClick }) => {
  const classes = classNames(
    styles['icon-container'],
    styles[`size-${size}`],
    styles[`color-${color}`],
    className && className
  );

  return (
    <div className={classes} onClick={onClick}>
      <Icon path={icon} color={color}/>
    </div>
  );
};

export default SvgIcon;
