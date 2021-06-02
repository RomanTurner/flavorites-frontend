import React from 'react'
import { nanoid } from '@reduxjs/toolkit'
import ListItems from './ListItems'
//MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ListSubheader from '@material-ui/core/ListSubheader';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '50%',
        marginBottom: '5px',
    }
}));


function Column(props) {
    const classes = useStyles();
    return (
        <Grid
         container
         direction="column"
        >    
        <ListSubheader>{props.column.id}</ListSubheader>
        {props.meals.map((meal, index) => <ListItems index={index} delete={props.delete} key={meal.id} meal={meal} />)}
        </Grid>
    )
}

export default Column
