import React, { useState, Fragment, Suspense } from "react";
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import CircularProgress from '@material-ui/core/CircularProgress';
import UpdateIcon from '@material-ui/icons/Update';

const InputComponent = ({ onAdd, onShowCompleted, show, syncData, tags, addTag, isSyncing, isSyncRequired }) => {
    const [todo, setTodo] = useState("")
    const [selectedTags, setSelectedTags] = useState([]);

    const change = (todo) => {
        setTodo(todo);
    }

    const addTodo = () => {
        const tagsIds = selectedTags.map(tag => tags.find((tag2) => tag2.tag === tag).id)
        onAdd(todo, tagsIds)
    }


    return (<Fragment>
        <TextField
            id="outlined-basic"
            label="Todo"
            variant="outlined"
            onChange={(e) => change(e.target.value)}
        />
        <Checkbox
            checked={show}
            onChange={(e) => onShowCompleted(e.target.checked)}
            name="checkedB"
            color="primary"
        />
        <Button variant="contained" color="primary" onClick={() => addTodo(todo, selectedTags)}>
            Добавить
        </Button>
        <IconButton aria-label="delete" onClick={() => syncData()}>
            <UpdateIcon />
        </IconButton>
        {isSyncRequired ? <PriorityHighIcon /> : <Fragment></Fragment>}
        {isSyncing ? <CircularProgress /> : <Fragment></Fragment>}
        <Autocomplete
            multiple
            id="tags-filled"
            options={tags.map(tag => tag.tag)}
            onChange={(event, selectedTags) => {
                const newTags = selectedTags.filter(tag => !tags.some(tag2 => tag2.tag === tag));
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
    </Fragment >)
}

export default InputComponent;