import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
        position: 'top',
        }
    },
};


function BarChart({label, labelName}) {

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

    
    const createData = (_label, _labelName) => {
        const { labels, _data } = getFreqOfOccurence(_label);
        setData({
            labels,
            datasets: [{
                label: `${_labelName} Frequency of Occurance`,
                data: _data,
                backgroundColor: "dodgerblue"
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
            loading 
            ? "Loading ..."
            : <Bar data={data} options={options}/>
        }
      </>  
    );
}


export default BarChart;
