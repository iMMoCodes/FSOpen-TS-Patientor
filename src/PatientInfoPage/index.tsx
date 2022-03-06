import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { Diagnosis, Entry, Patient } from '../types';
import { setDiagnoses, setPatientInfo, useStateValue } from '../state';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

const PatientInfoPage = () => {
  const [{ patient, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const { data: patientInfoFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id || ''}`
        );
        dispatch(setPatientInfo(patientInfoFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    const fetchDiagnoses = async () => {
      try {
        const { data: diagnosesFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnoses(diagnosesFromApi));
      } catch (e) {
        console.log(e);
      }
    };

    if (!(Object.keys(patient).toString() === id)) {
      void fetchPatientInfo();
      void fetchDiagnoses();
    }
  }, []);

  return (
    <div>
      {Object.values(patient).map((patient: Patient) => (
        <div key={patient.id}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h2>{patient.name}</h2>
            {patient.gender === 'male' ? (
              <MaleIcon />
            ) : patient.gender === 'female' ? (
              <FemaleIcon />
            ) : (
              <TransgenderIcon />
            )}
          </div>
          <p style={{ fontSize: 18 }}>ssn: {patient.ssn}</p>
          <p style={{ fontSize: 18 }}>occupation: {patient.occupation}</p>
          <h3>Entries</h3>
          {patient.entries.map((entry: Entry) => (
            <div key={entry.id}>
              <span>{entry.date}</span> <span>{entry.description}</span>
              {entry.diagnosisCodes?.map((diagnosisCode: Diagnosis['code']) => (
                <ul key={diagnosisCode}>
                  <li>
                    {diagnosisCode}{' '}
                    {
                      Object.values(diagnoses).find(
                        (diagnose) => diagnose.code === diagnosisCode
                      )?.name
                    }
                  </li>
                </ul>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PatientInfoPage;
