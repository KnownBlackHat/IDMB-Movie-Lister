import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { memo, useMemo } from "react";
import { toast } from "sonner";

interface Movie {
    id: number;
    type: string;
    primaryTitle: string;
    primaryImage: {
        url: string;
        width: number;
        height: number;
    };
    runtimeSeconds: number;
    genres: string[];
    rating: {
        aggregateRating: number;
        voteCount: number;
    };
    plot: string;
}

function HeroCarousel({ movies }: { movies: Movie[] }) {
    const autoplay = useMemo(
        () => Autoplay({ delay: 6000, stopOnInteraction: false }),
        []
    );
    return (
        <Carousel
            className="w-full h-[70vh]"
            plugins={[autoplay]}
            opts={{ loop: true }}
        >
            <CarouselContent>
                {movies.map((movie, index) => (
                    <CarouselItem key={movie.id}>
                        <div className="relative h-[70vh] w-full">
                            <img
                                loading={index > 1 ? "lazy" : "eager"}
                                decoding="async"
                                src={movie.primaryImage?.url}
                                alt={movie.primaryTitle}
                                className="absolute inset-0 h-full w-full object-cover"
                            />

                            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />

                            <div className="relative z-10 flex h-full items-center px-10 md:px-20 max-w-4xl">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Badge variant="secondary">Featured</Badge>
                                        <span className="text-yellow-400 font-semibold">
                                            ⭐ {movie.rating?.aggregateRating ?? "N/A"}
                                        </span>
                                    </div>

                                    <h1 className="text-4xl md:text-6xl font-bold text-white">
                                        {movie.primaryTitle}
                                    </h1>

                                    <p className="text-sm text-gray-300">
                                        {Math.floor(movie.runtimeSeconds / 60)} min • Movie
                                    </p>

                                    <p className="text-gray-300 max-w-xl line-clamp-3">
                                        {movie.plot}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {movie.genres?.map((genre) => (
                                            <Badge
                                                key={genre}
                                                variant="outline"
                                                className="text-white border-white/30"
                                            >
                                                {genre}
                                            </Badge>
                                        ))}
                                    </div>

                                    <div className="flex gap-4 pt-4">
                                        <Button className="bg-blue-600 hover:bg-blue-700"
                                            onClick={() => {
                                                localStorage.setItem("watchhistory", JSON.stringify([...JSON.parse(localStorage.getItem("watchhistory") || "[]"), movie]));
                                                toast.success(`Started watching ${movie.primaryTitle}`);
                                            }}
                                        >
                                            Watch Now
                                        </Button>
                                        <Button variant="outline" onClick={() => {
                                            localStorage.setItem("watchlist", JSON.stringify([...JSON.parse(localStorage.getItem("watchlist") || "[]"), movie]));
                                            toast.success(`Added ${movie.primaryTitle} to your watchlist`);
                                        }}
                                        >+ Watch List</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
}

export default memo(HeroCarousel);
