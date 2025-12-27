import { User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import Row from "@/components/Row";

export default function Profile() {


    return (
        <div>
            <div className="flex items-center justify-center mt-8">
                <Card className="w-full mx-20 bg-[#0f1117] border-slate-800 text-white overflow-hidden">
                    <CardContent className="p-8 flex flex-col md:flex-row items-center md:items-start gap-8">

                        <div className="relative">
                            <div className="p-1 mx-10 rounded-full border-2 border-blue-500">
                                <Avatar className="h-24 w-24 md:h-32 md:w-32 bg-[#1a1d26]">
                                    <AvatarImage src={localStorage.getItem("profilePic") || ""} alt={localStorage.getItem("username") || ""} />
                                    <AvatarFallback>
                                        <User className="h-12 w-12 text-blue-500" />
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                        </div>

                        <div className="flex-1 space-y-4 text-center md:text-left">
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight">{localStorage.getItem("username")}</h2>
                                <p className="text-slate-500 text-sm mt-1">Member since 2024</p>
                            </div>

                            <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                <Button className="bg-red-800 hover:bg-red-700 text-white font-semibold px-6"
                                    onClick={() => {
                                        localStorage.removeItem("username");
                                        localStorage.removeItem("profilePic");
                                        localStorage.removeItem("watchlist");
                                        localStorage.removeItem("watchhistory");
                                        toast.success("Successfully signed out!");
                                        window.location.href = "/";
                                    }}
                                >
                                    Sign Out
                                </Button>
                            </div>
                        </div>

                        <div className="flex gap-8 pr-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-500">
                                    {localStorage.getItem("watchhistory") ? JSON.parse(localStorage.getItem("watchhistory") || "[]").length : 0}
                                </div>
                                <div className="text-xs uppercase tracking-wider text-slate-500 font-bold">Watched</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-orange-500">
                                    {localStorage.getItem("watchlist") ? JSON.parse(localStorage.getItem("watchlist") || "[]").length : 0}
                                </div>
                                <div className="text-xs uppercase tracking-wider text-slate-500 font-bold">Watchlist</div>
                            </div>
                        </div>

                    </CardContent>
                </Card>
            </div>
            <div>
                <Row title="Your Watchlist" movies={localStorage.getItem("watchlist") ? JSON.parse(localStorage.getItem("watchlist") || "[]") : []} />
                <Row title="Recently Watched" movies={localStorage.getItem("watchhistory") ? JSON.parse(localStorage.getItem("watchhistory") || "[]") : []} />
            </div>

        </div>
    );
}
