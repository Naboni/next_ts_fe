const getCreatorById = async (id: string) => {
  const response = await fetch(`/api/profile/${id}`);
  return response;
};

const getCreators = async () => {
  const response = await fetch(`/api/profile/all`);
  return response;
};

const addCreatorsToCampaign = async (
  creatorId: string,
  campaignIds: string[]
) => {
  const response = await fetch(`/api/campaign/invite`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      creatorId,
      campaignIds,
    }),
  });
  return response;
};

export { getCreatorById, getCreators, addCreatorsToCampaign };
