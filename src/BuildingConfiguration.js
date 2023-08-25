import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from './ThemeContext';
import { fetchConfigurations } from './api'; // Import the fetchConfigurations function
import axios from 'axios';
import './BuildingConfiguration.css'; // Import the CSS file

const API_URL = process.env.REACT_APP_API_URL;

const defaultConfigurations = [
    {
        id: 1,
        buildingType: 'Farm',
    },
    {
        id: 2,
        buildingType: 'Academy',
    },
    {
        id: 3,
        buildingType: 'Headquarters',
    },
    {
        id: 4,
        buildingType: 'LumberMill',
    }
]

const cssStyle = {
    inputStyle: {
        margin: '10px',
        padding: '10px',
        borderRadius: '10px',
        fontFamily: 'Arial, sans-serif',
        fontSize: '15px'
    },
    buttonStyle: {
        margin: '10px',
        fontFamily: 'Arial, sans-serif',
        borderRadius: '10px',
        fontSize: '20px',
        padding: '10px 20px',
    }
}

function BuildingConfiguration() {
    const { theme } = useContext(ThemeContext);
    const [configurations, setConfigurations] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [buildingType, setBuildingType] = useState('');
    const [buildingCost, setBuildingCost] = useState('');
    const [constructionTime, setConstructionTime] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchConfigurations(); // Call the fetchConfigurations function
                setConfigurations(data); // Update the state with fetched data
            } catch (error) {
                console.error('Error fetching configurations:', error);
            }
        }

        fetchData(); // Call the fetchData function
    }, []);

    const handleAddConfiguration = async () => {
        try {
            var response =  await axios.post('https://pathneonapi20230824160910.azurewebsites.net/api/BuildingConfiguration', {
                buildingType,
                buildingCost,
                constructionTime
            });
            // Refresh configurations after successful addition
            console.log(response.data);
            fetchConfigurations();
            setShowAddModal(false);
            setBuildingType('');
            setBuildingCost('');
            setConstructionTime('');
        } catch (error) {
            console.error('Error adding configuration:', error);
        }
    };

    const handleAddClick = () => {
        setShowAddModal(true);
    };

    return (
        <div className={`building-configuration ${theme}`}>
            <h2>Building Configurations</h2>
            <button className="add-button" onClick={handleAddClick}>Add</button>
            <table>
                <thead>
                    <tr>
                        <th>Building Type</th>
                        <th>Building Cost</th>
                        <th>Construction Time</th>
                    </tr>
                </thead>
                <tbody>
                    {configurations.map(config => (
                        <tr key={config.id}>
                            <td>{config.buildingType}</td>
                            <td>{config.buildingCost}</td>
                            <td>{config.constructionTime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showAddModal && (
                <div className="modal">
                    <h3>Add Configuration</h3>
                    <select value={buildingType} onChange={e => setBuildingType(e.target.value)}>
                        {defaultConfigurations.map(config => (
                            <option key={config.id} value={configurations.buildingType} disabled={defaultConfigurations.some(defaultConfig => defaultConfig.buildingType === configurations.buildingType)}>
                                {config.buildingType}
                            </option>
                        ))}
                    </select>
                    <input style={cssStyle.inputStyle} type="number" placeholder="Building Cost" value={buildingCost} onChange={e => setBuildingCost(e.target.value)} />
                    <input style={cssStyle.inputStyle} type="number" placeholder="Construction Time" value={constructionTime} onChange={e => setConstructionTime(e.target.value)} />
                    <div>
                        <button style={cssStyle.buttonStyle} onClick={handleAddConfiguration}>OK</button>
                        <button style={cssStyle.buttonStyle} onClick={() => setShowAddModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BuildingConfiguration;
