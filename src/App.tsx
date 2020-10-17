import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import {
  SwipeableDrawer,
  Button,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
} from "@material-ui/core";

import { MoveToInbox, Mail } from "@material-ui/icons";

import SwipeableView from "react-swipeable-views";

// import Login from "./Login";
import Map from "./Map";

const useStyles = makeStyles({
  container: {
    minWidth: 300,
  },
  mapContainer: {
    height: "100%",
    maxHeight: "100%",
  },
});

export default function App() {
  const classes = useStyles();
  const [anchor, setAnchor] = useState(false);

  const setDrawer = (to: boolean) => () => setAnchor(to);

  const [screen, setScreen] = useState(0);

  return (
    <div className={classes.mapContainer}>
      <Map />
    </div>
  );

  // return (
  // <SwipeableView disabled index={screen}>
  // <Login onLogIn={() => setScreen(1)} />

  // <div className={classes.mapContainer}>
  // <Map />
  // </div>

  // <div>
  // <Button onClick={setDrawer(true)}>Left</Button>
  // <SwipeableDrawer
  // anchor={"left"}
  // open={anchor}
  // onClose={setDrawer(false)}
  // onOpen={setDrawer(true)}
  // >
  // <Container
  // className={classes.container}
  // role="presentation"
  // onClick={setDrawer(false)}
  // onKeyDown={setDrawer(false)}
  // >
  // <List>
  // {[<MoveToInbox />, <Mail />].map((icon, index) => (
  // <ListItem button key={index}>
  // <ListItemIcon>{icon}</ListItemIcon>
  // <ListItemText primary={`Экран ${index}`} />
  // </ListItem>
  // ))}
  // </List>
  // </Container>
  // </SwipeableDrawer>
  // </div>
  // </SwipeableView>
  // );
}
