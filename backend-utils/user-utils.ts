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

export { signup };
