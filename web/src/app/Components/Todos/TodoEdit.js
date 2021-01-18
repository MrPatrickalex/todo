import React, { useState } from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';


const TodoEdit = ({ todo, time, addTag, tags, allTags, completed, onComplete, onRemove, onDone, onRemoveTagForTodo }) => {
    const [todoSave, setTodo] = useState(todo);

    const [selectedTags, setSelectedTags] = useState(tags.map(tag => tag.tag));

    const completeEdit = () => {
        const tagsIds = selectedTags.map(tag => allTags.find((tag2) => tag2.tag === tag).id)
        onDone(todoSave, tagsIds)
    }

    return (<ListItem>
        <ListItemIcon>
            <Checkbox
                edge="start"
                checked={completed}
                onChange={() => onComplete()}
                tabIndex={-1}
                disableRipple
            />
        </ListItemIcon>
        <TextField id="outlined-basic" variant="outlined" onChange={(e) => setTodo(e.target.value)} value={todoSave} />
        <IconButton aria-label="done" onClick={() => completeEdit()}>
            <DoneIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={() => onRemove()}>
            <DeleteIcon />
        </IconButton>
        <Grid item sm={12}>
            <Autocomplete
                multiple
                id="tags-filled"
                options={allTags.map(tag => tag.tag)}
                defaultValue={tags.map(tag => tag.tag)}
                onChange={(event, selectedTags) => {
                    const newTags = selectedTags.filter(tag => !allTags.some(tag2 => tag2.tag === tag));
                    newTags.forEach(tag => addTag(tag))
                    setSelectedTags(selectedTags)
                }}
                getOptionLabel={(option) => option}
                freeSolo
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                    ))
                }
                renderInput={(params) => (
                    <TextField {...params} variant="filled" placeholder="Tags..." />
                )}
            />
        </Grid>
    </ListItem>)
}

export default TodoEdit;