import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ConfiguracionLoading() {
    return (
        <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
            <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
            </div>
            <Skeleton className="h-10 w-32" />
        </div>

        <div className="space-y-6">
            <Skeleton className="h-10 w-full" />

            <div className="flex items-center justify-between">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-10 w-32" />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="border-border/50">
                <CardHeader>
                    <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Skeleton className="h-5 w-5" />
                        <div className="space-y-2">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-4 w-48" />
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Skeleton className="h-6 w-10" />
                        <Skeleton className="h-8 w-8" />
                    </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-6 w-16" />
                    </div>
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-4 w-20" />
                        <div className="flex space-x-1">
                        <Skeleton className="h-5 w-12" />
                        <Skeleton className="h-5 w-12" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-6 w-16" />
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
