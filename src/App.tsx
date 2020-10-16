import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Container from "@material-ui/core/Container";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

import Login from "./Login";

const useStyles = makeStyles({
  container: {
    minWidth: 300,
  },
});

export default function App() {
  const classes = useStyles();
  const [anchor, setAnchor] = React.useState(false);

  const setDrawer = (to: boolean) => () => setAnchor(to);

  return (
    <div>
      <Login />
      <Button onClick={setDrawer(true)}>Left</Button>
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
          <List>
            {[<MailIcon />, <InboxIcon />].map((icon, index) => (
              <ListItem button key={index}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={`Экран ${index}`} />
              </ListItem>
            ))}
          </List>
        </Container>
      </SwipeableDrawer>
    </div>
  );
}
