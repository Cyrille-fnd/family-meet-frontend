"use client"

export default function AccountError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: "1rem",
        fontFamily: "sans-serif",
      }}
    >
      <h2>Impossible de charger le profil</h2>
      <p style={{ color: "var(--color-gray-secondary)" }}>
        {error.message ||
          "Une erreur est survenue lors du chargement de votre profil."}
      </p>
      <button
        onClick={reset}
        style={{
          padding: "0.5rem 1.5rem",
          backgroundColor: "var(--color-black)",
          color: "var(--color-white)",
          border: "none",
          borderRadius: "var(--radius-sm)",
          cursor: "pointer",
        }}
      >
        Réessayer
      </button>
    </div>
  )
}
