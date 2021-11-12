// ! verification related
const getPendingVerifications = async () => {
  const response = await fetch(`/api/profile/get-pending-verifications`);
  return response;
};

const approveVerification = async (userId: string) => {
  const response = await fetch(`/api/profile/approve-verification/${userId}`);
  return response;
};

const rejectVerification = async (uid: string, cid: string) => {
  const response = await fetch(`/api/profile/reject-verification`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      uid,
      cid,
    }),
  });
  return response;
};

// !profile related
const getApprovedProfiles = async () => {
  const response = await fetch(`/api/profile/get-approved-profiles`);
  return response;
};

const setupProfile = async (
  userId: string,
  name: string,
  tiktokHandle: string,
  profilePicture: string,
  followers: number,
  trend: string[],
  bio: string,

  videoData: Object[],
  sampleVideos: Object[],
  sponsoredVideos: Object[]
) => {
  const response = await fetch(`/api/profile/setup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      name,
      tiktokHandle,
      profilePicture,
      followers,
      trend,
      bio,
      videoData,
      sampleVideos: sampleVideos ?? [],
      sponsoredVideos: sponsoredVideos ?? [],
    }),
  });
  return response;
};

export {
  getPendingVerifications,
  approveVerification,
  rejectVerification,
  getApprovedProfiles,
  setupProfile,
};
