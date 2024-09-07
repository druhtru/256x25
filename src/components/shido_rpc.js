import React, { useEffect, useState } from 'react';

const ValidatorTable = () => {
  const [validatorData, setValidatorData] = useState([]);
  const [lastUpdate, setLastUpdate] = useState('');

  useEffect(() => {
    fetch('https://snapshots.256x25.tech/snapshots/shido/validator_info.json')
      .then(response => response.json())
      .then(data => {
        if (data && Array.isArray(data.validators)) {
          setValidatorData(data.validators);  // Дані з масиву `validators`
          setLastUpdate(data.update);         // Витягуємо час останнього оновлення
        } else {
          setValidatorData([]);
        }
      })
      .catch((error) => console.error('Error loading validator data:', error));
  }, []);

  return (
    <div>
      <h4>Last Update: {lastUpdate || 'N/A'}</h4>  {/* Відображення часу останнього оновлення */}
      
      <table>
        <thead>
          <tr>
            <th>Validator Name</th>
            <th>IP Address</th>
            <th>Moniker</th>
            <th>Security Contact</th>
          </tr>
        </thead>
        <tbody>
          {validatorData.map((validator, index) => (
            <tr key={index}>
              <td>{validator.node_moniker}</td>
              <td>{validator.ip_port}</td>
              <td>{validator.validator_info.moniker}</td>
              <td>{validator.validator_info.security_contact || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ValidatorTable;
