import { useSelector } from 'react-redux';

function useAuth() {
    const auth = useSelector((state) => state.auth?.entities?.token);
    console.log(auth, 'authauthauthauth');
    const signOut = async () => {};

    return {
        authenticated: !!auth,

        signOut,
    };
}

export default useAuth;
