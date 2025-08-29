// import Link from "next/link"

// export default function WorkQueue() {
//   const tasks = [
//     {id: 1, type: "Eligibility Check", patient: "Fatima"},
//     {id: 2, type: "Coding Review", encounter: "Diabetes visit"},
//     {id: 3, type: "Denial Appeal", claim: "C123"}
//   ]

//   return (
//     <div>
//       <h1>Work Queue</h1>
//       {tasks.map(t => (
//         <div key={t.id}>
//           <Link href={`/claim/${t.id}`}>{t.type} - {t.patient || t.encounter || t.claim}</Link>
//         </div>
//       ))}
//     </div>
//   )
// }

import { useEffect, useState } from "react";
import Link from "next/link";

export default function WorkQueue() {
  const [patients, setPatients] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchPatients() {
      try {
        const res = await fetch(`${apiUrl}/patients/`);
        const data = await res.json();
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    }
    fetchPatients();
  }, [apiUrl]);

  return (
    <div>
      <h1>Work Queue</h1>
      {patients.length === 0 ? (
        <p>No patients found. Did you seed the DB?</p>
      ) : (
        patients.map((p) => (
          <div key={p.id}>
            <Link href={`/claim/${p.id}`}>
              Eligibility + Coding Task for {p.name} ({p.insurance})
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
