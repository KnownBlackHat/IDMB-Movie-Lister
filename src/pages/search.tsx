import SearchWorker from "../search.worker?worker"
import {
    NativeSelect,
    NativeSelectOption,
} from "@/components/ui/native-select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef, useState } from "react"

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


export default function Search() {
    const [inp, setInp] = useState("");
    const [select, setSelect] = useState("Name");
    const [results, setResults] = useState<Movie[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);


    const workerRef = useRef<Worker | null>(null);
    useEffect(() => {
        const controller = new AbortController();
        let debounceTimeout = 0;

        async function fetchSearchResults() {
            if (inp.trim() === "") {
                return;
            }
            debounceTimeout = setTimeout(async () => {
                let response;
                if (select === "Release_Year") {
                    response = await fetch(`https://api.imdbapi.dev/titles?startYear=${encodeURIComponent(inp)}`, { signal: controller.signal });
                } else if (select === "Name") {
                    response = await fetch(`https://api.imdbapi.dev/search/titles?query=${encodeURIComponent(inp)}`, { signal: controller.signal });
                }
                else {
                    response = await fetch(`https://api.imdbapi.dev/titles/${encodeURIComponent(inp)}`, { signal: controller.signal });
                }

                const data = await response.json();
                if (select === "Id") {
                    setResults([data]);
                }
                else {
                    setResults(data.titles);
                }
            }, 500);
        }

        fetchSearchResults();
        return () => {
            if (debounceTimeout) clearTimeout(debounceTimeout);
            controller.abort();
        };
    }, [inp, select]);


    useEffect(() => {
        const worker = new SearchWorker();
        workerRef.current = worker;

        worker.postMessage({ type: "init" });
        worker.onmessage = (e) => {
            if (e.data.type === "results") {
                setSuggestions(e.data.payload);
            }
        };

        return () => {
            worker.terminate();
            workerRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (!workerRef.current || select !== "Name") return;

        if (inp.trim().length < 2) {
            return;
        }

        const timeout = setTimeout(() => {
            workerRef.current!.postMessage({
                type: "search",
                payload: inp
            });
        }, 300);

        return () => clearTimeout(timeout);
    }, [inp, select]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInp(value);

        if (value.trim().length < 2) {
            setSuggestions([]);
        }
    };

    return (
        <div className="flex flex-col">
            <div className="flex mx-20 mt-8 space-x-9">
                <NativeSelect value={select} onChange={(e) => setSelect(e.target.value)}>
                    <NativeSelectOption value="Name">Name</NativeSelectOption>
                    <NativeSelectOption value="Id">Id</NativeSelectOption>
                    <NativeSelectOption value="Release_Year">Release Year</NativeSelectOption>
                </NativeSelect>

                <Input placeholder="Search for movies, shows, etc." value={inp}
                    onChange={handleInputChange}
                />


            </div>
            <div className="flex flex-wrap items-center justify-center mt-4">
                {suggestions.map((sug, index) => (
                    <span key={index} className="inline-block bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm mr-2 mt-2"
                        onClick={() => setInp(sug)}
                    >
                        {sug}
                    </span>
                ))}
            </div>

            <div className="grid sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-9 mt-8 mx-4">
                {results.length > 0 && results.map((movie) => (
                    <>
                        {movie.id && <div key={movie.id}>
                            <div className="group relative overflow-hidden rounded-xl">
                                <img
                                    src={movie.primaryImage?.url}
                                    alt={movie.primaryTitle}
                                    loading="lazy"
                                    className="h-[280px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />

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
                        </div>
                        }
                    </>

                ))}
            </div>
        </div>
    )
}

