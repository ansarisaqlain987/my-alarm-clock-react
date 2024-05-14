import { IAlarmContext } from "@/types";
import { FC, useState } from "react";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { getComponentsFromDate } from "@/lib/utils";
import { Button } from "../ui/button";

export const AddAlarmCard: FC<{ data: IAlarmContext }> = ({ data }) => {

    const [time, setTime] = useState('');
    const handleAddAlarm = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const d = new Date(time);
        const c = getComponentsFromDate(d);
        data.addAlarm(c)
    }
    return (
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
    )
}