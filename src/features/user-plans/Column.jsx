import React from 'react'
import ListItems from './ListItems'
import { nanoid } from '@reduxjs/toolkit'
import { Droppable } from 'react-beautiful-dnd'
//MATERIAL UI
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import RootRef from "@material-ui/core/RootRef";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
    root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
    dropZone: {
    background: '#375E83',
    minHeight: 240,
    overflow: 'auto',
  },
  draggingOver: {
    background: '#F4F9FE',
    minHeight: 240,
    overflow: 'auto',
    },
header: {
      
  }
}));


function Column(props) {
    const classes = useStyles();
    const { column, meals } = props
          return (
        <Droppable droppableId={column.id}>
              {(provided, snapshot) => (
                <RootRef rootRef={provided.innerRef}>
                  <Card
                   className={classes.root}
                    {...provided.droppableProps}
                    key={nanoid()}
                    aria-label="contacts"
                          >
                    <Paper>
                    <Typography style={{textAlign: 'center'}} textColor="primary" variant="h5" component="h2">
                    {column.id}
                    </Typography>
                    </Paper>
                     <CardContent className={snapshot.isDraggingOver ? classes.draggingOver : classes.dropZone}>                                   
                                  {meals.map((meal, index) => (<ListItems column={column} delete={props.delete} key={meal.id} meal={meal} index={index}/>))}
                        {provided.placeholder}
                     </CardContent>
                  </Card>
                  </RootRef>
                      )}
            </Droppable>
          )
}

export default Column
