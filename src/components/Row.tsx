import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { memo } from "react";
import { Play } from "lucide-react";
import { IoAdd } from "react-icons/io5";
import { toast } from "sonner";

interface Movie {
    id: number;
    primaryTitle: string;
    primaryImage: {
        url: string;
    };
    runtimeSeconds?: number;
    rating?: {
        aggregateRating: number;
    };
}

function Row({
    title,
    movies,
}: {
    title: string;
    movies: Movie[];
}) {
    return (
        <section className="px-8 md:px-16 py-6 bg-black">
            <h2 className="text-white text-xl md:text-2xl font-semibold mb-4">
                {title}
            </h2>

            <Carousel
                opts={{ align: "start", dragFree: true }}
                className="relative"
            >
                {movies.length === 0 && (
                    <div className="text-center justify-center items-center">
                        <div className="flex flex-col items-center justify-center py-20 border border-dashed border-gray-800 rounded-lg">
                            <p className="text-gray-500 text-lg">Nothing to watch here yet.</p>
                        </div>
                    </div>
                )}
                <CarouselContent className="-ml-4">
                    {movies.map((movie) => (
                        <CarouselItem
                            key={movie.id}
                            className="pl-4 basis-[70%] sm:basis-[45%] md:basis-[30%] lg:basis-[20%]"
                        >
                            <div className="group relative overflow-hidden ">
                                <img
                                    src={movie.primaryImage?.url}
                                    alt={movie.primaryTitle}
                                    loading="lazy"
                                    className="h-[280px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="flex absolute bottom-13">
                                    <div className="bg-black/70 text-white p-2 m-2 rounded-full cursor-pointer hover:bg-white hover:text-black transition-flex"
                                        onClick={() => {
                                            localStorage.setItem("watchhistory", JSON.stringify([...JSON.parse(localStorage.getItem("watchhistory") || "[]"), movie]));
                                            toast.success(`Started watching ${movie.primaryTitle}`);
                                        }}
                                    >
                                        <Play />
                                    </div>
                                    <div className="bg-black/70 text-white p-2 m-2 rounded-full cursor-pointer hover:bg-white hover:text-black transition-flex flex items-center text-2xl"
                                        onClick={() => {
                                            localStorage.setItem("watchlist", JSON.stringify([...JSON.parse(localStorage.getItem("watchlist") || "[]"), movie]));
                                            toast.success(`Added ${movie.primaryTitle} to your watchlist`);
                                        }}
                                    >
                                        <IoAdd />
                                    </div>
                                </div>

                                {movie.rating?.aggregateRating && (
                                    <div className="absolute top-2 right-2">
                                        <Badge className="bg-black/70 text-yellow-400">
                                            ⭐ {movie.rating.aggregateRating}
                                        </Badge>
                                    </div>
                                )}

                                <div className="mt-3">
                                    <h3 className="text-white text-sm font-medium line-clamp-1">
                                        {movie.primaryTitle}
                                    </h3>
                                    {movie.runtimeSeconds && (
                                        <p className="text-xs text-gray-400">
                                            {Math.floor(movie.runtimeSeconds / 60)} min
                                        </p>
                                    )}
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious className="left-0  bg-black/70 border-none text-white" />
                <CarouselNext className="right-0  bg-black/70 border-none text-white" />
            </Carousel>
        </section>
    );
}

export default memo(Row);
