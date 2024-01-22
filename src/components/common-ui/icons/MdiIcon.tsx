import React from 'react';
import * as mdi from '@mdi/js';
import Icon from "@mdi/react";
import styles from '@/components/common-ui/icons/mdi-icon.module.sass';
import classNames from "classnames";

const MdiIcon = ({ icon, size = 'normal', color = 'grey', className, onClick }) => {
  const dashToCamel = (str) => {
    return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
  };

  const path = mdi[dashToCamel(icon)];

  const classes = classNames(
    styles['icon-container'],
    styles[`size-${size}`],
    styles[`color-${color}`],
    className && className
  );

  return (
    <div className={classes} onClick={onClick}>
      <Icon path={path} />
    </div>
  );
};

export default MdiIcon;
