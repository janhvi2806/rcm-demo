// import { useRouter } from "next/router"

// export default function ClaimView() {
//   const router = useRouter()
//   const { id } = router.query

//   return (
//     <div>
//       <h1>Claim #{id}</h1>
//       <p>AI suggested ICD-10: E11.9 (Type 2 Diabetes)</p>
//       <p>AI suggested CPT: 99213 (Office Visit)</p>
//       <p>Status: Submitted → Approved ✅</p>
//     </div>
//   )
// }

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ClaimView() {
  const router = useRouter();
  const { id } = router.query;
  const [encounters, setEncounters] = useState([]);
  const [claim, setClaim] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      try {
        // Get encounters for this patient
        const resEnc = await fetch(`${apiUrl}/encounters/`);
        const allEnc = await resEnc.json();
        const patientEnc = allEnc.filter((e) => e.patient_id == id);
        setEncounters(patientEnc);

        // Auto-submit first encounter as a claim (demo)
        if (patientEnc.length > 0) {
          const resClaim = await fetch(
            `${apiUrl}/claims/submit/${patientEnc[0].id}?country=UAE`,
            { method: "POST" }
          );
          const claimData = await resClaim.json();
          setClaim(claimData);
        }
      } catch (error) {
        console.error("Error fetching claim data:", error);
      }
    }

    fetchData();
  }, [id, apiUrl]);

  return (
    <div>
      <h1>Claim for Patient #{id}</h1>

      {encounters.length === 0 ? (
        <p>No encounters found for this patient.</p>
      ) : (
        encounters.map((enc) => (
          <div key={enc.id}>
            <h3>Encounter Note</h3>
            <p>{enc.note}</p>
          </div>
        ))
      )}

      {claim && (
        <div>
          <h3>Claim Submission Result</h3>
          <p>Status: {claim.status}</p>
          <p>Amount: {claim.amount} AED</p>
          <pre>{claim.payload}</pre>
        </div>
      )}
    </div>
  );
}
