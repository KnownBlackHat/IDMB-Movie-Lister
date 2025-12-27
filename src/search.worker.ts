interface Movie {
    id: string;
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

const name_map = new Map<string, Set<string>>();
const movie_list = new Map<string, string>();

function tokenize(text: string): string[] {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "")
        .split(" ")
        .filter(Boolean);
}


function addToIndex(word: string, id: string) {
    if (!name_map.has(word)) {
        name_map.set(word, new Set());
    }
    name_map.get(word)!.add(id);
}

self.onmessage = async function(e) {
    const { type, payload } = e.data;

    if (type === "init") {
        const res = await fetch('https://api.imdbapi.dev/titles?types=MOVIE&types=TV_SERIES&types=TV_MINI_SERIES&types=TV_SPECIAL&types=TV_MOVIE&types=SHORT');
        const data = await res.json();
        const res2 = await fetch(`https://api.imdbapi.dev/titles?types=MOVIE&types=TV_SERIES&types=TV_MINI_SERIES&types=TV_SPECIAL&types=TV_MOVIE&types=SHORT&pageToken=${data.nextPageToken}`);
        const data2 = await res2.json();
        const res3 = await fetch(`https://api.imdbapi.dev/titles?types=MOVIE&types=TV_SERIES&types=TV_MINI_SERIES&types=TV_SPECIAL&types=TV_MOVIE&types=SHORT&pageToken=${data2.nextPageToken}`);
        const data3 = await res3.json();
        const res4 = await fetch(`https://api.imdbapi.dev/titles?types=MOVIE&types=TV_SERIES&types=TV_MINI_SERIES&types=TV_SPECIAL&types=TV_MOVIE&types=SHORT&pageToken=${data3.nextPageToken}`);
        const data4 = await res4.json();
        const res5 = await fetch(`https://api.imdbapi.dev/titles?types=MOVIE&types=TV_SERIES&types=TV_MINI_SERIES&types=TV_SPECIAL&types=TV_MOVIE&types=SHORT&pageToken=${data4.nextPageToken}`);
        const data5 = await res5.json();
        const res6 = await fetch(`https://api.imdbapi.dev/titles?types=MOVIE&types=TV_SERIES&types=TV_MINI_SERIES&types=TV_SPECIAL&types=TV_MOVIE&types=SHORT&pageToken=${data5.nextPageToken}`);
        const data6 = await res6.json();
        const res7 = await fetch(`https://api.imdbapi.dev/titles?types=MOVIE&types=TV_SERIES&types=TV_MINI_SERIES&types=TV_SPECIAL&types=TV_MOVIE&types=SHORT&pageToken=${data6.nextPageToken}`);
        const data7 = await res7.json();
        const res8 = await fetch(`https://api.imdbapi.dev/titles?types=MOVIE&types=TV_SERIES&types=TV_MINI_SERIES&types=TV_SPECIAL&types=TV_MOVIE&types=SHORT&pageToken=${data7.nextPageToken}`);
        const data8 = await res8.json();
        const res9 = await fetch(`https://api.imdbapi.dev/titles?types=MOVIE&types=TV_SERIES&types=TV_MINI_SERIES&types=TV_SPECIAL&types=TV_MOVIE&types=SHORT&pageToken=${data8.nextPageToken}`);
        const data9 = await res9.json();
        const res10 = await fetch(`https://api.imdbapi.dev/titles?types=MOVIE&types=TV_SERIES&types=TV_MINI_SERIES&types=TV_SPECIAL&types=TV_MOVIE&types=SHORT&pageToken=${data9.nextPageToken}`);
        const data10 = await res10.json();



        const titles: Movie[] = [...data.titles, ...data2.titles, ...data3.titles, ...data4.titles, ...data5.titles, ...data6.titles, ...data7.titles, ...data8.titles, ...data9.titles, ...data10.titles];

        for (const title of titles) {
            movie_list.set(title.id, title.primaryTitle);
            tokenize(title.primaryTitle).forEach(word => {
                addToIndex(word, title.id);
            });
        }
        self.postMessage({ type: "init_complete" });

    } else if (type === "search") {
        const query = payload.toLowerCase().trim();

        if (!query) {
            self.postMessage({ type: "search_results", payload: [] });
            return;
        }

        const words = tokenize(query);
        let resultIds: Set<string> | null = null;
        for (const word of words) {
            const matchedKeys = [...name_map.keys()].filter(key => key.includes(word));
            const ids = new Set<string>();

            matchedKeys.forEach(key => {
                name_map.get(key)?.forEach(id => ids.add(id));
            });

            // @ts-expect-error ignore
            resultIds = resultIds ? new Set([...resultIds].filter(id => ids.has(id))) : ids;

            const results = [...(resultIds ?? [])].slice(0, 20).map(id => movie_list.get(id)!);
            self.postMessage({ type: "results", payload: results });

        }
    }
}
