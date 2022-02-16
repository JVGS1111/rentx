import React, {
    createContext,
    ReactNode,
    useContext,
    useState
} from "react";
import api from "../services/api";

interface User {
    id: string;
    email: string;
    name: string;
    driver_license: string;
    avatar: string;
}

interface AuthState {
    token: string;
    user: User;
}

interface AuthContextData {
    user: User;
    signIn: (credentials: SignInCredentials) => Promise<void>;
}

interface SignInCredentials {
    email: string,
    password: string;
}

interface AuthProviderProps {
    children: ReactNode
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {

    const [data, setData] = useState<AuthState>({} as AuthState);

    async function signIn({ email, password }: SignInCredentials) {
        const { data } = await api.post('/session', {
            email,
            password
        });
        console.log(data);

    }

    return (
        <AuthContext.Provider value={{
            user: data.user,
            signIn
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(): AuthContextData {
    const context = useContext(AuthContext)
    return context;
}