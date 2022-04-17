import React, {useState, useEffect} from "react";
import "../styles/screens/HomeScreen.css";
import AddIcon from '@mui/icons-material/Add';
import ProjectList from "../components/home/ProjectList";
import ProjectFilter from "../components/home/ProjectFilter";
import { fetchAllProjects } from "../networking/projectRequests";


function HomeScreen () {

    const [ allProjects, setAllProjects ] = useState(null);
    const [ projects, setProjects ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ sort, setSort ] = useState(1); // 1 for ascending, -1 for descending
    const [ allTags, setAllTags ] = useState([]);
    const [ filteredTags, setFilteredTags ] = useState([]);
    const [ keyword, setKeyword ] = useState('');

    
    const getAllProjects = async (signal) => {
        try {
            setLoading(true);
            const res = await fetchAllProjects(signal);
            if (res.error) 
                throw new Error (res.message);
            else {
                setError(null);
                setAllProjects(res.data);
                let _allTags = [ ...new Set([].concat.apply([], res.data.map(d => d.tags)))];
                setAllTags(_allTags);
            }
        }
        catch (err) {
            setError(err.message);
        }
    }


    // filter projects by tags
    const filterProjectsByTags = () => {
        if (filteredTags.length === 0)
            setProjects(allProjects);
        else
            setProjects(
                allProjects?.filter(p => {
                    return p.tags.some((tag) => filteredTags.includes(tag));
                })
            );
    };


    const filterProjectsByKeyword = () => {
        if (keyword.trim().length == 0)
            return;
            
        setProjects(
            projects?.filter(p => p.title.toLowerCase().includes(keyword.toLowerCase()))
        )
    }


    useEffect(() => {
        const abortController = new AbortController();

        (async () => {
            await getAllProjects(abortController.signal);
        })()

        return () => abortController.abort();

    },[]);

    
    useEffect(() => {
        if (projects || error)
            setLoading (false);
    }, [projects, error, allTags]);


    useEffect(() => {
        filterProjectsByTags();
        filterProjectsByKeyword();
    }, [filteredTags, sort, allProjects, keyword]);


    return (
        <div className="container">
            <span className="title">Projects</span>
            <div className="button">
                <AddIcon />
                Create New Project
            </div>
            <ProjectFilter 
                onSortChange={val => setSort(val)}
                onTagChange={val => setFilteredTags(val)}
                sort={sort}
                filteredTags={filteredTags}
                allTags={allTags}
                keyword={keyword}
                setKeyword={val => setKeyword(val)}
            />
            {
                loading ? "Loading ..." : (
                    <>
                        { error && "Unexpected Error" }
                        <ProjectList projects={projects}/>
                    </>
                )
            }
        </div>
    )
}

export default HomeScreen;
