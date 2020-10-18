import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  SwipeableDrawer,
  Drawer,
  Hidden,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
} from "@material-ui/core";

import { MoveToInbox, Mail, Usb } from "@material-ui/icons";

import SwipeableView from "react-swipeable-views";

// Components
import Login from "./Login";
import Map from "./Map";
import CreateAvatar, { Avatar } from "./CreateAvatar";

const xsDrawerWidth = 200;

const useStyles = makeStyles({
  container: {
    minWidth: 300,
  },
  mapContainer: {
    height: "100%",
    maxHeight: "100%",
  },

  main: {
    display: "flex",
  },

  xsDrawer: {
    flexShrink: 0,
    width: xsDrawerWidth,
  },

  xsDrawerPaper: {
    width: xsDrawerWidth,
  },

  content: {
    flexGrow: 1,
    padding: 30,
  },
});

// Context keeping info about user
type UserData = {
  image: string;
};

// Meet screens, including login screen, map screen, and avatar screen.
function MeetScreens({ finish }: { finish: (data: UserData) => void }) {
  const classes = useStyles();
  const [screen, setScreen] = useState(0);

  const push = () => {
    window.history.pushState({}, document.title);
    setScreen((s) => s + 1);
  };

  const pop = useCallback(() => {
    setScreen((s) => (s > 0 ? s - 1 : s));
  }, []);

  // Make back button work
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
      <div>{screen == 0 ? <Login onLogIn={push} /> : null}</div>

      <div className={classes.mapContainer}>
        <Map next={push} />
      </div>

      <div>{screen == 2 ? <CreateAvatar onCreated={end} /> : null}</div>
    </SwipeableView>
  );
}

// Menu screen icons
const menuScreens = [<MoveToInbox />, <Mail />, <Usb />];

function Menu({
  data: { image },
  onSelected,
}: {
  data: UserData;
  onSelected: (item: number) => void;
}) {
  return (
    <List>
      <Avatar size="150px">
        <img src={image} />
      </Avatar>

      {menuScreens.map((icon, index) => (
        <ListItem button key={index} onClick={() => onSelected(index + 1)}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={`Экран ${index + 1}`} />
        </ListItem>
      ))}
    </List>
  );
}

function AppContent({ data }: { data: UserData }) {
  const classes = useStyles();

  const [anchor, setAnchor] = useState(false);
  const setDrawer = (to: boolean) => () => setAnchor(to);

  const [screen, setScreen] = useState(1);

  const menu = <Menu data={data} onSelected={setScreen} />;

  // Use swipeable drawer on mobile screens and permanent drawer otherwise
  return (
    <div className={classes.main}>
      <Hidden smUp implementation="css">
        <SwipeableDrawer
          anchor={"left"}
          open={anchor}
          onClose={setDrawer(false)}
          onOpen={setDrawer(true)}
        >
          <Container
            className={classes.container}
            role="presentation"
            onClick={setDrawer(false)}
            onKeyDown={setDrawer(false)}
          >
            {menu}
          </Container>
        </SwipeableDrawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <div className={classes.xsDrawer}>
          <Drawer
            classes={{ paper: classes.xsDrawerPaper }}
            variant="permanent"
            open
          >
            {menu}
          </Drawer>
        </div>
      </Hidden>
      <div className={classes.content}>Экран №{screen}</div>
    </div>
  );
}

export default function App() {
  const classes = useStyles();

  // Switch screens
  const [userData, setUserData] = useState<UserData | null>(null);
  const [screen, setScreen] = useState<"meet" | "content">("meet");

  return screen == "meet" ? (
    <MeetScreens
      finish={(data) => {
        setUserData(data);
        setScreen("content");
      }}
    />
  ) : (
    <AppContent data={userData!} />
  );
}
