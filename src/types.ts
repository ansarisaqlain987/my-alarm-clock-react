import { Dispatch, SetStateAction } from "react";

export interface IAlarmCurrentState {
    hours: string;
    minutes: string;
    amPm: string;
    day: string;
    month: string;
    year: string;
}

export interface IAlarm {
    current: IAlarmCurrentState;
    snoozedTimes: number;
    next: IAlarmCurrentState;
}

export interface IAlarmContext {
    currentTime: IAlarmCurrentState,
    setCurrentTime: Dispatch<SetStateAction<IAlarmCurrentState>>,
    alarms: IAlarm[],
    setAlarms: Dispatch<SetStateAction<IAlarm[]>>,
    deleteAlarm: (index: number) => void,
    addAlarm: (data: IAlarmCurrentState) => void,
    snoozeAlarm: (index: number) => void,
    active: number,
    setActive: Dispatch<SetStateAction<number>>,
}