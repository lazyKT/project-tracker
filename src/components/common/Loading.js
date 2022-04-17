import React from "react";
import "../../styles/common/Common.css";
import CircularProgress from '@mui/material/CircularProgress';


function Loading () {

    return (
        <div className="loading-div">
            <CircularProgress />
        </div>
    );
}


export default Loading;
