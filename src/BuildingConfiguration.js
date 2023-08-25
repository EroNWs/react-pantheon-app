import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from './ThemeContext';
import { fetchConfigurations } from './api'; // Import the fetchConfigurations function
import axios from 'axios';
import './BuildingConfiguration.css'; // Import the CSS file


const cssStyle = {
    inputStyle: {
        margin: '10px',
        padding: '10px',
        borderRadius: '10px',
        fontFamily: 'Arial, sans-serif',
        fontSize: '15px',
        width:'80%'
    },
    buttonStyle: {
        margin: '10px',
        fontFamily: 'Arial, sans-serif',
        borderRadius: '10px',
        fontSize: '20px',
        padding: '10px 20px',
    }
}

function getBuildingTypeText(buildingValue) {
    switch (buildingValue) {
        case BuildingTypes.Farm: return 'Farm';
        case BuildingTypes.Academy: return 'Academy';
        case BuildingTypes.Headquarters: return 'Headquarters';
        case BuildingTypes.LumberMill: return 'Lumber Mill';
        case BuildingTypes.Barracks: return 'Barracks';
        default: return '';
    }
}

function BuildingConfiguration() {
    const { theme } = useContext(ThemeContext);
    const [configurations, setConfigurations] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [buildingType, setBuildingType] = useState('');
    const [buildingCost, setBuildingCost] = useState('');
    const [constructionTime, setConstructionTime] = useState('');
    const [addSuccessMessage, setAddSuccessMessage] = useState('');
    const BuildingTypes = {
        Farm: 1,
        Academy: 2,
        Headquarters: 3,
        LumberMill: 4,
        Barracks: 5
    };

    const buildingTypeEnumValue = buildingType; // Since you're using the numeric values

    

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
            const token = sessionStorage.getItem('authToken'); // Retrieve the token from session storage
            if (!token) {
                console.error('Authentication token not found.');
                return;
            }
            if (constructionTime < 30 || constructionTime > 1800) {
                console.error('Construction time must be between 30 and 1800 seconds.');
                return;
            }
    
            if (buildingCost < 0) {
                console.error('Building cost cannot be negative.');
                return;
            }
            const addResponse = await axios.post(
                'https://pathneonapi20230824160910.azurewebsites.net/api/BuildingConfiguration',
                {
                    buildingType: buildingTypeEnumValue,
                    buildingCost,
                    constructionTime
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            const newConfiguration = {
                id: addResponse.data.id, // Assuming your API returns the ID of the newly added configuration
                buildingType,
                buildingCost,
                constructionTime
            };
            // Refresh configurations after successful addition
            console.log(addResponse.data);
            setConfigurations(prevConfigurations => [...prevConfigurations, newConfiguration]);
            setShowAddModal(false);
            setBuildingType('');
            setBuildingCost('');
            setConstructionTime('');
            setAddSuccessMessage('Configuration added successfully!');
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
            <button className="add-button" onClick={handleAddClick}>Click the Button to Add</button>
            {addSuccessMessage && <p className="success-message">{addSuccessMessage}</p>}
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
                        <td>{getBuildingTypeText(config.buildingType)}</td>
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
    {Object.keys(BuildingTypes)
        .filter(type => !configurations.some(config => config.buildingType === type))
        .map(type => (
            <option key={BuildingTypes[type]} value={type}>
                {type}
            </option>
        ))}
</select>

        <input style={cssStyle.inputStyle} type="number" placeholder="Building Cost" value={buildingCost} onChange={e => setBuildingCost(e.target.value)} />
        <input style={cssStyle.inputStyle} type="number" placeholder="Construction Time" value={constructionTime} onChange={e => setConstructionTime(e.target.value)} />
        <div>
            <button style={cssStyle.buttonStyle} onClick={handleAddConfiguration}>ADD</button>
            <button style={cssStyle.buttonStyle} onClick={() => setShowAddModal(false)}>Cancel</button>
        </div>
    </div>
)}

        </div>
    );
}

export default BuildingConfiguration;
