const claimProfile = async (tiktokHandle: string) => {
  const response = await fetch(`/api/profile/claim`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tiktokHandle,
    }),
  });
  return response;
};

const verifyProfile = async (tiktokHandle: string, pasteCode: string) => {
  const response = await fetch(`/api/profile/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tiktokHandle,
      pasteCode,
    }),
  });
  return response;
};

export { claimProfile, verifyProfile };
