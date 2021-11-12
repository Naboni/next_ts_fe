const getCreatorById = async (id: string) => {
  const response = await fetch(`/api/profile/${id}`);
  return response;
};

export { getCreatorById };
