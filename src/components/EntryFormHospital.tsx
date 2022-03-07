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
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

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
        } catch (e) {
          console.error(e);
        }
      };
      void sendEntry();
      setDescription('');
      setDate('');
      setSpecialist('');
      setType('Hospital');
      setDischargeDate('');
      setDischargeCriteria('');
    }
  };

  return (
    <div>
      <h2>Add Entry</h2>
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
        <input type='submit' value='Submit' style={{ width: 250 }} />
      </form>
    </div>
  );
};

export default EntryFormHospital;
