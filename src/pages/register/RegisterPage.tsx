import React, { useState } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputController from '@/components/input/InputControllerComponent';
import PasswordInput from '@/components/passwordInput/PasswordInputComponent';
import * as Theme from './Theme';
import { useLocales } from '@/hooks/useLocales';
import { registerSchema } from '@/schemas/registerSchema';
import useAuthStore from '@/store/authStore';
import { useRoute } from 'react-router5';
import { useRegister } from '@/services/apis/auth/useRegister';
import RegisterPageMeta from '@/meta/RegisterPageMeta';

interface RegisterFormInputs {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
}

const RegisterPage: React.FC = () => {
    const { trans } = useLocales();
    const methods = useForm<RegisterFormInputs>({
        resolver: yupResolver(registerSchema),
        defaultValues: registerSchema.cast({}),
    });

    const { router, route } = useRoute();
    const { handleSubmit, control } = methods;

    const [submitError, setSubmitError] = useState<string | null>(null);
    const setTokens = useAuthStore((state) => state.setTokens);

    console.log(route, 'routerrouterrouter');
    const { mutate: signUp, isPending: isLoading } = useRegister({
        onSuccess: (data) => {
            setTokens(data.token, '');
            router.navigate('products', {}, { replace: true, reload: true });
            setSubmitError(null);
        },
        onError: (error) => {
            setSubmitError(error.message);
        },
    });

    const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
        signUp({
            email: data.email,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
        });
    };

    return (
        <Theme.Body onSubmit={handleSubmit(onSubmit)}>
            <RegisterPageMeta />
            <Theme.FormSection>
                <Theme.FormTitle>{trans('signup.formTitle', 'Sign Up')}</Theme.FormTitle>
                <Theme.FormSubtitle>
                    {trans('signup.formSubtitle', 'Please register to continue')}
                </Theme.FormSubtitle>
                <FormProvider {...methods}>
                    <InputController
                        name="firstName"
                        control={control}
                        label={trans('signup.firstName', { defaultValue: 'First Name' })}
                        placeholder={trans('signup.firstNamePlaceholder', {
                            defaultValue: 'First Name',
                        })}
                    />
                    <InputController
                        name="lastName"
                        control={control}
                        label={trans('signup.lastName', { defaultValue: 'Last Name' })}
                        placeholder={trans('signup.lastNamePlaceholder', {
                            defaultValue: 'Last Name',
                        })}
                    />
                    <InputController
                        name="email"
                        autoComplete="email"
                        control={control}
                        label={trans('signup.email', { defaultValue: 'Email' })}
                        placeholder={trans('signup.emailPlaceholder', {
                            defaultValue: 'Email',
                        })}
                    />
                    <PasswordInput
                        name="password"
                        autoComplete="new-password"
                        control={control}
                        label={trans('signup.password', { defaultValue: 'Password' })}
                        placeholder={trans('signup.passwordPlaceholder', {
                            defaultValue: 'Password',
                        })}
                    />
                    <PasswordInput
                        name="confirmPassword"
                        autoComplete="new-password"
                        control={control}
                        label={trans('signup.confirmPassword', {
                            defaultValue: 'Confirm Password',
                        })}
                        placeholder={trans('signup.confirmPasswordPlaceholder', {
                            defaultValue: 'Confirm Password',
                        })}
                    />
                </FormProvider>
                {submitError && (
                    <Theme.Errors>
                        {submitError || trans('signup.invalidCredentials', 'Invalid credentials')}
                    </Theme.Errors>
                )}
                <Theme.Button
                    type="submit"
                    disabled={isLoading}
                    isLoading={isLoading}
                    label={trans('signin.submit', 'Sign In')}
                />
            </Theme.FormSection>
        </Theme.Body>
    );
};

export default RegisterPage;
