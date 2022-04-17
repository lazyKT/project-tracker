import React, { useEffect, useState } from 'react';
import "../../styles/screens/HomeScreen.css";
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';


export default function ProjectCard ({project, setModalOpen, setSelectedProject}) {

    const [ tags, setTags ] = useState([]);


    const handleViewMoreClick = () => {
        setModalOpen(true);
        setSelectedProject(project);
    }


    useEffect(() => {
        setTags([ ... new Set(project?.tags) ]);
    }, [project]);

    return (
        <Paper elevation={3}
            className="card-container"
        >
            <img src={project?.img} className="card-cover-image"/>
            <div className="card-body">
                <div className="card-title">{project?.title}</div>
                <div className="card-text">{project?.description}</div>
                <div>
                    {tags.slice(0, 2).map((tag, idx) => 
                        <Chip className="card-tag" size="small" key={idx} label={tag} />)}
                    {
                        tags.length - 2 > 0 &&
                        <Chip className="card-tag" size="small" label={`${tags.length - 2} more`} />
                    }
                </div>
            </div>
            <a className="view-more-btn" onClick={handleViewMoreClick}>
                View More
            </a>
        </Paper>
    );
}
