
import { createMuiTheme } from "@material-ui/core";
const theme = createMuiTheme({
    overrides: {
        MuiAppBar: {
            positionFixed: {
                borderBottom: "2px solid transparent",
                borderImage: "linear-gradient(to right,  #ffd66b, #ff8b84) 3",
                boxShadow: "none",
                left: "0",
                right: "auto",
            },
            positionRelative: {
                borderBottom: "2px solid transparent",
                borderImage: "linear-gradient(to right,  #ffd66b, #ff8b84) 3",
                boxShadow: "none",
                left: "0",
                right: "auto",
                width: "100%",
            },
            root: {
                width: "34%",
            },
        },
        MuiDivider: {
            inset: {
                marginRight: "72px",
            },
        },
        MuiDrawer: {
            paper: {
                backgroundColor: "#2e2a27 !important",
            },
        },
        MuiListItem: {
            button: {
                transition: "none !important",
            },
        },
        MuiListItemIcon: {
            root: {
                marginLeft: "8px",
                marginRight: "4px",
                transform: "scale(1.2)",
            },
        },
        MuiTypography: {
            /*subheading: {
                fontWeight: 500,
            },*/
        },
    },
});

export default theme;