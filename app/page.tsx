import { Button } from "@/components/ui/button"
import { AuthLayout } from "@/components/auth/AuthLayout";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/auth/sign-in");
}
