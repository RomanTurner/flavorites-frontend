import React from "react";
import Box from "@material-ui/core/Box";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: "10px",
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Tips({ tips }) {
  const classes = useStyles();
  const [value, setValue] = React.useState("");
  const empty = tips.length === 0;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Tabs
          variant='scrollable'
          scrollButtons='auto'
          textColor='white'
          value={value}
          onChange={handleChange}
          aria-label='tasty tip tabs'
        >
          {empty ? (
            <Tab value={value} label={"Sorry No Tips At this Time"} />
          ) : (
            tips.map((tip, index) => (
              <Tab value={index} label={`Tasty Tip ${index + 1}`} />
            ))
          )}
        </Tabs>
      </AppBar>
      {tips.map((tip, index) => (
        <TabPanel value={value} index={index}>
          {tip}
        </TabPanel>
      ))}
    </div>
  );
}
