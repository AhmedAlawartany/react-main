import useAuthStore from '@/store/authStore';
import React from 'react';
import { useRoute } from 'react-router5';

const Header: React.FC = () => {
    const clearTokens = useAuthStore((state) => state.clearTokens);
    const { router } = useRoute();

    const handleLogout = () => {
        clearTokens();
        router.navigate('login');
    };

    return (
        <header className="flex h-[50px] bg-slate-400 w-full justify-center items-center sticky top-0 px-[10px]">
            <div>HEADER</div>

            <button
                onClick={handleLogout}
                className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 ms-auto"
            >
                Logout
            </button>
        </header>
    );
};

export default Header;
