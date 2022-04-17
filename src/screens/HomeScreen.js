import React, {useState, useEffect} from "react";
import "../styles/screens/HomeScreen.css";
import ProjectList from "../components/home/ProjectList";
import ProjectFilter from "../components/home/ProjectFilter";
import Loading from "../components/common/Loading";
import { fetchAllProjects } from "../networking/projectRequests";


function HomeScreen () {

    const [ allProjects, setAllProjects ] = useState(null);
    const [ projects, setProjects ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ sort, setSort ] = useState(0); // 1 for ascending, -1 for descending, 0 for default
    const [ allTags, setAllTags ] = useState([]);
    const [ filteredTags, setFilteredTags ] = useState([]);
    const [ keyword, setKeyword ] = useState('');

    
    const getAllProjects = async (signal) => {
        try {
            setLoading(true);
            const res = await fetchAllProjects(signal);
            if (res.error === true) 
                throw new Error (res.message);
            else {
                setError(null);
                setAllProjects(res.data);
                setProjects(res.data);
                let _allTags = [ ...new Set([].concat.apply([], res.data.map(d => d.tags)))];
                setAllTags(_allTags);
            }
        }
        catch (err) {
            setError(err.message);
        }
    }


    const doSorting = order => {

        if (order === 0) return;

        return function innerSort (a, b) {
            const titleA = a.title;
            const titleB = b.title;
            let comparison = 0;

            if (titleA > titleB)
                comparison = 1;
            else if (titleA < titleB)
                comparison = -1;
            
            return order === 1 ? comparison : comparison * -1;
        }
    }


    const sortProjects = (_sort) => {
        if (projects === null || projects?.length < 2)
            return;
        
        const sortedProjects = [...projects].sort(doSorting(_sort));
        setProjects([...sortedProjects]);
    }


    // filter projects by tags
    const filterProjectsByTags = (_tags) => {
        return allProjects?.filter(p => {
            return p.tags.some((tag) => filteredTags.includes(tag));
        });
    };


    const filterProjectsByKeyword = (_keyword) => {
        return allProjects?.filter(p => 
            p.title.toLowerCase().includes(_keyword.toLowerCase())
        );
    }

    
    const filterProjects = (_tags, _keyword) => {
        
        let filteredProjects = allProjects;
        if (_tags?.length > 0) {
            // filter by tags
            filteredProjects = filterProjectsByTags(_tags);
        }
        if (_keyword.trim().length > 0) {
            // filter by keyword
            filteredProjects = filterProjectsByKeyword(_keyword);
        }
        setProjects(filteredProjects);
    }


    useEffect(() => {
        /**console.log("effect#1");**/
        const abortController = new AbortController();

        (async () => {
            await getAllProjects(abortController.signal);
        })()

        return () => abortController.abort();
    },[]);

    
    useEffect(() => {
        if ((allProjects && allProjects !== null) || (error && error !== null))
            setLoading (false);
    }, [projects, allProjects, error, allTags]);


    useEffect(() => {
        filterProjects(filteredTags, keyword);
    }, [filteredTags, allProjects, keyword]);


    useEffect(() => {
        setLoading(true);
        sortProjects(sort);
    }, [sort]);


    return (
        <div className="container">
            <span className="title">Projects</span>
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
                loading ? <Loading /> : (
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
