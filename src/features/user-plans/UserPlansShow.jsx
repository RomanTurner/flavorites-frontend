import Column from './Column'
import {nanoid} from "@reduxjs/toolkit"
import { useParams } from "react-router";
import { selectAndMapPlan, selectPlanById } from "./userPlanSlice";
import { getCurrentUsersPlans } from "./planFetches";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import RootRef from "@material-ui/core/RootRef";
//MATERIAL-UI

import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import ListSubheader from '@material-ui/core/ListSubheader';
import GridListTile from '@material-ui/core/GridListTile';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';   
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    flexDirection: 'row',
  },
  list: {
    flexGrow: 1,
    background: 'red',
    maxWidth: 300,
    margin: '8px',
  },
  dropZone: {
    background: 'gray',
    minHeight: 300,
  },
  draggingOver: {
    background: 'blue',
    minHeight: 300,
  },
  listItem: {
    marginBottom: '5px',
    padding: '8px',
    backgroundColor: theme.palette.background.paper,
  }, 
  isDragging: {
    marginBottom: '5px',
    padding: '8px',
    backgroundColor: 'green',
  }
}));

const PlanShow = () => {

  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();

  const mappedPlan = useSelector(state => selectAndMapPlan(state, +id))
  const plan = useSelector(state => selectPlanById(state, +id))

  const status = useSelector((state) => state.userPlans.status);
  const error = useSelector((state) => state.userPlans.error);

  const [recipes, setRecipes] = useState({}); 
  const [columns, setColumns] = useState({}); 


    useEffect(() => {
        if (status === "idle") {
          dispatch(getCurrentUsersPlans())
        } 
    }, [plan, status, dispatch]);
      
    useEffect(() => {
      if (status === "succeeded") {
          const defaultColumns = {
         'Unassigned': {
                id: 'Unassigned',
                meals: plan.unassigned.map((id) => id = id.toString()) 
            },
        'Monday': {
                id: 'Monday',
                meals: plan.monday.map((id) => id = id.toString()) 
            },
        'Tuesday': {
                id: 'Tuesday',
                meals: plan.tuesday.map((id) => id = id.toString()) 
            },
        'Wednesday': {
                id: 'Wednesday',
                meals: plan.wednesday.map((id) => id = id.toString()) 
            },
        'Thursday': {
                id: 'Thursday',
                meals: plan.thursday.map((id) => id = id.toString()) 
            },
        'Friday': {
                id: 'Friday',
                meals: plan.friday.map((id) => id = id.toString()) 
            },
        'Saturday': {
                id: 'Saturday',
                meals: plan.saturday.map((id) => id = id.toString()) 
            },
        'Sunday': {
                id: 'Sunday',
                meals: plan.sunday.map((id) => id = id.toString()) 
            },
         columnOrder:['Unassigned', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  }
        setRecipes(mappedPlan)
        setColumns(defaultColumns)
      }
    }, [status]);
      
    
    if (!plan) {
    return (
      <section>
        <LinearProgress />
      </section>
    );
    }

    const handleDelete = (meal, column) => {
    let filteredColumn = column.meals.filter(key => key !== meal.id.toString())
    let newColumn = Object.assign({}, column)
    newColumn.meals = filteredColumn
    const filteredRecipes = Object.keys(recipes)
      .filter(key => key !== meal.id.toString())
      .reduce((obj, key) => {
        return {
       ...obj,
        [key]: recipes[key]
      };
      }, {});
    
      // console.log(column);
      // console.log(newColumn);
    
    setRecipes(filteredRecipes); 
    setColumns({ ...columns, [column.id]: newColumn });
    
    // dispatch(deleteFromColumn());

    };
  
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    console.log(draggableId)
    if (!destination) {
      return;
    };
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) { return; };


    // Moving in the same list
    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];
    if (start === finish) {
    const newMeals = [...start.meals];
    newMeals.splice(source.index, 1);
    newMeals.splice(destination.index, 0, draggableId);

    const newColumn = {
       ...start,
       meals: newMeals,
    }

    setColumns(
      {
        ...columns,
        [newColumn.id]: newColumn,
      }
    )
      return;
    }
    //Moving from one list to another
    const startMealIds = [...start.meals];
    startMealIds.splice(source.index, 1);

    const newStart = {
      ...start,
      meals: startMealIds,
    };

    const finishMealIds = [...finish.meals];
    finishMealIds.splice(destination.index, 0, draggableId)

    const newFinish = {
      ...finish,
      meals: finishMealIds,
    };

    setColumns({
      ...columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    });

  }

  let content;
  if (status === "loading") {
    content = <div> Loading...</div>;
  } else if (status === "succeeded" && columns.columnOrder !== undefined) {
    content = (
      <DragDropContext
          onDragEnd={onDragEnd}
          >
        { columns.columnOrder.map((columnId) => {
          const column = columns[columnId];
          const meals = column.meals.map(el => recipes[el]) || [];
          return (
            <Droppable droppableId={column.id}>
              {(provided, snapshot) => (
                <Grid container spacing={3}>
                <RootRef rootRef={provided.innerRef}>
                  <Grid
                    className={classes.list}
                    {...provided.droppableProps}
                    key={nanoid()}
                    aria-label="contacts"
                  >
                    <div className={snapshot.isDraggingOver ? classes.draggingOver : classes.dropZone}>
                    <ListSubheader>{column.id}</ListSubheader>
                      {meals.map((meal, index) => {
                        const { title, main_img, id } = meal
                        const regex = new RegExp("webp*");
                        const imgTest = regex.test(main_img);
                        const img = imgTest ? main_img : "https://www.thespruceeats.com/thmb/1CjAC8Zr29zcoXNHtq5DgJ45lYs=/1001x1001/filters:fill(auto,1)/SPRE_SocialImage-no-transparency-5ad5fc0bc5542e00362c0baa.png";
                        return (
                          <Draggable key={id} draggableId={id.toString()} index={index}>
                            {(provided, snapshot) => (
                              <RootRef rootRef={provided.innerRef}>
                                < GridListTile
                                  className={snapshot.isDragging ? classes.isDragging : classes.listItem}
                                  ContainerComponent="li"
                                  ContainerProps={{ ref: provided.innerRef }}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <ListItemAvatar>
                                    <Avatar
                                      alt={title}
                                      src={img}
                                    />
                                  </ListItemAvatar>
                                  <ListItemText id={id} primary={title} />
                                </GridListTile>
                              </RootRef>
                          
                            )}
                          </Draggable>
                        )
                      })}
                    </div>
                    {provided.placeholder}
                  </Grid>
                  </RootRef>
                </Grid>
              )}
            </Droppable>
          
          )
        })}
    </DragDropContext>
    ); 
  } else if (status === "error") {
    content = <div>{error}</div>;
  }

  return (
    <Grid container className={classes.root} spacing={2}>
      {content}
    </Grid>
      
    )
};

export default PlanShow;





