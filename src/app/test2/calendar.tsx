'use client'

import { useContext } from 'react';
import { DateContext } from './date-context';
import Calendar from 'react-calendar';

export const DateSwitcher = () => {
    const {date, setDate} = useContext(DateContext);
    return (
        <Calendar className="border border-red-950" onChange={setDate} value={date} />
    )
}

export default DateSwitcher;