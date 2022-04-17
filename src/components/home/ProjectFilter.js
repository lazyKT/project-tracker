import React, { useState, useEffect } from "react";
import "../../styles/screens/HomeScreen.css";
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from "@mui/material/ListItemText";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function ProjectFilter ({
    onSortChange, 
    onTagChange, 
    sort, 
    filteredTags, 
    allTags,
    keyword,
    setKeyword
}) {

    const [ tags, setTags ] = useState([]);

    const handleSortChange = (e) => {
        onSortChange(e.target.value);
    }

    const handleTagsChange = (e) => {
        setTags(
            typeof e.target.value === "string"
            ? e.target.value(',') : e.target.value
        );
        onTagChange(
            typeof e.target.value === "string"
            ? e.target.value(',') : e.target.value
        );
    }

    useEffect(() => {
        setTags(filteredTags);
    }, [filteredTags, sort, allTags]);

    return (
        <div className="filter-container">
            <h4>Filter Result(s)</h4>
            <FormControl sx={{ m: 1, minWidth: 150 }}>
                <TextField value={keyword} onChange={e => setKeyword(e.target.value)}
                    id="outlined-basic" label="Search" variant="outlined" />
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="sort-select-filled-label">Sort</InputLabel>
                <Select
                    labelId="sort-select-label"
                    id="sort-select"
                    label="Sort"
                    value={sort}
                    onChange={handleSortChange}
                >
                    <MenuItem value={0}></MenuItem>
                    <MenuItem value={1}>Ascending</MenuItem>
                    <MenuItem value={-1}>Descending</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="filter-tag-checkbox-label">Tag</InputLabel>
                <Select
                    labelId="filter-tag-checkbox-label"
                    id="filter-tag-multiple-checkbox"
                    value={tags}
                    onChange={handleTagsChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    multiple
                >
                    {allTags.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={tags.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}


export default ProjectFilter;

