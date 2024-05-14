import { FC } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { IAlarmContext } from "@/types";

export const AlarmTable: FC<{data: IAlarmContext}> = ({data}) => {
    return (
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
    )
}