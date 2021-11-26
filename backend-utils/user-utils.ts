const signup = async (
  username: string,
  password: string,
  email: string,
  role: string,
  referrer: string
) => {
  const response = await fetch(`/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
      email,
      role,
      referrer,
    }),
  });
  return response;
};

// ! signIn inside [...nextauth].tsx


// ! everything related with auth

const changePassword = async (
  newPassword: string,
  oldPassword: string
  ) => {
    const response = await fetch(`/api/auth/change-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        newPassword,
        oldPassword
      })
      
    });
    return response;
};
    
export { signup, changePassword };