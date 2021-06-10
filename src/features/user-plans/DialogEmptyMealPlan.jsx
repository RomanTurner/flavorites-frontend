import React from "react";
import { Link } from "react-router-dom";
import Draggable from "react-draggable";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

function PaperComponent(props) {
  return (
    <Draggable
      handle='#draggable-dialog-title'
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function DialogEmptyMealPlan({id}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    console.log('clickOpen')
  };

  const handleClose = () => {
    setOpen(false);
    console.log('handleClose')
  };

  return (
    <div>
      <Button
       variant='contained'
       color='secondary'
       onClick={handleClickOpen}
      >
       Edit?
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby='draggable-dialog-title'
      >
        <DialogTitle style={{ cursor: "move" }} id='draggable-dialog-title'>
          Your meal plan currently is empty! 
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Checkout the recipes we have availble, or get some
            inspiration from exploring other user's meal plans.
            Or you can proceed to the empty edit page..
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            align='center'
            component={Link}
            to={`/recipes/`}
            color='primary'>
            Take Me To Recipes!
          </Button>
          <Button
            component={Link}
            align='center'
            to={`/meal_plans/`}
            color='primary'>
            Take Me To Meal Plans!
          </Button>
          <Button
            align='center'
            component={Link}
            to={`/user_plans/${id}`}
            color='primary'>
            Take me to the empty Meal Plan! 
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
