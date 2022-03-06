import { Entry, Patient } from '../types';
import HospitalCheckEntryComponent from './HospitalCheckEntry';
import HospitalEntryComponent from './HospitalEntryComponent';
import OccupationalHealthcareEntryComponent from './OccupationalHealthcareEntryComponent';

interface PatientProps {
  patient: Patient;
}

const PatientEntry = (props: PatientProps) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  return (
    <div>
      {props.patient.entries.map((entry: Entry) => {
        switch (entry.type) {
          case 'Hospital':
            return <HospitalEntryComponent key={entry.id} entry={entry} />;
          case 'HealthCheck':
            return <HospitalCheckEntryComponent key={entry.id} entry={entry} />;
          case 'OccupationalHealthcare':
            return (
              <OccupationalHealthcareEntryComponent
                key={entry.id}
                entry={entry}
              />
            );
          default:
            assertNever(entry);
        }
      })}
    </div>
  );
};

export default PatientEntry;
