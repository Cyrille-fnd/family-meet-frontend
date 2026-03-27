export async function joinEvent(
  eventId: string,
  userId: string,
  token: string
): Promise<{ ok: boolean; data: any }> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/api/v2/meets/${eventId}/guests`,
    {
      method: "POST",
      headers: {
        Authorization: "bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    }
  )
  return {
    ok: res.ok,
    data: res.ok ? await res.json().catch(() => null) : null,
  }
}
