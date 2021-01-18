import React from "react";
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import Tag from '../Tags/Tag'
// const Tag = React.lazy(() => import(/* webpackChunkName: "Tag" */'../Tags/Tag'));


const Todo = ({ todo, time, tags, completed, onComplete, onRemove, toggleEdit, onRemoveTagForTodo }) => {
    return (<Grid container spacing={1}>
        <Grid item sm={1}>
            <Checkbox
                edge="start"
                checked={completed}
                onChange={() => onComplete()}
                tabIndex={-1}
                disableRipple
                size="small"
            />
        </Grid>
        <Grid item sm={8}>
            <ListItemText primary={todo} />
        </Grid>
        {/* <Chip label={time} variant="outlined" /> */}
        <Grid item sm={3}>
            <IconButton aria-label="delete" onClick={() => toggleEdit()}>
                <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={() => onRemove()}>
                <DeleteIcon />
            </IconButton>
        </Grid>
        <Grid item sm={12}>
            {tags.map((tag) => <Tag
                key={tag.id}
                {...tag}
                isDeletable={false}
                onRemove={() => { onRemoveTagForTodo(tag.id); }}
            />)}
        </Grid>
    </Grid>)
}

export default Todo;