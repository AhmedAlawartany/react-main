import { router } from 'app/store';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from 'services/apis/auth/authSelector';
import { logOut } from 'services/apis/auth/authSlice';

export const Home = () => {
    const dispatch = useDispatch<any>();
    const { authUserState } = useSelector((state: any) => authSelector(state));

    const handelLogout = () => {
        dispatch(logOut());
        router.navigate('signin', { replace: true });
    };

    return (
        <div className="flex flex-col gap-4 ">
            <button
                type="button"
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                onClick={handelLogout}
            >
                Sighnout
            </button>
            <div>
                {authUserState?.firstname ? (
                    <h1 className="text-black font-bold text-2xl">{`Hi ${authUserState?.firstname}`}</h1>
                ) : null}
                <h1 className="text-black md:text-blue-400  sm:text-red-900 text-2xl">Home</h1>
            </div>
        </div>
    );
};
