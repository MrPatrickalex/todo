import React from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Tag from './Tag';
// const Tag = React.lazy(() => import(/* webpackChunkName: "Tag" */'./Tag'));


const TagNormal = ({ tag, toggleEdit, onRemove, onFilter }) => {
    return <ListItem key={tag.id}>
        <ListItemText><Tag tag={tag.tag} color={tag.color} onFilter={onFilter} /></ListItemText>
        <ListItemSecondaryAction>
            <IconButton aria-label="delete" onClick={() => toggleEdit()}>
                <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={() => onRemove()}>
                <DeleteIcon />
            </IconButton>
        </ListItemSecondaryAction>
    </ListItem >
}

export default TagNormal;