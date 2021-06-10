import Column from './Column'
import { useSnackbar } from 'notistack';
import { nanoid } from '@reduxjs/toolkit';
import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { DragDropContext } from 'react-beautiful-dnd'
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUsersPlans, updatePlan } from "./planFetches";
import { selectAndMapPlan, selectPlanById } from "./userPlanSlice";

//MATERIAL-UI
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  list: {
    justify: 'flex-end', 
    maxHeight: 300,
    overflow: 'auto',
    overflowY: 'scroll',
    marginBottom: '8px',
  },
  header: {
    width: '100%',
    textAlign: "center",
    marginTop: "20px",
    paddingTop: "20px",
    paddingBottom: "10px",
  },
    saveButton: {
    alignItems: "center",
    margin: "20px",
  }

}));

const PlanShow = () => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();

  const mappedPlan = useSelector(state => selectAndMapPlan(state, +id))
  const plan = useSelector(state => selectPlanById(state, +id))

  const status = useSelector((state) => state.userPlans.status);
  const error = useSelector((state) => state.userPlans.error);

  const [recipes, setRecipes] = useState({}); 
  const [columns, setColumns] = useState({}); 

  // const reminder = () => {
  //   console.log('reminder')
  //   enqueueSnackbar('Remember to Save! ', { variant: 'warning' })
  // };

  
    // useEffect(() => {
    //   const timerId = setInterval(reminder, 30000);
    //   return () => {
    //     clearInterval(timerId);
    //   };
    // },[]);

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
      enqueueSnackbar('Remember to Save! ', { variant: 'warning' });
      
    }, [status]);
      
    
    if (!plan) {
    return (
      <section>
        <LinearProgress />
      </section>
    );
    }

  const handleDelete = (id, column) => {
      
    let filteredColumn = column.meals.filter(key => key !== id.toString())
    let newColumn = Object.assign({}, column)
    newColumn.meals = filteredColumn
    const filteredRecipes = Object.keys(recipes)
      .filter(key => key !== id.toString())
      .reduce((obj, key) => {
        return {
       ...obj,
        [key]: recipes[key]
      };
      }, {});
    
    setRecipes(filteredRecipes); 
    setColumns({ ...columns, [column.id]: newColumn });
    };
  
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    };

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) { return;};


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
    content = (
      <section>
        <LinearProgress />
      </section>
    );
  } else if (status === "succeeded" && columns.columnOrder !== undefined) {
    content = (
      <DragDropContext
          onDragEnd={onDragEnd}
          >
        { columns.columnOrder.map((columnId) => {
          const column = columns[columnId];
          const meals = column.meals.map(el => recipes[el]) || [];
          return (

            <Grid
              item
              md={3}
              sm={6}
              xs={12}
              key={nanoid()}
              className={classes.list}
            >
              <Paper  elevation={3} variant="outlined" square >
                <Column delete={handleDelete} column={column} meals={meals} />
              </Paper>
            </Grid>
          )
        })}
    </DragDropContext>
    ); 
  } else if (status === "error") {
    content = <div>{error}</div>;
  }

  const handleSave = () => {
    const body = Object.keys(columns)
      .reduce((obj, key) => {
        return {
       ...obj,
        [key]: columns[key].meals
      };
      }, {});
    delete body.columnOrder;

    dispatch(updatePlan({ body: body, id: id }))

    enqueueSnackbar('Meal Plan Saved!', { variant: 'success' });
    
  }

  return (
    <>
      <Typography
        className={classes.header}
        variant='h3'
        color='black'
        component='h3'
      >
        Recipes
      </Typography>
      <div className={classes.saveButton}>
        <Button
        fullWidth
        variant="contained"
        color="secondary"
        onClick={handleSave}
      > Save </Button>
      </div>
        <div className={classes.root} >
          <Grid justify="space-evenly" container spacing={2}>
            {content}
          </Grid>
        </div>
    </>
    )
};

export default PlanShow;





