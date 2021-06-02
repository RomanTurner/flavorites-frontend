import React from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { Draggable } from 'react-beautiful-dnd'
//MATERIAL UI

import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';   
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginBottom: '5px',
    }
}));


const ListItems = (props) => {
    const classes = useStyles();
    const { title, main_img, id } = props.meal

    const regex = new RegExp("webp*");
    const imgTest = regex.test(main_img);
    const img = imgTest ? main_img : "https://www.thespruceeats.com/thmb/1CjAC8Zr29zcoXNHtq5DgJ45lYs=/1001x1001/filters:fill(auto,1)/SPRE_SocialImage-no-transparency-5ad5fc0bc5542e00362c0baa.png";
     
    return (
    <Draggable draggableId={id} index={props.index}>
        {(provided) => (
          < ListItem
                ContainerComponent="li"
                ContainerProps={{ ref: provided.innerRef }}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className={classes.root}
            >    
            <ListItemAvatar>
            <Avatar
             alt={title}
             src={img}
            />
            </ListItemAvatar>
            <ListItemText id={id} primary={title} />
            <ListItemSecondaryAction>
                <IconButton onClick={() => props.delete(props.meal, props.column)}>
                    <DeleteForeverIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
             
            )}
        </Draggable>
    );
};

export default ListItems;