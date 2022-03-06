import { useStateValue } from '../state';
import { HospitalEntry } from '../types';

interface HospitalEntryProps {
  entry: HospitalEntry;
}

const HospitalEntryComponent = ({ entry }: HospitalEntryProps) => {
  const [{ diagnoses }] = useStateValue();

  const findDiagnoseName = (code: string) => {
    const diagnose = Object.values(diagnoses).filter(
      (diagnose) => diagnose.code === code.toString()
    );
    if (diagnose) {
      return diagnose[0]?.name;
    }
    return "Couldn't find diagnose name";
  };
  return (
    <div
      style={{ border: '1px solid black', padding: '0px 5px', borderRadius: 5 }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p>{entry.date}</p>
      </div>
      <div>
        <p>{entry.description}</p>
        {entry.diagnosisCodes?.map((code) => {
          return (
            <ul key={code}>
              <li>
                {code} {findDiagnoseName(code)}
              </li>
            </ul>
          );
        })}
        <p>diagnose by {entry.specialist}</p>
      </div>
    </div>
  );
};

export default HospitalEntryComponent;
