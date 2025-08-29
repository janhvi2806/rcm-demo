import Link from "next/link"

export default function WorkQueue() {
  const tasks = [
    {id: 1, type: "Eligibility Check", patient: "Fatima"},
    {id: 2, type: "Coding Review", encounter: "Diabetes visit"},
    {id: 3, type: "Denial Appeal", claim: "C123"}
  ]

  return (
    <div>
      <h1>Work Queue</h1>
      {tasks.map(t => (
        <div key={t.id}>
          <Link href={`/claim/${t.id}`}>{t.type} - {t.patient || t.encounter || t.claim}</Link>
        </div>
      ))}
    </div>
  )
}
