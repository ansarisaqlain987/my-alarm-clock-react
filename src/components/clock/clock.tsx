import { IAlarmContext } from "@/types";
import { FC } from "react";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export const ClockCard: FC<{ data: IAlarmContext }> = ({ data }) => {
    return (
        <div className="flex justify-center">
            <Card className="w-[50%] text-center">
                <CardHeader>
                    <CardTitle className="text-6xl">{data.currentTime.hours}:{data.currentTime.minutes} {data.currentTime.amPm}</CardTitle>
                    <CardDescription className="text-3xl">{data.currentTime.day} {data.currentTime.month} {data.currentTime.year}</CardDescription>
                </CardHeader>
            </Card>
        </div>
    )
}