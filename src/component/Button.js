import React from 'react';
import ButtonUi from '@material-ui/core/Button';

export default function Button({color, href, fullWidth, onClick, children}){

    return(
        <ButtonUi variant="contained" color={color} href={href} fullWidth={fullWidth} onClick={onClick}>
            {children}
        </ButtonUi>
    );
}