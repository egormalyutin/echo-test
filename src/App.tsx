import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  SwipeableDrawer,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
} from "@material-ui/core";

import { MoveToInbox, Mail } from "@material-ui/icons";

import SwipeableView from "react-swipeable-views";

import Login from "./Login";
import Map from "./Map";
import CreateAvatar from "./CreateAvatar";

const useStyles = makeStyles({
  container: {
    minWidth: 300,
  },
  mapContainer: {
    height: "100%",
    maxHeight: "100%",
  },
});

type UserData = {
  image: string;
};

function MeetScreen({ finish }: { finish: (data: UserData) => void }) {
  const classes = useStyles();
  const [screen, setScreen] = useState(0);

  const push = () => {
    window.history.pushState({}, document.title);
    setScreen((s) => s + 1);
  };

  const pop = useCallback(() => {
    setScreen((s) => (s > 0 ? s - 1 : s));
  }, []);

  useEffect(() => {
    window.addEventListener("popstate", pop);
    return () => {
      window.removeEventListener("popstate", pop);
    };
  }, [pop]);

  const end = (image: string) => {
    finish({ image });
  };

  return (
    <SwipeableView
      disabled
      index={screen}
      containerStyle={{ height: "100%" }}
      style={{ height: "100%" }}
    >
      <Login onLogIn={push} />

      <div className={classes.mapContainer}>
        <Map next={push} />
      </div>

      <div>{screen == 2 ? <CreateAvatar onCreated={end} /> : null}</div>
    </SwipeableView>
  );
}

export default function App() {
  const classes = useStyles();
  const [anchor, setAnchor] = useState(false);

  const setDrawer = (to: boolean) => () => setAnchor(to);

  return (
    <MeetScreen finish={() => console.log(123)} />
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
  );
}
