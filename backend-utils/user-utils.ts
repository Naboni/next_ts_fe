const baseUrl = "http://localhost:3005/api/v1";

const signup = async (username: string, password: string, email: string) => {
  const response = await fetch(`${baseUrl}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
      email,
    }),
  });
  return response;
};

const signin = async (email: string, password: string) => {
  const response = await fetch(`${baseUrl}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  return response;
};

const currentUser = async () => {
  const response = await fetch(`${baseUrl}/user/current-user`, {
    method: "GET",
    headers: { "x-access-token": document.cookie.split("=")[1] },
  });
  return response;
};

export { signup, signin, currentUser };
