import { FC, useContext, useEffect, useState } from "react";
import { AlarmContext } from "../../context/alarm";
import { Button } from "../ui/button";
import { getComponentsFromDate } from "@/lib/utils";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
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


export const AlarmClock: FC = () => {
    const data = useContext(AlarmContext);
    const [time, setTime] = useState('');
    const [active, setActive] = useState(data.active > -1);
    useEffect(() => { setActive(data.active > -1) }, [data.active])
    const handleAddAlarm = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const d = new Date(time);
        const c = getComponentsFromDate(d);
        data.addAlarm(c)
    }

    return (
        <div className="container flex flex-col justify-between h-[100vh] py-10 gap-6">
            <div className="flex justify-center">
                <Card className="w-[50%] text-center">
                    <CardHeader>
                        <CardTitle className="text-6xl">{data.currentTime.hours}:{data.currentTime.minutes} {data.currentTime.amPm}</CardTitle>
                        <CardDescription className="text-3xl">{data.currentTime.day} {data.currentTime.month} {data.currentTime.year}</CardDescription>
                    </CardHeader>
                </Card>
            </div>

            <div className="flex justify-center flex-1">
                <Card className="w-[50%] text-center">
                    <CardHeader>
                        <CardTitle className="text-2xl">Alarms</CardTitle>
                        <CardDescription className="text-xl">
                            <Table className="my-2">
                                <TableCaption>List of Alarms</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Sr. No.</TableHead>
                                        <TableHead>Time</TableHead>
                                        <TableHead className="w-[100px]">Snoozed</TableHead>
                                        <TableHead className="text-right w-[100px]">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        data.alarms.map((a, i) => (
                                            <TableRow key={i}>
                                                <TableCell className="font-medium text-left">{i + 1}</TableCell>
                                                <TableCell className="font-medium text-left">{a.current.hours}:{a.current.minutes} {a.current.amPm}</TableCell>
                                                <TableCell className="font-medium text-left">{a.snoozedTimes}</TableCell>
                                                <TableCell className="font-medium text-left"><Button onClick={() => data.deleteAlarm(i)} variant={"destructive"}>Delete</Button></TableCell>
                                            </TableRow>
                                        ))
                                    }
                                    {
                                        data.alarms.length === 0 && <TableRow><TableCell colSpan={4}>No Alarms</TableCell></TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>

            <div className="flex justify-center">
                <Card className="w-[50%] text-center">
                    <CardHeader>
                        <CardTitle className="text-2xl mb-8">Add Alarm</CardTitle>
                        <CardDescription className="text-xl flex justify-center">
                            <form onSubmit={handleAddAlarm} className="flex flex-col gap-10 w-[70%]">
                                <input type="datetime-local" onChange={(e) => setTime(e.target.value)} value={time} required />
                                <Button type="submit" variant={"default"}>Add Alarm</Button>
                            </form>
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>



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