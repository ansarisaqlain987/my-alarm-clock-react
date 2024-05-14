import { getComponentsFromDate } from "@/lib/utils";
import { IAlarm, IAlarmContext, IAlarmCurrentState } from "@/types";
import { createContext, useState, FC, PropsWithChildren, useEffect, useRef } from "react";
import Sound from '@/assets/mixkit-casino-win-alarm-and-coins-1990.mp3';
import _ from 'lodash';

const alarmTone = new Audio(Sound);
const defaultAlarmCurrentState: IAlarmCurrentState = {
    hours: "00",
    minutes: "00",
    amPm: "XX",
    day: "DD",
    month: "MM",
    year: "YYYY",
    // timestamp: new Date(),
}

export const AlarmContext = createContext<IAlarmContext>({
    currentTime: defaultAlarmCurrentState,
    setCurrentTime: () => { },
    alarms: [],
    setAlarms: () => { },
    deleteAlarm: () => { },
    addAlarm: () => { },
    snoozeAlarm: () => { },
    active: -1,
    setActive: () => {}
});

export const AlarmContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const audio = useRef(new Audio(Sound));
    const [currentTime, setCurrentTime] = useState<IAlarmCurrentState>(defaultAlarmCurrentState);
    const [alarms, setAlarms] = useState<IAlarm[]>([]);
    const [active, setActive] = useState<number>(-1);
    useEffect(() => {
        setInterval(() => {
            const currentTimestamp = new Date();
            const data = getComponentsFromDate(currentTimestamp);
            setCurrentTime(data);
        }, 1000)
    }, []);
    const al = alarms.find((a) => _.isEqual(a.next, currentTime));
    if (al) {
        const io = alarms.indexOf(al);
        if(active !== io) setActive(io);
        // alarmTone.play();
        audio.current.play();
    }

    const deleteAlarm = (alarmIndex: number) => {
        if(!alarmTone.paused) alarmTone.pause();
        setAlarms(() => alarms.filter((p, i) => i !== alarmIndex));
    }

    const addAlarm = (data: IAlarmCurrentState) => {
        const newAlarm: IAlarm = { current: data, snoozedTimes: 0, next: data };
        setAlarms((prev) => ([...prev, newAlarm]));
    }

    const snoozeAlarm = (alarmIndex: number) => {
        // alarmTone.pause();
        audio.current.pause();
        const data = alarms[alarmIndex];
        const newData: IAlarm = {
            current: data.current,
            snoozedTimes: data.snoozedTimes + 1,
            next: data.next
        }
        if (newData.snoozedTimes >= 3) {
            setAlarms(() => alarms.filter((p, i) => i !== alarmIndex));
        } else {
            setAlarms(() => alarms.map((p, i) => (i !== alarmIndex) ? p : newData));
        }
    }

    return <AlarmContext.Provider
        value={{
            currentTime,
            setCurrentTime,
            deleteAlarm,
            alarms,
            setAlarms,
            addAlarm,
            snoozeAlarm,
            active,
            setActive
        }}>
        {children}
    </AlarmContext.Provider>
}