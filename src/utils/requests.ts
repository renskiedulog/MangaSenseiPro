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

const baseUrl = "https://api.mangadex.org/";

export const fetchJson = async <T = any>(
  endpoint: string,
  params = {},
  config = {}
): Promise<T> => {
  const serializeParameters = (params: any) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]: any) => {
      if (Array.isArray(value)) {
        value.forEach((val) => searchParams.append(`${key}[]`, val));
      } else if (typeof value === "object") {
        Object.entries(value).forEach(([k, v]: any) =>
          searchParams.append(`${key}[${k}]`, v)
        );
      } else {
        searchParams.append(key, value);
      }
    });
    return searchParams.toString();
  };

  const mergedParams = { ...params };

  const url = new URL(`${baseUrl}${endpoint}`);
  const serializedParams = serializeParameters(mergedParams);
  url.search = serializedParams;

  try {
    const res = await fetch(url, config);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const fetchCovers = async (
  ids: string[],
  order = {},
  offset = 0,
  limit = 100
): Promise<MDCol<MDManga>> => {
  return fetchJson<MDCol<MDManga>>(
    "manga",
    {
      ids: ids,
      order,
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

export const fetchCover = async (image: string): Promise<string> => {
  try {
    const response = await fetch(image, { cache: "force-cache" });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch image (${response.status}): ${response.statusText}`
      );
    }

    const buffer = await response.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");
    const imageSrc = `data:image/jpeg;base64,${base64Image}`;
    return imageSrc;
  } catch (error) {
    console.error("Error fetching image:", error);
    throw error;
  }
};

const fetchLatestChapters = async (
  offset = 0,
  limit = 100
): Promise<MDCol<MDChapter>> => {
  return fetchJson<MDCol<MDChapter>>(
    "manga",
    {
      offset,
      limit,
      order: { updatedAt: "desc" },
    },
    { next: { revalidate: 60 } }
  );
};

export const getLatestManga = async (): Promise<any[]> => {
  try {
    const latest = await fetchLatestChapters(0, 60);
    const latestIds: any = latest?.data.map((k: any) => k.id);
    const covers = await fetchCovers(latestIds, { updatedAt: "desc" });

    const returnedManga = await Promise.all(
      covers?.data?.map(async (k: any) => ({
        id: k?.id,
        updatedAt: k?.attributes?.updatedAt,
        cover: await fetchCover(
          `https://uploads.mangadex.org/covers/${k?.id}/${
            k?.relationships?.find((t: any) => t?.type === "cover_art")
              ?.attributes?.fileName
          }.256.jpg`
        ),
        title:
          k?.attributes?.title?.en ||
          k?.attributes?.title?.["ja-ro"] ||
          k?.attributes?.title?.ja,
      })) || []
    );

    return returnedManga;
  } catch (error) {
    console.error("Error in getLatestManga:", error);
    throw error;
  }
};

export const searchManga = async (search: string): Promise<any[]> => {
  try {
    const searched = await fetchJson("manga", { title: search });
    const searchedIds: any = searched?.data.map((k: any) => k.id);
    const covers = await fetchCovers(searchedIds, { updatedAt: "desc" });

    const returnedManga = await Promise.all(
      covers?.data?.map(async (k: any) => ({
        id: k?.id,
        updatedAt: k?.attributes?.updatedAt,
        cover: await fetchCover(
          `https://uploads.mangadex.org/covers/${k?.id}/${
            k?.relationships?.find((t: any) => t?.type === "cover_art")
              ?.attributes?.fileName
          }.256.jpg`
        ),
        title:
          k?.attributes?.title?.en ||
          k?.attributes?.title?.["ja-ro"] ||
          k?.attributes?.title?.ja,
      })) || []
    );

    return returnedManga;
  } catch (error) {
    console.error("Error in getLatestManga:", error);
    throw error;
  }
};

export const Carousel = async (): Promise<any[]> => {
  try {
    const randomOffset = Math.floor(Math.random() * 200);
    const req = await fetchJson<MDCol<MDChapter>>(
      "manga",
      {
        offset: randomOffset,
        limit: 20,
        order: { followedCount: "desc", rating: "desc" },
      },
      { cache: "no-store" }
    );

    const mangaIds: any = req?.data?.map((m) => m?.id);
    const manga: any = await fetchCovers(mangaIds);

    const getRandomManga = (mangaData: MDCol, count: number) => {
      const shuffledManga: any = mangaData?.data?.sort(
        () => Math.random() - 0.5
      );
      return shuffledManga.slice(0, count);
    };

    const selectedManga = getRandomManga(manga, 6);

    const returnedManga = await Promise.all(
      selectedManga.map(async (manga: any) => ({
        id: manga.id,
        tags: manga.attributes.tags,
        cover: await fetchCover(
          `https://uploads.mangadex.org/covers/${manga.id}/${
            manga.relationships.find((t: any) => t.type === "cover_art")
              .attributes.fileName
          }.256.jpg`
        ),
        title: manga.attributes.title.en || manga?.attributes?.title?.["ja-ro"],
        contentRating: manga.attributes.contentRating,
        publicationDemographic: manga.attributes.publicationDemographic,
        status: manga.attributes.status,
        description: manga.attributes.description.en,
        type: manga.type,
      }))
    );

    return returnedManga;
  } catch (error) {
    console.error("Error in Carousel:", error);
    throw error;
  }
};

export const fetchTopListings = async (): Promise<{
  popular: any[];
  topRated: any[];
  topRead: any[];
}> => {
  try {
    const [reqTopFollowed, reqTopRated, reqTopRead] = await Promise.all([
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
      fetchJson<MDCol<MDChapter>>(
        "manga",
        {
          limit: 10,
          order: {
            updatedAt: "desc",
            rating: "desc",
            followedCount: "desc",
          },
        },
        { next: { revalidate: 60 } }
      ),
    ]);

    const extractData = (data: any): any[] =>
      data?.map((manga: any) => ({
        id: manga.id,
        title: manga.attributes.title.en || manga?.attributes?.title?.["ja-ro"],
      })) || [];

    const popular = extractData(reqTopFollowed?.data);
    const topRated = extractData(reqTopRated?.data);
    const topRead = extractData(reqTopRead?.data);

    return { popular, topRated, topRead };
  } catch (error) {
    console.error("Error in fetchTopListings:", error);
    throw error;
  }
};

export const getFeaturedManga = async (): Promise<any> => {
  try {
    const randomOffset = Math.floor(Math.random() * 100);
    const req = await fetchJson<MDCol<MDChapter>>(
      "manga",
      {
        offset: randomOffset,
        limit: 20,
        order: { followedCount: "desc", rating: "desc" },
      },
      { cache: "force-cache" }
    );

    const randomIndex = Math.floor(Math.random() * 20);
    const mangaId: any = req?.data[randomIndex]?.id;
    const manga: any = await fetchCovers([mangaId]);

    const returnedManga =
      (await Promise.all(
        manga?.data?.map(async (manga: any) => ({
          id: manga.id,
          tags: manga.attributes.tags,
          cover: await fetchCover(
            `https://uploads.mangadex.org/covers/${manga.id}/${
              manga.relationships.find((t: any) => t.type === "cover_art")
                .attributes.fileName
            }.256.jpg`
          ),
          title:
            manga.attributes.title.en || manga?.attributes?.title?.["ja-ro"],
          contentRating: manga.attributes.contentRating,
          publicationDemographic: manga.attributes.publicationDemographic,
          status: manga.attributes.status,
          description: manga.attributes.description.en,
          type: manga.type,
        }))
      )) || [];

    const featuredWithDate = {
      manga: returnedManga[0],
      date: new Date().toISOString().split("T")[0],
    };

    return featuredWithDate;
  } catch (error) {
    console.error("Error in getFeaturedManga:", error);
    throw error;
  }
};

export const getMangaInfo = async (id: string): Promise<any> => {
  const manga: any = await fetchCovers([id]);

  const returnedManga: any = await Promise.all(
    manga?.data?.map(async (manga: any) => ({
      id: manga.id,
      tags: manga.attributes.tags,
      cover: await fetchCover(
        `https://uploads.mangadex.org/covers/${manga.id}/${
          manga.relationships.find((t: any) => t.type === "cover_art")
            .attributes.fileName
        }.256.jpg`
      ),
      title:
        manga.attributes.title.en ||
        manga?.attributes?.title["ja-ro"] ||
        manga?.attributes?.title?.ja,
      author: manga?.relationships.filter((t: any) => t.type === "author")[0],
      artist: manga?.relationships.filter((t: any) => t.type === "artist")[0],
      contentRating: manga.attributes.contentRating,
      publicationDemographic: manga.attributes.publicationDemographic,
      status: manga.attributes.status,
      updatedAt: manga.attributes.updatedAt,
      description: manga.attributes.description.en,
      type: manga.type,
    })) || []
  );

  const response = await fetchJson(
    `statistics/manga/${id}`,
    {},
    { cache: "force-cache" }
  );

  const suggested = await getSuggested(manga?.data[0].attributes?.tags);

  return {
    mangaInfo: returnedManga[0],
    mangaStats: response?.statistics[id],
    suggested: suggested,
  };
};

export const getChapters = async (mangaId: string) => {
  let page = 1;
  const allChapters = [];

  while (true) {
    const response = await fetchJson(
      `/manga/${mangaId}/feed`,
      {
        translatedLanguage: ["en"],
        limit: 500,
        offset: (page - 1) * 500,
        order: { chapter: "desc" },
      },
      { next: { revalidate: 60 } }
    );

    const mangaChapters = response?.data;
    const newChapters: any = [];
    const seenChapterNumbers = new Set();

    mangaChapters?.map((chapter: any) => {
      const chapterNumber = parseInt(chapter.attributes.chapter);
      const pages = chapter.attributes.pages;

      if (pages > 0 && !seenChapterNumbers.has(chapterNumber)) {
        newChapters.push(chapter);
        seenChapterNumbers.add(chapterNumber);
      }
    });

    if (mangaChapters && mangaChapters.length > 0) {
      allChapters.push(...newChapters);
      page++;
    } else {
      break; // No more chapters to fetch
    }
  }

  const extractedChapters = await Promise.all(
    allChapters?.map(async (chapter: any) => ({
      id: chapter?.id,
      title: chapter?.attributes?.title,
      chapter: chapter?.attributes?.chapter,
      pages: chapter?.attributes?.pages,
      createdAt: chapter?.attributes?.createdAt,
      scanlationGroup: chapter?.relationships?.filter(
        (t: any) => t.type === "scanlation_group"
      )[0]?.id
        ? await getScanlation(
            chapter?.relationships?.filter(
              (t: any) => t.type === "scanlation_group"
            )[0]?.id
          )
        : [],
    })) || []
  );

  return extractedChapters;
};

const getScanlation = async (id: string) => {
  const req = await fetchJson(`group/${id}`, {}, { cache: "force-cache" });

  return req?.data?.attributes?.name;
};

export const getRandomManga = async () => {
  const req: any = await fetchJson("manga/random", {}, { cache: "no-store" });
  return req?.data?.id;
};

export const getSuggested = async (tags: any) => {
  const ids: any = [];
  let mangas: any = [];

  for (let i = 0; i <= 5; i++) {
    let randIndex = Math.floor(Math.random() * tags?.length);
    ids?.push(tags[randIndex].id);
  }

  const res = await fetchJson("manga", { includedTags: ids, limit: 20 });
  for (let i = 0; i <= res?.data?.length; i++) {
    let randIndex = Math.floor(Math.random() * res?.data?.length);
    if (randIndex !== -1 && mangas?.length < 6) {
      mangas?.push(res?.data[randIndex]);
      res?.data?.splice(randIndex, 1); // Remove the selected item from res.data
    }
  }

  const mangaIds = mangas?.map((k: any) => k.id) || [];
  const mangaWithCover: any = (await fetchCovers(mangaIds)) || [];

  const returnedManga = await Promise.all(
    mangaWithCover?.data?.map(async (k: any) => ({
      id: k?.id,
      updatedAt: k?.attributes?.updatedAt,
      cover: await fetchCover(
        `https://uploads.mangadex.org/covers/${k?.id}/${
          k?.relationships?.find((t: any) => t?.type === "cover_art")
            ?.attributes?.fileName
        }.256.jpg`
      ),
      title: k?.attributes?.title?.en || k?.attributes?.title?.["ja-ro"],
    })) || []
  );

  return returnedManga;
};

export const getMangaNameAndTag = async (id: string) => {
  const manga = await fetchCovers([id]);
  const title =
    manga?.data[0]?.attributes?.title.en ||
    manga?.data[0]?.attributes?.title["ja-ro"] ||
    manga?.data[0]?.attributes?.title?.ja;

  const tags = manga?.data[0]?.attributes?.tags;
  return { title, tags };
};

export const getChapterImages = async (chapterId: string) => {
  try {
    const req = await fetchJson(`at-home/server/${chapterId}`);
    return req;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const generateChapterImages = async (images: string[], hash: string) => {
  const generatedImages = await Promise.all(
    images.map(async (image: string) => {
      try {
        return await fetchCover(
          `https://uploads.mangadex.org/data-saver/${hash}/${image}`
        );
      } catch (error) {
        return null;
      }
    })
  );

  return generatedImages;
};
