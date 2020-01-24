
import { createMuiTheme } from "@material-ui/core";
const theme = createMuiTheme({
    overrides: {
        MuiListItem: {
            button: {
                transition: "none !important",
            },
        },
        MuiAppBar: {
            root: {
                width: '34%',
            },
            positionFixed: {
                left: "0",
                right: "auto",
                boxShadow: "none",
                borderBottom: "2px solid transparent",
                borderImage: "linear-gradient(to right,  #ffd66b, #ff8b84) 3"
            },
            positionRelative: {
                left: "0",
                width: "100%",
                right: 'auto',
                boxShadow: 'none',
                borderBottom:'2px solid transparent',
                borderImage: 'linear-gradient(to right,  #ffd66b, #ff8b84) 3'
            },
        },
        MuiDivider: {
            inset: {
                marginRight: "72px"
            },
        },
        MuiDrawer: {
            paper: {
                backgroundColor:"#2e2a27 !important"
            },
        },
        MuiTypography: {
            subheading: {
                fontWeight: 500,
            },
        },
        MuiListItemIcon: {
            root: {
                marginLeft: "8px",
                marginRight: "4px",
                transform: "scale(1.2)",
            },
        },
    },
});

export default theme;