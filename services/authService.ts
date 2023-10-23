import { LoginInputForm, LoginResponse } from "@/interface/auth";
import { baseApiUrl } from "@/lib";

export const loginUser = async (
  payload: LoginInputForm
): Promise<LoginResponse> => {
  const response = await fetch(`${baseApiUrl}auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return response.json();
};
