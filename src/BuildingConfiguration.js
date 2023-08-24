import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from './ThemeContext';
import { fetchConfigurations } from './api'; // Import the fetchConfigurations function
import axios from 'axios';

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

    const handleAddClick = () => {
        setShowAddModal(true);
    };

    const handleAddConfiguration = async () => {
        try {
            const response = await axios.post('https://pathneonapi20230824160910.azurewebsites.net/api/BuildingConfiguration', {
                buildingType,
                buildingCost,
                constructionTime
            });
            // Refresh configurations after successful addition
            fetchConfigurations();
            setShowAddModal(false);
            setBuildingType('');
            setBuildingCost('');
            setConstructionTime('');
        } catch (error) {
            console.error('Error adding configuration:', error);
        }
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
                        <option value="Farm">Farm</option>
                        <option value="Academy">Academy</option>
                        <option value="Headquarters">Headquarters</option>
                        <option value="LumberMill">LumberMill</option>
                        <option value="Barracks">Barracks</option>
                    </select>
                    <input type="number" placeholder="Building Cost" value={buildingCost} onChange={e => setBuildingCost(e.target.value)} />
                    <input type="number" placeholder="Construction Time" value={constructionTime} onChange={e => setConstructionTime(e.target.value)} />
                    <button onClick={handleAddConfiguration}>OK</button>
                    <button onClick={() => setShowAddModal(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default BuildingConfiguration;
