import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../config/firebase';
import { User, signInWithEmailAndPassword, signOut } from 'firebase/auth';

interface AuthContextType {
    user: User | null;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    signIn: async () => { throw new Error('AuthContext not initialized') },
    signOut: async () => { throw new Error('AuthContext not initialized') }
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    const signIn = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    const handleSignOut = async () => {
        await signOut(auth);
    };

    return (
        <AuthContext.Provider value={{
            user,
            signIn,
            signOut: handleSignOut
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};