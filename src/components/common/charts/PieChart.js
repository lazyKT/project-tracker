import React, { useEffect, useState } from "react";
import { 
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";
import { Pie } from "react-chartjs-2";
import "../../../styles/common/Chart.css";


ChartJS.register(ArcElement, Tooltip, Legend);


function PieChart ({label, labelName}) {

    const [ data, setData ] = useState(null);
    const [ loading, setLoading ] = useState(true);


    const getFreqOfOccurence = (_label) => {
        let map = new Map();
        _label.forEach(l => {
            let m = map.get(l);
            if (m)  map.set(l, m + 1);
            else    map.set(l, 1);  
        });
        return {
            labels: Array.from(map.keys()),
            _data: Array.from(map.values())
        }
    }


    const createData = (_labels, _labelName) => {
        const { labels, _data } = getFreqOfOccurence(_labels);
        setData({
            labels,
            datasets: [{
                data: _data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(254, 16, 235, 0.2)',
                    'rgba(255, 26, 186, 0.2)',
                    'rgba(175, 192, 92, 0.2)',
                    
                ]
            }]
        });
    }


    useEffect(() => {
        if (label?.length > 0 && labelName)
            createData(label, labelName);
    }, [label, labelName]);


    useEffect(() => {
        if (data && data !== null)
            setLoading(false);
    }, [data]);


    return (
        <>
            {
                loading ? "Loading ..."
                    : <div className="pie-container"><Pie data={data} /></div>
            }
        </>
    );
}


export default PieChart;

