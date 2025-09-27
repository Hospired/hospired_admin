import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function PersonalLoading() {
    return (
        <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
            <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
            </div>
            <Skeleton className="h-10 w-32" />
        </div>

        <div className="flex items-center space-x-4">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-10 w-24" />
        </div>

        <div className="space-y-4">
            <Skeleton className="h-10 w-full" />

            <div className="grid gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="border-border/50">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2">
                        <Skeleton className="h-5 w-48" />
                        <Skeleton className="h-4 w-32" />
                        <div className="flex space-x-4">
                            <Skeleton className="h-3 w-32" />
                            <Skeleton className="h-3 w-48" />
                            <Skeleton className="h-3 w-24" />
                        </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="text-right space-y-2">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-24" />
                        </div>
                        <Skeleton className="h-8 w-8" />
                    </div>
                    </div>
                </CardContent>
                </Card>
            ))}
            </div>
        </div>
        </div>
    )
}
