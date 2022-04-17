import React, { useState, useEffect, useRef } from "react";
import "../../styles/screens/HomeScreen.css";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
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

    const filterDiv = useRef(null);
    const [ tags, setTags ] = useState([]);


    const handleSortChange = (e) => {
        onSortChange(e.target.value);
    }


    const handleFilterOnClick = () => {
        const currDisplayState = filterDiv.current.style.display;
        if (currDisplayState === "block")
            filterDiv.current.style.display = "none";
        else
            filterDiv.current.style.display = "block";
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
        <div>
            <div className="s-filter-icon" onClick={handleFilterOnClick}>
                <FilterAltIcon />
            </div>
            <div className="filter-container" ref={filterDiv}>
                <h4>Filter Result(s)</h4>
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <TextField value={keyword} onChange={e => setKeyword(e.target.value)}
                        id="outlined-basic" label="Search" variant="outlined" />
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 100 }}>
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
                <FormControl 
                    className="filter-tag"
                    sx={{ m: 1, minWidth: 200 }}>
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
        </div>
    )
}


export default ProjectFilter;

