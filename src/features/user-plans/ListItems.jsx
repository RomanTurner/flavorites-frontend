import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
//MATERIAL UI
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import RootRef from "@material-ui/core/RootRef";
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';   
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles((theme) => ({
listItem: {
    marginBottom: '5px',
    backgroundColor: theme.palette.background.paper,
    maxWidth: 300,
    borderRadius: '5px',
    "&:hover": { backgroundColor: "#F1C8AB" },
  }, 
  isDragging: {
    marginBottom: '5px',
    backgroundColor: theme.palette.background.paper,
    maxWidth: 300,
    borderRadius: '5px',
  }
}));


const ListItems = (props) => {
    const classes = useStyles();
    const { meal:{title, main_img, id}, index } = props

    const regex = new RegExp("webp*");
    const imgTest = regex.test(main_img);
    const img = imgTest ? main_img : "https://www.thespruceeats.com/thmb/1CjAC8Zr29zcoXNHtq5DgJ45lYs=/1001x1001/filters:fill(auto,1)/SPRE_SocialImage-no-transparency-5ad5fc0bc5542e00362c0baa.png";
     
   return (
        <Draggable index={index} key={id} draggableId={id.toString()} >
           {
               (provided, snapshot) => (
                   <RootRef rootRef={provided.innerRef}>
                       <Paper>
                       < ListItem
                        className={snapshot.isDragging ? classes.isDragging : classes.listItem}
                        ContainerComponent="li"
                        ContainerProps={{ ref: provided.innerRef }}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                            <Avatar
                                alt={title}
                                src={img}
                            />
                               <ListItemText id={id} primary={title} />
                               <IconButton>
                                   <DeleteForeverIcon onClick={() => props.delete(id, props.column)}/>
                               </IconButton>
                        </ListItem>
                    </Paper>
                </RootRef>
      
            )}
        </Draggable>
    );
                  
};

export default ListItems;