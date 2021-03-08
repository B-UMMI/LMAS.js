import React from "react";

// Material UI imports
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

// Material UI icon imports
import GitHubIcon from "@material-ui/icons/GitHub";
import ChromeReaderModeIcon from "@material-ui/icons/ChromeReaderMode";

export default function Layout() {
  const styles = {
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      color: "white"
    },
  };

  return (
    <div style={styles.root}>
      <AppBar position="static" style={{ backgroundColor: "#4A690C" }}>
        <Toolbar>
          <Typography variant="h6" style={styles.title}>
            LMAS Report
          </Typography>
          <a
            href={"https://github.com/cimendes/LMAS"}
            target={"_blank"}
            rel="noopener noreferrer"
          >
            <IconButton aria-label="github">
              <GitHubIcon style={{ color: "white" }} />
            </IconButton>
          </a>
          <a
            href={"https://lmas.readthedocs.io/en/latest/"}
            target={"_blank"}
            rel="noopener noreferrer"
          >
            <IconButton aria-label="readthedocs">
              <ChromeReaderModeIcon style={{ color: "white" }} />
            </IconButton>
          </a>
        </Toolbar>
      </AppBar>
    </div>
  );
}
