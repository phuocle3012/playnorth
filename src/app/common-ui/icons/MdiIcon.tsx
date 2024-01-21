import React from 'react';
import * as mdi from '@mdi/js';
import Icon from "@mdi/react";
import '@/app/common-ui/icons/mdi-icon.sass';

const MdiIcon = ({ icon, size = 'normal', color = 'grey', className, onClick }) => {
  const dashToCamel = (str) => {
    return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
  };

  const path = mdi[dashToCamel(icon)];

  const classes = `icon-container size-${size} color-${color} ${className ? className : ''}`;

  return (
    <div className={classes} onClick={onClick}>
      <Icon path={path} />
    </div>
  );
};

export default MdiIcon;
