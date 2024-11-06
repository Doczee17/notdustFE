// UserContext.tsx
import React, { createContext, useEffect, useState, ReactNode } from 'react';

interface UserContextType {
    userName: string | null;
    ctsBalance: number;
    setUserName: (name: string) => void;
    updateCtsBalance: (amount: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userName, setUserName] = useState<string | null>(null);
    const [ctsBalance, setCtsBalance] = useState<number>(0);

    useEffect(() => {
        // Load user data from local storage on mount
        const storedUserName = localStorage.getItem('userName');
        const storedCtsBalance = localStorage.getItem('ctsBalance');
        
        if (storedUserName) {
            setUserName(storedUserName);
        }

        if (storedCtsBalance) {
            setCtsBalance(Number(storedCtsBalance));
        }
    }, []);

    const updateCtsBalance = (amount: number) => {
        setCtsBalance(prev => prev + amount);
        localStorage.setItem('ctsBalance', (ctsBalance + amount).toString());
    };

    const value = {
        userName,
        ctsBalance,
        setUserName,
        updateCtsBalance,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
