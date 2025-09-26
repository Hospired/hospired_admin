import { Average } from "next/font/google";
import { CardSumaryProps } from "./CardSumary.types";
import { title } from "process";
import CustomIcon from "../CustomIcon/CustomIcon";
import { CustomTooltip } from "../CustomTooltip";
import { cn } from "@/src/lib/utils";
import { MoveDownRight } from "lucide-react";

export function CardSumary(props: CardSumaryProps) {
    const { awerage, icon, title, tooltipText, total } = props

    return (
        <div className="shadow-sm bg-blackground rounded-lg p-5 py-3 hover:shadow-lg transition">
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <CustomIcon icon={icon} />
                    {title}
                </div>
                <CustomTooltip 
                    content={tooltipText}
                />
            </div>
            <div className="flex gap-4 mt-2 md:mt-4">
                <p className="text-2xl">{total}</p>
                <div className={cn('flex items-center gap-1 px-2 text-xs text-white rounded-lg h-[20px] bg-black dark:gb-secondary')}>
                    {awerage}%

                    {awerage < 20 && (
                        <MoveDownRight strokeWidth={2} className="h-4 w-4" />
                    )}
                </div>

            </div>

        </div>
    )
}