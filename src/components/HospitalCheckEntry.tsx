import { HealthCheckEntry } from '../types';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface HospitalCheckEntryProps {
  entry: HealthCheckEntry;
}

const HospitalCheckEntry = ({ entry }: HospitalCheckEntryProps) => {
  const changeHeartColor = (): string => {
    switch (entry.healthCheckRating) {
      case 0:
        return 'green';
      case 1:
        return 'yellow';
      case 2:
        return 'orange';
      case 3:
        return 'red';
      default:
        return 'black';
    }
  };
  return (
    <div
      style={{ border: '1px solid black', padding: '0px 5px', borderRadius: 5 }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p>{entry.date}</p>
        <LocalHospitalIcon />
      </div>
      <div>
        <p>{entry.description}</p>
        <FavoriteIcon style={{ color: changeHeartColor() }} />
        <p>diagnose by {entry.specialist}</p>
      </div>
    </div>
  );
};

export default HospitalCheckEntry;
