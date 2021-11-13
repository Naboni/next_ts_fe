const getCreatorById = async (id: string) => {
  const response = await fetch(`/api/profile/${id}`);
  return response;
};

const getCreators = async () => {
  const response = await fetch(`/api/profile/all`);
  return response;
};

export { getCreatorById, getCreators };
