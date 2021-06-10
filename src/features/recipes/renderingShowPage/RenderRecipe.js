import Tips from './Tips';
import React from 'react';
import Ingredients from './Ingredients'
import RenderMetaData from './RenderMetaData'
import RenderInstructions from './RenderInstructions'

//MATERIAL UI
import { Grid, Paper } from '@material-ui/core';
import Timeline from "@material-ui/lab/Timeline";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

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
  img: {
    padding: "10px",
    marginBottom: "20px",
  },
  main: {
    backgroundColor: "#F4F9FE",
    textAlign: "center",
    padding: "10px",
    paddingBottom: "15px",
  },
}));


const RenderRecipe = ({ recipe }) => {
  const {
    author,
    title,
    description,
    metadata,
    main_img,
    keywords,
    ingriedients,
    instructions,
    instruction_imgs,
    tips,
  } = recipe;
  const classes = useStyles();

  //sanitizes the authors images out of the excerpt
  const regex = new RegExp("webp*");
  const imgTest = regex.test(main_img);
  const img = imgTest
    ? main_img
    : "https://www.thespruceeats.com/thmb/1CjAC8Zr29zcoXNHtq5DgJ45lYs=/1001x1001/filters:fill(auto,1)/SPRE_SocialImage-no-transparency-5ad5fc0bc5542e00362c0baa.png";

  return (
    <section className={classes.root}>
      <Grid className={classes.container}>
        <Grid item xs={12}>
          <Typography variant='h1' component='h2' gutterBottom>
            {title}
          </Typography>
          <Typography
            style={{ backgroundColor: "#F1C8AB" }}
            variant='h5'
            gutterBottom
          >
            Written by: {author}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className={classes.container}>
        <Grid item xs={12} md={10}>
          <Paper className={classes.img}>
            <a href={"https://github.com/RomanTurner"}>
              <img src={img} alt={title} width={"auto"} height={500} />
            </a>
          </Paper>
        </Grid>
      </Grid>
      <main>
        <Grid container>
          <Grid xs={12} md={6}>
            <RenderMetaData metadata={metadata} keywords={keywords} />
          </Grid>
          <Grid xs={12} md={6}>
            <Tips tips={tips} />
          </Grid>
        </Grid>
        <Paper>
          <Grid container>
            <Grid item xs={12} md={6} className={classes.container}>
              <Paper>
                <Typography
                  style={{ backgroundColor: "#F1C8AB" }}
                  gutterBottom
                  variant='h5'
                >
                  Ingredients
                </Typography>
                <Ingredients ingriedients={ingriedients} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} className={classes.container}>
              <Paper style={{ height: "100%" }}>
                <Typography
                  gutterBottom
                  style={{ backgroundColor: "#F1C8AB" }}
                  variant='h5'
                >
                  Description
                </Typography>
                <Typography variant='body1' component='h5' gutterBottom>
                  {description}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
        <div>
          <Timeline>
            <RenderInstructions
              instructions={instructions}
              instruction_imgs={instruction_imgs}
            />
          </Timeline>
        </div>
      </main>
    </section>
  );
};

export default RenderRecipe;
