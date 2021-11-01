const baseUrl = "http://localhost:3005/api/v1";

const signup = async (
  username: string,
  password: string,
  email: string,
  role: string
) => {
  const response = await fetch(`/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
      email,
      role,
    }),
  });
  return response;
};

// ! signIn inside [...nextauth].tsx

const submitRole = async (
  role: string,
  problem: string,
  collaboration: string
) => {
  const response = await fetch(`${baseUrl}/user/submit-role`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": document.cookie.split("=")[1],
    },
    body: JSON.stringify({
      role,
      problem,
      collaboration,
    }),
  });
  return response;
};

export { signup, submitRole };
