import React from "react";

export default function Page() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      <h1>Next.js + Kubernetes Test 🚀</h1>
      <p>
        NEXT_PUBLIC_API_URL:{" "}
        <strong>{process.env.NEXT_PUBLIC_API_URL}</strong>
      </p>
      <p>
        DATABASE_URL: <strong>{process.env.DATABASE_URL}</strong>
      </p>
    </div>
  );
}
