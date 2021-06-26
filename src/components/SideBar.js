import React, { useState, useEffect, useContext } from "react";
import { InshortsContext } from "../Routes";
import { PATH, PRODUCT_URL } from "../constants";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "./SideBar.css";

const useStyles = makeStyles({
  list: {
    width: 210,
    // paddingLeft:'20px',
    // paddingRight:'20px'
  },
  fullList: {
    width: "auto",
  },
});

export default function SwipeableTemporaryDrawer() {
  const { state, dispatch } = useContext(InshortsContext);
  const classes = useStyles();
  const [swipeState, setState] = React.useState({
    left: false,
  });
  const [categories, setCategories] = useState([]);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...swipeState, [anchor]: open });
  };

  useEffect(() => {
    fetch(`${PRODUCT_URL}${PATH.CATEGORY}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setCategories(result);
      });
  }, []);

  const handleCategory = (category) => {
    console.log(category);

    let params = "category/" + category;

    fetch(`${PRODUCT_URL}${PATH.ARTICLES}${params}`)
      .then((res) => res.json())
      .then((result) => {
        dispatch({
          type: "NEWS",
          payload: result,
        });
      });
  };

  console.log(state, "here");

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className="SideBar__category">Categories</List>
      <Divider />
      <List>
        {categories.map((text, index) => (
          <ListItem
            button
            key={text.name}
            style={{ height: 40, borderRadius: 3 }}
          >
            <ListItemText
              primary={text.name}
              onClick={() => handleCategory(text._id)}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment key={"left"}>
        <Button onClick={toggleDrawer("left", true)}>
          <MenuIcon />
        </Button>
        <ThemeProvider theme={theme}>
          <SwipeableDrawer
            anchor={"left"}
            open={swipeState["left"]}
            onClose={toggleDrawer("left", false)}
            onOpen={toggleDrawer("left", true)}
          >
            {list("left")}
          </SwipeableDrawer>
        </ThemeProvider>
      </React.Fragment>
    </div>
  );
}
