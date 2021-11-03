const createCampaign = async (
  brandIndustry: string,
  brandName: string,
  brandWebsite: string,

  campaignDuration: string[],
  campaignGoal: string,
  campaignName: string,
  campaignPrice: string,
  campaignPriceType: string,

  contactName: string,
  email: string,
  message: string,
  negotiationType: string,
  otherSocialMedia: string[] | undefined,
  phone: string,
  productName: string
) => {
  const response = await fetch(`/api/campaign/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      brandIndustry,
      brandName,
      brandWebsite,
      campaignDuration,
      campaignGoal,
      campaignName,
      campaignPrice,
      campaignPriceType,
      contactName,
      email,
      message,
      negotiationType,
      otherSocialMedia,
      phone,
      productName,
    }),
  });
  return response;
};

const getCampaignById = async () => {
  const response = await fetch(`/api/campaign/get-campaignById`);
  return response;
};

const getAllCampaigns = async () => {
  const response = await fetch(`/api/campaign/get-campaign`);
  return response;
};

export { createCampaign, getCampaignById, getAllCampaigns };
