const getInvitationById = async (id: string) => {
  const response = await fetch(`/api/invitation/${id}`);
  return response;
};

export { getInvitationById };
