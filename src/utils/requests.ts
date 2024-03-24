type Primitives = string | number | boolean | Date;
type KeyValue<T = string> = { [key: string]: T };
type QueryParam = {
  [key: string]: Primitives | string[] | KeyValue<"asc" | "desc">;
};

type MDCol<T = MDEntity<any>> = {
  result: "ok" | "error";
  response: "collection" | string;
  data: T[];
  limit: number;
  offset: number;
  total: number;
} | null;

type MDEntity<T, Type = string> = {
  id: string;
  type: Type;
  attributes?: T;
  relationships?: Entities[];
} | null;

type MDChapter = MDEntity<
  {
    volume?: string;
    chapter?: string;
    title?: string;
    translatedLanguage: string;
    externalUrl?: string;
    publishAt: Date;
    createdAt: Date;
    updatedAt: Date;
    pages: number;
    version: number;
  },
  "chapter"
>;

type MDTag = MDEntity<
  {
    name: KeyValue;
    description: KeyValue;
    group: string;
    version: number;
  },
  "tag"
>;

type MDManga = MDEntity<
  {
    title: KeyValue;
    altTitles: KeyValue[];
    description: KeyValue;
    isLocked: boolean;
    links: KeyValue;
    originalLanguage: string;
    lastVolume?: string;
    lastChapter?: string;
    publicationDemographic?: string;
    status: string;
    year?: number;
    contentRating?: string;
    tags: MDTag[];
    state: string;
    chapterNumbersResetOnNewVolume: boolean;
    createdAt: Date;
    updatedAt: Date;
    version: number;
    availableTranslatedLanguages: string[];
    latestUploadedChapter: string;
  },
  "manga"
>;

type MDCoverArt = MDEntity<
  {
    description: string;
    volume: string;
    fileName: string;
    locale: string;
    createdAt: Date;
    updatedAt: Date;
    version: number;
  },
  "cover_art"
>;

type Entities = MDChapter | MDManga | MDTag | MDCoverArt;

type OutputModel = {
  manga: MDManga;
  chapter: MDChapter;
};

const fetchJson = async <T = any>(
  url: string,
  params?: QueryParam,
  options?: Object
) => {
  const serializeParameters = (params?: QueryParam) => {
    if (!params) return "";

    return Object.keys(params)
      .map((key) => {
        const value: any = params[key];
        if (Array.isArray(value)) {
          return value.map((val) => `${key}[]=${val}`).join("&");
        }
        if (typeof value === "object") {
          return Object.keys(value)
            .map((k) => `${key}[${k}]=${value[k]}`)
            .join("&");
        }
        return `${key}=${value}`;
      })
      .join("&");
  };

  const pars = serializeParameters(params);
  const uri = `https://api.mangadex.org/${url}?${pars}`;
  const response = await fetch(uri, options);

  if (!response.ok)
    throw new Error(
      `Failed to fetch ${uri}: ${response.status} ${response.statusText}`
    );

  return <T>await response?.json();
};

const fetchCovers = (ids: string[], offset = 0, limit = 100) => {
  return fetchJson<MDCol<MDManga>>(
    "manga",
    {
      ids: ids,
      includes: [
        "cover_art",
        "author",
        "artist",
        "tag",
        "user",
        "scanlation_group",
      ],
      offset,
      limit,
    },
    { cache: "force-cache" }
  );
};

export const fetchStats = async (array: any[]) => {
  const stats = await Promise.all(
    array.map(async (manga) => {
      const response = await fetchJson(
        `/statistics/manga/${manga?.id}`,
        {},
        { cache: "force-cache" }
      );
      return response?.statistics[manga?.id];
    })
  );

  return stats;
};

const fetchLatestChapters = (offset = 0, limit = 100) => {
  return fetchJson<MDCol<MDChapter>>("chapter", {
    offset,
    limit,
    translatedLanguage: ["en"],
    order: { updatedAt: "desc" },
    includeExternalUrl: 0,
  });
};

export const getLatestManga = async () => {
  const chapters: any = await fetchLatestChapters();
  const mangaIds = <string[]>(
    chapters.data
      .map(
        (c: any) => c.relationships?.find((t: any) => t.type === "manga")?.id
      )
      .filter((t: any) => !!t)
  );
  const manga: any = await fetchCovers(mangaIds);

  let output: OutputModel[] = [];

  for (const chapter of chapters.data) {
    for (const rel of chapter.relationships ?? []) {
      if (rel.type !== "manga") continue;

      const existing = manga.data.find((m: any) => m.id === rel.id);
      if (!existing) {
        console.log("Manga not found:", rel.id);
        continue;
      }

      output.push({
        manga: existing,
        chapter: chapter,
      });
    }
  }

  const chapterOutput = output
    .map((e) => e.chapter)
    .map((k) => ({
      id: k?.id,
      chapterTitle: k?.attributes?.title,
      chapter: k?.attributes?.chapter,
    }));

  const mangaOutput = output
    .map((e) => e.manga)
    .map((k) => ({
      id: k?.id,
      title: k?.attributes?.title,
    }));

  return output;
};

export const Carousel = async () => {
  try {
    let req = await fetchJson<MDCol<MDChapter>>(
      "manga",
      {
        limit: 100,
        order: { followedCount: "desc", rating: "desc" },
      },
      { cache: "no-store" }
    );
    let mangaIds: any = req?.data?.map((m) => m?.id);
    let manga = await fetchCovers(mangaIds);

    const getRandomManga = (mangaData: MDCol, count: number) => {
      const selectedManga = [];
      const length: any = mangaData?.data?.length;

      for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * length);
        selectedManga.push(mangaData?.data[randomIndex]);
      }

      return selectedManga;
    };

    let selectedManga: any = getRandomManga(manga, 6);

    const returnedManga = selectedManga.map((manga: any) => ({
      id: manga.id,
      tags: manga.attributes.tags,
      cover: `https://uploads.mangadex.org/covers/${manga.id}/${
        manga?.relationships?.find((t: any) => t.type === "cover_art")
          ?.attributes?.fileName
      }.256.jpg`,
      title: manga.attributes.title,
      contentRating: manga.attributes.contentRating,
      publicationDemographic: manga.attributes.publicationDemographic,
      status: manga.attributes.status,
      description: manga.attributes.description,
      type: manga.type,
    }));

    req = null;
    mangaIds = null;
    manga = null;
    selectedManga = null;

    return returnedManga;
  } catch (error) {
    console.error("Error fetching carousel:", error);
    throw error;
  }
};

export const fetchTopListings = async () => {
  try {
    let [reqTopFollowed, reqTopRated] = await Promise.all([
      fetchJson<MDCol<MDChapter>>(
        "manga",
        { limit: 10, order: { followedCount: "desc" } },
        { next: { revalidate: 3600 } }
      ),
      fetchJson<MDCol<MDChapter>>(
        "manga",
        { limit: 10, order: { rating: "desc" } },
        { next: { revalidate: 3600 } }
      ),
    ]);

    const returnedTopFollowed: any = reqTopFollowed?.data?.map(
      (manga: any) => ({
        id: manga.id,
        title: manga.attributes.title,
      })
    );

    const returnedTopRated: any = reqTopRated?.data?.map((manga: any) => ({
      id: manga.id,
      title: manga.attributes.title,
    }));

    // Explicit garbage collection
    reqTopFollowed = null;
    reqTopRated = null;

    return { popular: returnedTopFollowed, topRated: returnedTopRated };
  } catch (error) {
    console.error("Error fetching top listings:", error);
    throw error;
  }
};
