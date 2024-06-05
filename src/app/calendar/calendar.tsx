'use client'

import { useContext } from 'react';
import { DateContext } from './date-context';
import Calendar from 'react-calendar';
import './Calendar.css'

export const DateSwitcher = () => {
    const {date, setDate} = useContext(DateContext);
    return (
        <Calendar className="border-0" onChange={setDate} value={date} />
    )
}

export default DateSwitcher;