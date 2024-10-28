import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import useAuthStore from '@/store/authStore';
import { useSignIn } from '@/services/apis/auth/useLogin';
import { useRoute } from 'react-router5';
import LoginPageMeta from '@/meta/LoginPageMeta';
import { Form, Input } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { loginInputSchema } from '@/schemas/loginSchema';

interface LoginFormInputs {
    email: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const { router } = useRoute();

    const [submitError, setSubmitError] = useState<string | null>(null);
    const setTokens = useAuthStore((state) => state.setTokens);

    const { mutate: signIn, isPending: isLoading } = useSignIn({
        onSuccess: (data) => {
            setTokens(data.tokens?.access?.token, data.tokens?.refresh?.token);
            router.navigate('home', {}, { replace: true, reload: true });
            setSubmitError(null);
        },
        onError: (error) => {
            setSubmitError(error.message);
        },
    });

    const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
        signIn({ email: data.email, password: data.password });
    };

    return (
        <div>
            <LoginPageMeta />
            <Form
                onSubmit={(values: any) => {
                    onSubmit(values);
                }}
                schema={loginInputSchema}
            >
                {({ register, formState }) => (
                    <>
                        <Input
                            type="email"
                            label="Email Address"
                            error={formState.errors['email']}
                            registration={register('email')}
                        />
                        <Input
                            type="password"
                            label="Password"
                            error={formState.errors['password']}
                            registration={register('password')}
                        />
                        <div>
                            <Button isLoading={isLoading} type="submit" className="w-full">
                                Log in
                            </Button>
                        </div>
                    </>
                )}
            </Form>
        </div>
    );
};

export default LoginPage;
