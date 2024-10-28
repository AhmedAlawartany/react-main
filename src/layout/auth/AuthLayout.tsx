import React, { ReactNode } from 'react';
import { Link } from 'react-router5';
import logo from '@/assets/logo.svg';

interface AuthLayoutProps {
    children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    {/* <Link className="flex items-center text-white" name="products">
                        <img className="h-24 w-auto" src={logo} alt="Workflow" />
                    </Link> */}
                </div>

                {/* <h2 className="mt-3 text-center text-3xl font-extrabold text-gray-900">{title}</h2> */}
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">{children}</div>
            </div>
        </div>
    );
};

export default AuthLayout;
