import React, { useState, useEffect } from "react";
import BarChart from "./charts/BarChart";
import PieChart from "./charts/PieChart";
import "../../styles/common/Chart.css";


function Visuals ({project, closeModal}) {

    const [ equipments, setEquipments ] = useState([]);
    const [ material, setMaterial ] = useState([]);
    const [ chartType, setChartType ] = useState("bar");
    const [ dataType, setDataType ] = useState("Equipment");
    const [ data, setData ] = useState(null);


    const handleChartTypeChange = () => {
        setChartType(
            chartType === "bar" ? "pie" : "bar"
        );
    }


    const handleDataTypeChange = () => {
        setDataType(
            dataType === "Equipment" ? "Material" : "Equipment"
        );
    }


    useEffect(() => {
        setEquipments(project.data.equipment);
        setMaterial(project.data.material);
    }, [project]);


    useEffect(() => {
        if (dataType === "Material")
            setData(material);
        else if (dataType === "Equipment")
            setData(equipments);
    }, [material, equipments, chartType, dataType]);


    return (
        <div>
            <h4>{project.title}</h4>
            <div className="selection">
                <div onClick={handleChartTypeChange}>
                    { chartType === "bar" ? "View Pie Chart" : "View Bar Chart"}
                </div>
                <div onClick={handleDataTypeChange}>
                    View&nbsp; 
                    {dataType === "Equipment" ? "Material" : "Equipment"}
                </div>
            </div>
            {
                chartType === "bar"
                    ? <BarChart label={data} labelName={dataType}/>
                    : <PieChart label={data} labelName={dataType}/>
            }
            <button
                className="close-btn"
                onClick={() => closeModal()}
            >
                Close
            </button>
        </div>
    )
}


export default Visuals;
