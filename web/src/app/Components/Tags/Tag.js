import React from "react";
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import Color from 'color-converter'

const Tag = ({ tag, color, isDeletable, onRemove, onFilter }) => {
    let colorClass = Color.fromHex(color)
    if (colorClass.lightness >= 0.8)
        colorClass.darken(30);

    const useTagStyles = makeStyles((theme) => ({
        tag: {
            // backgroundColor: colorClass.toHex(),
            borderColor: colorClass.toHex(),
            color: colorClass.toHex(),
        },
        close: {
            // backgroundColor: colorClass.toHex(),
            // borderColor: "colorClass.toHex()",
            color: colorClass.toHex()
        }
    }));


    const classes = useTagStyles();

    return (
        isDeletable
            ? <Chip
                label={tag}
                variant="outlined"
                size="small"
                classes={{
                    root: classes.tag,
                    deleteIcon: classes.close
                }}
                onDelete={() => onRemove()} />
            : <Chip
                label={tag}
                variant="outlined"
                size="small"
                onClick={onFilter}
                classes={{
                    root: classes.tag,
                    deleteIcon: classes.close
                }} />
    )
}

export default Tag;