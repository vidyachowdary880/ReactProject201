import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import FlightIcon from "@material-ui/icons/Flight";
import FlightPage from "./FlightPage";
import InFlightPage from "./InFlight/InFlightPage";
import PageNotFound from "./PageNotFound";
import ManagePassangers from "./ManagePassangers";
import InFlightService from "./InFlight/InFlightService";
import { Link, Route, Switch } from "react-router-dom";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link to="/">Airlines</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  username: {
    marginLeft: 0,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    overflow: "auto",
  },
}));

export default function StaffPage() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [checkIn, setCheckIn] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [cookies, removeCookie] = useCookies();
  let history = useHistory();

  if (cookies.role !== "basic") {
    history.push("/");
  }
  const inflightClick = () => {
    setCheckIn(false);
  };
  const handleLogout = () => {
    removeCookie("role");
    removeCookie("email");
    history.push("/");
  };

  const checkInClick = () => {
    setCheckIn(true);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            <Link to="/">Airlines Staff Portal</Link>
          </Typography>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.username}
          >
            {cookies.email}
          </Typography>
          <IconButton variant="contained" onClick={handleLogout}>
            logOut
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <div>
            <ListSubheader inset>ChekIn</ListSubheader>
            <ListItem
              button
              onClick={checkInClick}
              selected={checkIn}
              component={Link}
              to="/staff"
            >
              <ListItemIcon>
                <FlightIcon />
              </ListItemIcon>
              <ListItemText primary="Flights" />
            </ListItem>
          </div>
        </List>
        <Divider />
        <List>
          <div>
            <ListSubheader inset>In flight</ListSubheader>
            <ListItem
              button
              onClick={inflightClick}
              selected={!checkIn}
              component={Link}
              to="/staff/inFlight"
            >
              <ListItemIcon>
                <FlightTakeoffIcon />
              </ListItemIcon>
              <ListItemText primary="Select Flight" />
            </ListItem>
          </div>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={fixedHeightPaper}>
                <Switch>
                  <Route exact path="/staff" component={FlightPage} />
                  <Route
                    path="/staff/checkIn/managePassengers/:id"
                    component={ManagePassangers}
                  />
                  <Route
                    exact
                    path="/staff/inFlight"
                    component={InFlightPage}
                  />
                  <Route
                    path="/staff/inFlight/managePassengers/:id/:services"
                    component={ManagePassangers}
                  />
                  <Route
                    path="/staff/inFlight/flightServices/:id/:flightId"
                    component={InFlightService}
                  />
                  <Route component={PageNotFound} />
                </Switch>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
