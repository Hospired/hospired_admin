import { Button } from "@/components/ui/button"
import { AuthGuard } from "@/components/auth/AuthGuard";

export default function DashboardPage() {
    return (
    <AuthGuard>
        <div>
            <Button>Click me</Button>
        </div>
    </AuthGuard> 
    );
}
