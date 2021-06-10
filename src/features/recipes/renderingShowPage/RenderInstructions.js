import React from "react";
//MATERIAL UI

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineItem from "@material-ui/lab/TimelineItem";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
    "& .MuiDataGrid-row.Mui-even:not(:hover)": {
      backgroundColor:
        theme.palette.type === "light"
          ? "rgba(0, 0, 0, 0.04)"
          : "rgba(255, 255, 255, 0.04)",
    },
    flexGrow: 1,
    marginBottom: "20px",
    backgroundColor: "white",
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    padding: "5px",
  },
  container: {
    padding: "10px",
    textAlign: "center",
    flexDirection: "column",
    alignItems: "center",
    justify: "center",
  },
  containerOrange: {
    backgroundColor: "#F1C8AB",
    padding: "10px",
    textAlign: "center",
    flexDirection: "column",
    alignItems: "center",
    justify: "center",
  },
  main: {
    alignItems: "center",
    justify: "center",
    backgroundColor: "#F4F9FE",
    textAlign: "center",
    padding: "10px",
    paddingBottom: "15px",
  },
}));

const RenderInstructions = ({ instructions, instruction_imgs }) => {
  const img = "https://www.thespruceeats.com/thmb/1CjAC8Zr29zcoXNHtq5DgJ45lYs=/1001x1001/filters:fill(auto,1)/SPRE_SocialImage-no-transparency-5ad5fc0bc5542e00362c0baa.png";
  const classes = useStyles();
  const timlineContent = [];
  
  for (let i = 0; i < instructions.length; i++) {
  const instructionImage =instruction_imgs.length === 0 ? img : instruction_imgs[i];
    
  const evenSide = (
    <TimelineOppositeContent>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant='h3' component='h2'>
          {`Step ${i + 1}`}
        </Typography>
        <Typography variant='h6' component='body'>
          {instructions[i]}
        </Typography>
      </Paper>
    </TimelineOppositeContent>
  );

  const oddSide =(
      <TimelineContent>
        {i < instruction_imgs.length && (
          <Paper item xs={12} md={12} className={classes.container}>
            <a href={"https://github.com/RomanTurner"}>
              <img
                src={instructionImage}
                alt={"instructions"}
                width={"auto"}
                height={300}
              />
            </a>
          </Paper>
        )}
      </TimelineContent>
    );
    
  timlineContent.push(
    <TimelineItem>
      {i % 2 === 0 ? evenSide : oddSide}
      <TimelineSeparator>
        <TimelineDot style={{backgroundColor: '#F1C8AB'}}>
          <RestaurantIcon />
        </TimelineDot>
        <TimelineConnector />
      </TimelineSeparator>
      {i % 2 === 0 ? oddSide : evenSide}
    </TimelineItem>
  );
    }

    return (
      <div style={{
        paddingBottom: '20px',
        backgroundColor: "#F4F9FE"
      }}>
        <Typography
          className={classes.containerOrange}
          variant='h2'
          component='h5'
          gutterBottom
        >
          Instructions
        </Typography>
        {timlineContent.map((el) => el)}
      </div>
    );
};

export default RenderInstructions;

