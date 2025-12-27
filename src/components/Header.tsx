import { useNavigate } from "react-router";
import { IoSearchOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function useOnlineStatus() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return isOnline;
}

export function Header() {
    const isOnline = useOnlineStatus();

    useEffect(() => {
        if (!isOnline) {
            toast.error("You are offline");
        } else {
            toast.success("You are online");
        }
    }
        , [isOnline]);



    const navigate = useNavigate();
    const isLoggedIn = Boolean(localStorage.getItem("profilePic"));
    return <div className="flex justify-between items-center p-4 border-b border-gray-300">
        <div onClick={() => navigate("/")}>LOGO</div>
        Welcome, {localStorage.getItem("username") || "Guest"}!
        <div className="flex items-center space-x-8">
            <div onClick={() => navigate("/search")}>
                <IoSearchOutline className="inline-block mr-2 text-2xl cursor-pointer"
                />
            </div>
            <div>
                {isLoggedIn ? (
                    <img src={localStorage.getItem("profilePic") || ""} className="w-8 h-8 rounded-full cursor-pointer mr-4"
                        alt="Profile Image"
                        onClick={() => {
                            navigate("/profile")
                        }}
                    />
                ) : (
                    <>
                        <Button variant="link"
                            onClick={() => navigate("/login")}
                        >Sign Up/In</Button>

                    </>
                )}

            </div>
        </div>
    </div>
}
