import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import api from "../../clients/wretchClient";

interface SignUpResponse {
  token: string;
}

interface SignUpRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const signUp = async (request: SignUpRequest): Promise<SignUpResponse> => {
  const response = await api
    .url("/register")
    .post({
      email: request.email,
      password: request.password,
      first_name: request.firstName,
      last_name: request.lastName,
    })
    .json<SignUpResponse>();
  return response;
};

export const useRegister = (
  options?: UseMutationOptions<SignUpResponse, Error, SignUpRequest, unknown>
): UseMutationResult<SignUpResponse, Error, SignUpRequest, unknown> => {
  return useMutation<SignUpResponse, Error, SignUpRequest, unknown>({
    mutationFn: signUp,
    ...options,
  });
};
