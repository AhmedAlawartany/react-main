import { router } from 'app/store';
import { Button } from 'components';
import React, { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from 'services/apis/auth/authSlice';
import { useLoginActionMutation } from 'services/apis/auth/authApiSlice';
import { Container, FormContainer, Input, Label } from './Theme';
import { useForm, SubmitHandler } from 'react-hook-form';

type SignIn = {
    email: string;
    password: string;
};
export const Signin = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignIn>();

    const onSubmit: SubmitHandler<SignIn> = async (data) => {
        console.log(data);
        try {
            const payload = await loginAction({ ...data })?.unwrap();
            dispatch(setCredentials({ ...payload }));
            console.log(payload, 'payload');
            router.navigate('dashboard', { replace: true });
        } catch (err: any) {
            console.log(err, 'errerrerrerrerrerr');

            if (!err?.originalStatus) {
                // isLoading: true until timeout occurs
                console.log('No Server Response');
            } else if (err.originalStatus === 400) {
                console.log('Missing Username or Password');
            } else if (err.originalStatus === 401) {
                console.log('Unauthorized');
            } else {
                console.log('Login Failed');
            }
        }
    };

    const dispatch = useDispatch();
    const [loginAction, { isLoading }] = useLoginActionMutation() as any;

    return (
        <div className="flex flex-col m-6 justify-center px-6 py-12 lg:px-8 rounded border border-solid boxShadow-DEFAULT w-full max-w-md">
            <Container className="sm:mx-auto sm:w-full sm:max-w-sm">
                <FormContainer className=" w-full p-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex justify-start flex-col w-full">
                        <Label
                            className="block text-sm font-medium leading-6 text-gray-900"
                            htmlFor="email"
                        >
                            Email:
                        </Label>
                        <Input
                            className="form-input px-4 rounded-full w-full"
                            type="email"
                            id="email"
                            {...register('email', { required: true })}
                        />
                        {errors.email && <span>This field is required</span>}
                    </div>
                    <div className="flex justify-start flex-col w-full">
                        <Label
                            className="block text-sm font-medium leading-6 text-gray-900"
                            htmlFor="password"
                        >
                            Password:
                        </Label>
                        <Input
                            className="form-input px-4  rounded-full w-full"
                            type="password"
                            id="password"
                            {...register('password')}
                        />
                        {errors.password && <span>This field is required</span>}
                    </div>

                    <Button
                        className="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3"
                        loading={isLoading}
                        type="submit"
                    >
                        Submit
                    </Button>
                </FormContainer>
            </Container>
        </div>
    );
};
