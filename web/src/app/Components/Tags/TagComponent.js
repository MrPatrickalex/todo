import React, { useState, Fragment } from "react";
import TagEdit from "./TagEdit";
import TagNormal from "./TagNormal";

// const TagEdit = React.lazy(() => import(/* webpackChunkName: "TagEdit" */'./TagEdit'));
// const TagNormal = React.lazy(() => import(/* webpackChunkName: "TagNormal" */'./TagNormal'));


const TagComponent = ({ tag, editTag, removeTag, onFilter, isEdit }) => {
    const [toggleEdit, setToggleEdit] = useState(isEdit);

    const onDone = (newTag, color) => {
        editTag(newTag, color);
        setToggleEdit(false);
    }

    return <Fragment>
        {toggleEdit
            ? <TagEdit
                tag={tag}
                onDone={onDone}
                onRemove={() => removeTag()}
            />
            : <TagNormal
                tag={tag}
                toggleEdit={() => setToggleEdit(true)}
                onRemove={() => removeTag()}
                onFilter={onFilter}
            />}
    </Fragment>
}

export default TagComponent;