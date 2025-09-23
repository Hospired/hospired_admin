import { Button } from "@/src/components/ui/button";
import { AuthGuard } from "@/src/components/auth/AuthGuard";


export default function DashboardPage() {
    return (
    <AuthGuard>
        <div>
            <Button>Click me</Button>
        </div>
    </AuthGuard> 
    );
}
