import React, { useEffect, useState } from "react";
import "../../styles/screens/HomeScreen.css";
import Pagination from '@mui/material/Pagination';
import ProjectCard from "./ProjectCard";
import Modal from "../common/Modal";
import Visuals from "../common/Visuals";
import Loading from "../common/Loading";


function ProjectList ({projects}) {

    const [ visibleProjects, setVisibleProjects ] = useState([]);
    const [ paginationCount, setPaginationCount ] = useState(1);
    const [ page, setPage ] = useState(1);
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ selectedProject, setSelectedProject ] = useState(null);
    const [ loading, setLoading ] = useState(true);


    const handlePaginationChange = (_, val) => {
        setPage(val);
    }


    useEffect(() => {

        if (projects)
            setLoading(false);

        if (projects?.length > 0) {
            setPaginationCount(
                projects?.length % 8 === 0
                    ? projects?.length/8 : Math.floor((projects?.length/8)) + 1
            );
            setVisibleProjects(
                projects.slice((page-1)*8, page*8)
            );
        }
    }, [projects, modalOpen, selectedProject]);


    useEffect(() => {
        if (projects) {
            setVisibleProjects(
                projects.slice((page-1)*8, page*8)
            );
        }
    }, [page, paginationCount]);


    return (
        <>
            {
                loading ? <Loading />
                    : (
                        <div className="row">
                            { visibleProjects?.map((project, idx) => (
                                <ProjectCard 
                                    project={project} 
                                    setModalOpen={() => setModalOpen(true)} 
                                    key={idx}
                                    setSelectedProject={val => setSelectedProject(val)}
                                />
                            ))}
                        </div>
                    )
            }
            { modalOpen && 
                <Modal>
                    <Visuals 
                        project={selectedProject}
                        closeModal={() => setModalOpen(false)}
                    />
                </Modal> 
            }
            <Pagination 
                className="prj-pagination"
                count={paginationCount} 
                page={page} 
                color="primary" 
                onChange={handlePaginationChange}
            />
        </>
    )
}


export default ProjectList;
