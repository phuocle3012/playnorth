import React from 'react';
import * as mdi from '@mdi/js';
import Icon from "@mdi/react";
import '@/app/common-ui/icons/mdi-icon.sass';

const SvgIcon = ({ icon, size = 'normal', color = 'grey', className, onClick }) => {
  const classes = `icon-container size-${size} color-${color} ${className ? className : ''}`;

  return (
    <div className={classes} onClick={onClick}>
      <Icon path={icon} color={color}/>
    </div>
  );
};

export default SvgIcon;
