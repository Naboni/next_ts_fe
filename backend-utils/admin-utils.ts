const getPendingVerifications = async () => {
  const response = await fetch(`/api/profile/get-pending-verifications`);
  return response;
};

export { getPendingVerifications };
