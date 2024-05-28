import { createContext } from 'react';

export const DateContext = createContext({
    date: new Date('December 17, 1995 03:24:00'),
    setDate: (newDate) => {
        date = newDate
    },
});