import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import api from '../../clients/wretchClient';

interface SignInResponse {
    tokens: string;
}

interface SignInRequest {
    email: string;
    password: string;
}

const signIn = async (request: SignInRequest): Promise<SignInResponse> => {
    const response = await api
        .url('/auth/sign-in')
        .post({ email: request.email, password: request.password })
        .json<SignInResponse>();
    return response;
};

export const useSignIn = (
    options?: UseMutationOptions<SignInResponse, Error, SignInRequest, unknown>,
): UseMutationResult<SignInResponse, Error, SignInRequest, unknown> => {
    return useMutation<SignInResponse, Error, SignInRequest, unknown>({
        mutationFn: signIn,
        ...options,
    });
};
