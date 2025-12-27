import { Button } from "@/components/ui/button"
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { toast } from "sonner";

export default function Signup() {
    const provider = new GoogleAuthProvider();

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log(result)
            const user = result.user;

            localStorage.setItem("username", user.displayName || "");
            localStorage.setItem("profilePic", user.photoURL || "");
            toast.success("Successfully signed in with Google!");

            window.location.href = "/";
        } catch (error) {
            console.error("Error signing in with Google: ", error);
            toast.error("Failed to sign in with Google. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-md border-none shadow-2xl overflow-hidden">

                <CardHeader className="text-center pt-8">
                    <CardTitle className="text-2xl font-bold">Welcome</CardTitle>
                    <CardDescription>
                        Sign in with your Google account to continue to your dashboard.
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col gap-4">
                    <Button
                        onClick={handleGoogleSignIn}
                        variant="outline"
                        className="w-full h-12 flex gap-3 text-lg font-medium hover:bg-slate-900 transition-all border-2"
                    >
                        Continue with Google
                    </Button>
                </CardContent>

                <CardFooter className="pb-8 justify-center">
                    <p className="text-xs text-muted-foreground">
                        By signing in, you agree to our Terms of Service.
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}
