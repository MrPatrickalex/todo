import React, { useState } from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import TextField from '@material-ui/core/TextField';
import ColorPicker from 'material-ui-color-picker'

const TagEdit = ({ tag, onDone, onRemove, color }) => {
    const [newTag, setNewTag] = useState(tag.tag);
    const [newColor, setNewColor] = useState(tag.color);

    return <ListItem key={tag.id}>
        <TextField
            error={newTag === ""}
            id="standard-basic"
            defaultValue={newTag}
            onChange={(e) => setNewTag(e.target.value)} />
        <ColorPicker
            defaultValue={newColor}
            value={newColor}
            onChange={color => {
                console.log('TCL: colorChange!', color);
                setNewColor(color)
            }} />
        <ListItemSecondaryAction>
            <IconButton aria-label="delete" disabled={newTag === ""} onClick={() => onDone(newTag, newColor)}>
                <DoneIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={() => onRemove()}>
                <DeleteIcon />
            </IconButton>
        </ListItemSecondaryAction>
    </ListItem>
}

export default TagEdit;