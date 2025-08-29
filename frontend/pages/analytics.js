import { useEffect, useState } from "react";

export default function Analytics() {
  const [stats, setStats] = useState({ submitted: 0, approved: 0, denied: 0 });
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchClaims() {
      try {
        const res = await fetch(`${apiUrl}/claims/`);
        const claims = await res.json();

        const submitted = claims.length;
        const approved = claims.filter((c) => c.status === "approved").length;
        const denied = claims.filter((c) => c.status === "denied").length;

        setStats({ submitted, approved, denied });
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    }

    fetchClaims();
  }, [apiUrl]);

  return (
    <div>
      <h1>Analytics Dashboard</h1>
      <p>Claims submitted: {stats.submitted}</p>
      <p>Approved: {stats.approved}</p>
      <p>Denied: {stats.denied}</p>
      <p>
        First-pass yield:{" "}
        {stats.submitted > 0
          ? `${Math.round((stats.approved / stats.submitted) * 100)}%`
          : "N/A"}
      </p>
    </div>
  );
}
