const getInvitationById = async (id: string) => {
  const response = await fetch(`/api/invitation/${id}`);
  return response;
};

const getInvitations = async () => {
  const response = await fetch(`/api/invitation`);
  return response;
};

export { getInvitationById, getInvitations };
