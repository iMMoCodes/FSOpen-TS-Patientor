import { OccupationalHealthcareEntry } from '../types';
import WorkIcon from '@mui/icons-material/Work';

interface OccupationalHealthcareEntryProps {
  entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcareEntryComponent = ({
  entry,
}: OccupationalHealthcareEntryProps) => {
  return (
    <div
      style={{ border: '1px solid black', padding: '0px 5px', borderRadius: 5 }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p>{entry.date}</p>
        <WorkIcon />
        <h4 style={{ paddingLeft: 5 }}>{entry.employerName}</h4>
      </div>
      <div>
        <p>{entry.description}</p>
        <p>diagnose by {entry.specialist}</p>
      </div>
    </div>
  );
};

export default OccupationalHealthcareEntryComponent;
