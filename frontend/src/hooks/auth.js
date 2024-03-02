import { useSelector } from "react-redux";

export const useAuth = () => {
    const { username, isAdmin } = useSelector(state => state.user);

    return {
        isAuth: Boolean(username && isAdmin),
        username,
        isAdmin,
    }
}