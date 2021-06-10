import React from 'react'
import { Grid } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Card from "@material-ui/core/Card";
import DoneIcon from "@material-ui/icons/Done";
import Divider from "@material-ui/core/Divider";
import TextureIcon from "@material-ui/icons/Texture";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import SelectAllIcon from "@material-ui/icons/SelectAll";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#F4F9FE",
    minWidth: 275,
    marginBottom: "20px",
    marginLeft: "8px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  keywords: {
    backgroundColor: theme.palette.background.paper,
    alignItems: "center",
    justify: "center",
    borderColor: "#F1C8AB",
    padding: "5px",
  },
  keywordContainer: {
    borderColor: "#F1C8AB",
    height: "100%",
    display: "flex",
    alignItems: "right",
    justifyContent: "space-evenly",
  },
}));

const RenderMetaData = (props) => {
  const classes = useStyles();
  const { metadata, keywords } = props
  const icons = [ <DoneIcon/>, <TextureIcon/>, <SelectAllIcon/> ]
  const randNum = () => Math.floor(Math.random() * 3);
  

  const bull = <span className={classes.bullet}>•</span>;
    return (
      <Card className={classes.root} variant='outlined'>
        <CardContent >
          <Grid container>
            <Grid style={{paddingLeft:'40px'}}item xs={12} md={6}>
              <Typography variant='h6' component='h2'>
                Cook Time {bull} {metadata.cook_time}
              </Typography>
              <Typography variant='h6' component='h2'>
                Yield {bull} {metadata.meta_yield}
              </Typography>
              <Typography variant='h6' component='h2'>
                Prep-Time {bull} {metadata.prep_time}
              </Typography>
              <Typography variant='h6' component='h2'>
                Servings {bull} {metadata.servings}
              </Typography>
              <Typography variant='h6' component='h2'>
                Total-Time {bull} {metadata.total_time}
              </Typography>
            </Grid>
            <Divider orientation='vertical' flexItem />
            <Grid item xs={12} md={5}>
              <Grid container className={classes.keywordContainer}>
                {keywords.map((word) => {
                  const icon = icons[randNum()];
                  return (
                    <Grid item>
                      <Chip
                        className={classes.keywords}
                        label={word}
                        color='primary'
                        icon={icon}
                        variant='outlined'
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
}

export default RenderMetaData
