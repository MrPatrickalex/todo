import React, { useState, Fragment } from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import TagEdit from "./TagEdit"
// const TagComponent = React.lazy(() => import(/* webpackChunkName: "TagComponent" */'./TagComponent'));
import TagComponent from './TagComponent';

const TagsComponent = (props) => {
    const [isEdit, setIsEdit] = useState(false);
    return (<List>
        {props.tags.map(tag =>
            <TagComponent
                key={tag.id}
                tag={tag}
                onFilter={() => props.onFilter(tag.id)}
                editTag={(newTag, color) => props.editTag(tag.id, newTag, color)}
                removeTag={() => props.removeTag(tag.id)}
            />)}
        {isEdit ? <TagEdit
            tag={{ tag: "", color: "#000" }}
            onDone={(tag, color) => {
                props.addTag(tag, color);
                setIsEdit(false)
            }}
            onRemove={() => setIsEdit(false)}
        /> : <Fragment></Fragment>}
        <Button color="primary" onClick={() => props.onFilter("")}>All tags</Button>
        <IconButton onClick={() => setIsEdit(true)}><AddIcon></AddIcon></IconButton>
    </List>)
}

export default TagsComponent;