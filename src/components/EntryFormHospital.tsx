import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { Entry } from '../types';

const EntryFormHospital = () => {
  const { id } = useParams<{ id: string }>();
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [type, setType] = useState('Hospital');
  const [healthCheck, setHealthCheck] = useState('Healthy');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [sickLeave, setSickLeave] = useState('');
  const [error, setError] = useState(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submit = (e: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    e.preventDefault();
    if (type === 'Hospital') {
      const discharge = {
        date: dischargeDate,
        criteria: dischargeCriteria,
      };
      const newEntry = {
        id,
        description,
        date,
        specialist,
        type,
        discharge,
      };

      const sendEntry = async () => {
        try {
          await axios.post<Entry>(
            `${apiBaseUrl}/patients/${id || ''}/entries`,
            newEntry
          );
          setDescription('');
          setDate('');
          setSpecialist('');
          setType('Hospital');
          setDischargeDate('');
          setDischargeCriteria('');
        } catch (error) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          setError(error.response.data);
          setTimeout(() => {
            setError(null);
          }, 5000);
        }
      };
      void sendEntry();
    }
    if (type === 'HealthCheck') {
      const newEntry = {
        id,
        description,
        date,
        specialist,
        type,
        healthCheckRating: healthCheck,
      };
      const sendEntry = async () => {
        try {
          await axios.post<Entry>(
            `${apiBaseUrl}/patients/${id || ''}/entries`,
            newEntry
          );
          setDescription('');
          setDate('');
          setSpecialist('');
          setType('HealthCheck');
          setHealthCheck('Healthy');
        } catch (error) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          setError(error.response.data);
          setTimeout(() => {
            setError(null);
          }, 5000);
        }
      };
      void sendEntry();
    }
    if (type === 'OccupationalHealthcare') {
      const newEntry = {
        id,
        description,
        date,
        specialist,
        type,
        employerName,
        sickLeave,
      };
      const sendEntry = async () => {
        try {
          await axios.post<Entry>(
            `${apiBaseUrl}/patients/${id || ''}/entries`,
            newEntry
          );
          setDescription('');
          setDate('');
          setSpecialist('');
          setType('OccupationalHealthcare');
          setEmployerName('');
          setSickLeave('');
        } catch (error) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          setError(error.response.data);
          setTimeout(() => {
            setError(null);
          }, 5000);
        }
      };
      void sendEntry();
    }
  };

  return (
    <div>
      <h2>Add Entry</h2>
      {error && <h3 style={{ color: 'red' }}>{error}</h3>}
      <form
        onSubmit={submit}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <label style={{ marginBottom: 5 }}>
          Description:
          <input
            type='text'
            name='description'
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
        </label>
        <label style={{ marginBottom: 5 }}>
          Date:
          <input
            type='text'
            name='date'
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </label>
        <label style={{ marginBottom: 5 }}>
          Specialist:
          <input
            type='text'
            name='specialist'
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
        </label>
        <select
          onChange={({ target }) => setType(target.value)}
          style={{ marginBottom: 5, width: 250 }}
        >
          <option value='Hospital'>Hospital</option>
          <option value='HealthCheck'>HealthCheck</option>
          <option value='OccupationalHealthcare'>OccupationalHealthcare</option>
        </select>
        {type === 'Hospital' && (
          <label style={{ marginBottom: 5 }}>
            Discharge date:
            <input
              type='text'
              name='dischargeDate'
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
          </label>
        )}
        {type === 'Hospital' && (
          <label style={{ marginBottom: 5 }}>
            Discharge criteria:
            <input
              type='text'
              name='dischargeCriteria'
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </label>
        )}
        {type === 'OccupationalHealthcare' && (
          <>
            <label style={{ marginBottom: 5 }}>
              Employer Name:
              <input
                type='text'
                name='employerName'
                value={employerName}
                onChange={({ target }) => setEmployerName(target.value)}
              />
            </label>
            <label style={{ marginBottom: 5 }}>
              Sick leave:
              <input
                type='text'
                name='sickLeave'
                value={sickLeave}
                onChange={({ target }) => setSickLeave(target.value)}
              />
            </label>
          </>
        )}
        {type === 'HealthCheck' && (
          <select
            onChange={({ target }) => setHealthCheck(target.value)}
            style={{ marginBottom: 5, width: 250 }}
          >
            <option value='Healthy'>0</option>
            <option value='LowRisk'>1</option>
            <option value='HighRisk'>2</option>
            <option value='CriticalRisk'>3</option>
          </select>
        )}

        <input type='submit' value='Submit' style={{ width: 250 }} />
      </form>
    </div>
  );
};

export default EntryFormHospital;
