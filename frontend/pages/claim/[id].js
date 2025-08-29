import { useRouter } from "next/router"

export default function ClaimView() {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      <h1>Claim #{id}</h1>
      <p>AI suggested ICD-10: E11.9 (Type 2 Diabetes)</p>
      <p>AI suggested CPT: 99213 (Office Visit)</p>
      <p>Status: Submitted → Approved ✅</p>
    </div>
  )
}
