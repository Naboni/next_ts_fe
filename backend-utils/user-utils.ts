const baseUrl = "http://localhost:3001/api";

// import Cookies from "js-cookie";
// export const currentUser = async (url: string) => {
//   const cookie = Cookies.get("authorization");

//   if (cookie) {
//     var headers = new Headers();
//     headers.append("Content-Type", "application/json");
//     headers.append("Authorization", cookie);

//     const res = await fetch(`${baseUrl + url}`, {
//       headers,
//     });

//     // If the status code is not in the range 200-299,
//     // we still try to parse and throw it.
//     if (!res.ok) {
//       const error: { err: Error; info: string; status: number } = {
//         err: new Error("An error occurred while fetching the data."),
//         info: await res.json(),
//         status: res.status,
//       };
//       throw error;
//     }
//     return res.json();
//   }
//   const error: { err: Error; status: number } = {
//     err: new Error("Unauthorized."),
//     status: 401,
//   };
//   throw error;
// };

export const getCreator = async (url: string) => {
  const res = await fetch(`${baseUrl + url}`);

  if (!res.ok) {
    const error: { err: Error; info: string; status: number } = {
      err: new Error("An error occurred while fetching the data."),
      info: await res.json(),
      status: res.status,
    };
    throw error;
  }
  return res.json();
};

// export const updateInfluencer = async (
//   first_name : string,
//   last_name: string,
//   topics: string,
//   gender: string,
//   phone_number: string,
//   age: string,
//   price: string,
//   audience_age_range: string,
//   location: string,
//   audience_location: string
// ) => {
//   try {
//     var headers = new Headers();
//     headers.append("Content-Type", "application/json");
//     headers.append("Authorization", Cookies.get("authorization") ?? '');

//     const response = await fetch(`${baseUrl}/users/influencer`, {
//       method: "PUT",
//       headers,
//       body: JSON.stringify({
//         first_name,
//         last_name,
//         topics,
//         gender,
//         phone_number,
//         age,
//         price,
//         audience_age_range,
//         location,
//         // audience_location,
//       }),
//     });
//     const content = await response.json();

//     if (response.status == 200) {
//       const message = "Profile updated successfully.";
//       return {
//         success: true,
//         message,
//       };
//     } else {
//       const message = content.message;
//       return {
//         success: false,
//         message,
//       };
//     }
//   } catch (error) {
//     const message = "Something went wrong, try again later.";
//     return {
//       success: false,
//       message,
//     };
//   }
// };

// export const updateBrand = async (first_name: string, last_name: string) => {
//   try {
//     var headers = new Headers();
//     headers.append("Content-Type", "application/json");
//     headers.append("Authorization", Cookies.get("authorization") ?? '');

//     const response = await fetch(`${baseUrl}/users/customer`, {
//       method: "PUT",
//       headers,
//       body: JSON.stringify({
//         first_name,
//         last_name,
//       }),
//     });
//     const content = await response.json();

//     if (response.status == 200) {
//       const message = "Profile updated successfully.";
//       return {
//         success: true,
//         message,
//       };
//     } else {
//       const message = content.message;
//       return {
//         success: false,
//         message,
//       };
//     }
//   } catch (error) {
//     const message = "Something went wrong, try again later.";
//     return {
//       success: false,
//       message,
//     };
//   }
// };

// export const changePassword = async (old_password: string, new_password: string) => {
//   try {
//     var headers = new Headers();
//     headers.append("Content-Type", "application/json");
//     headers.append("Authorization", Cookies.get("authorization") ?? '');

//     const response = await fetch(`${baseUrl}/users/update-password`, {
//       method: "PUT",
//       headers,
//       body: JSON.stringify({
//         new_password,
//         old_password,
//       }),
//     });
//     const content = await response.json();

//     if (response.status == 200) {
//       const message = "Password changed successfully.";
//       return {
//         success: true,
//         message,
//       };
//     } else {
//       const message = content.message;
//       return {
//         success: false,
//         message,
//       };
//     }
//   } catch (error) {
//     const message = "Something went wrong, try again later.";
//     return {
//       success: false,
//       message,
//     };
//   }
// };

export const getInfluencers = async (url: string) => {
  const res = await fetch(`${baseUrl + url}`);
  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error: { err: Error; info: string; status: number } = {
      err: new Error("An error occurred while fetching the data."),
      info: await res.json(),
      status: res.status,
    };
    throw error;
  }
  return res.json();
};

// export const getContactHistory = async () => {
//   try {
//     var headers = new Headers();
//     headers.append("Authorization", Cookies.get("authorization") ?? '');

//     const response = await fetch(`${baseUrl}/contact/messages/customer`, {
//       headers,
//     });
//     const content = await response.json();

//     if (response.status == 200) {
//       return {
//         success: true,
//         content,
//       };
//     } else {
//       const message = content.message;
//       return {
//         success: false,
//         message,
//       };
//     }
//   } catch (error) {
//     const message = "Something went wrong, try again later.";
//     return {
//       success: false,
//       message,
//     };
//   }
// };
