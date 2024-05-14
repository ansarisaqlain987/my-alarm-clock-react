import { FC, useContext, useEffect, useState } from "react";
import { AlarmContext } from "../../context/alarm";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { AlarmTable } from "./alarmTable";
import { ClockCard } from "./clock";
import { AddAlarmCard } from "./addAlarmCard";


export const AlarmClock: FC = () => {
    const data = useContext(AlarmContext);
    const [active, setActive] = useState(data.active > -1);
    useEffect(() => { setActive(data.active > -1) }, [data.active])
    

    return (
        <div className="container flex flex-col justify-between h-[100vh] py-10 gap-6">
            <ClockCard data={data} />
            <AlarmTable data={data} />
            <AddAlarmCard data={data} />       

            <AlertDialog open={active} onOpenChange={setActive}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Alarm</AlertDialogTitle>
                        <AlertDialogDescription>
                            Please Stop or Snooze the alarm
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => {
                            data.setActive(-1);
                            setActive(false);
                            data.snoozeAlarm(data.active)
                        }}>Snooze Alarm</AlertDialogCancel>
                        <AlertDialogAction onClick={() => {
                            data.setActive(-1);
                            setActive(false);
                            data.deleteAlarm(data.active)
                        }}>Stop Alarm</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    )
}