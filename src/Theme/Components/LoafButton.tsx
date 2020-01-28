import { Button } from "@material-ui/core";
import React, { Component } from "react";

interface IProps {
    secondary?: boolean;
    main?: boolean;
    big?: boolean;
    onClick?: () => void;
}

export default class LoafButton extends Component<IProps> {
    public render() {
        const { main, big, onClick, secondary } = this.props;
        return (
            <Button variant={main ? "contained" : "text"}
                onClick={onClick}
                disableElevation
                className={big ? "big-button" : ""}
                color={secondary ? "secondary" : "primary"}>
                {this.props.children}
            </Button>
        );
    }
}
