import Button from "@material-ui/core/Button";
import React, { Component } from "react";

interface IProps  {
    secondary?: boolean;
    main?: boolean;
    big?: boolean;
    onClick?: () => void;
    style?: any;
    children?: any
}

const LoafButton = ({ main, big, onClick, secondary, children, ...rest }: IProps) => {

    return (
        <Button variant={main ? "contained" : "text"}
            onClick={onClick}
            disableElevation
            className={big ? "big-button" : ""}
            color={secondary ? "secondary" : "primary"}
            {...rest}
            >
            {children}
        </Button>
    );
}
export default LoafButton;