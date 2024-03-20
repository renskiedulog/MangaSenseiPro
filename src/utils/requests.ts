const baseUrl = "https://api.mangadex.dev";

interface Params {
  [key: string]: any;
}

interface Filter {
  [key: string]: any;
}

export const makeRequest = async (
  endpoint: string,
  params: Params = {},
  filter: Filter = {},
  config: Object = { cache: "no-store" }
): Promise<any> => {
  const url = new URL(`${baseUrl}${endpoint}`);
  Object.keys(params).forEach((key) => {
    // Check if the parameter is an array and format accordingly
    if (Array.isArray(params[key])) {
      params[key].forEach((value: any) =>
        url.searchParams.append(`${key}[]`, value)
      );
    } else {
      url.searchParams.append(key, params[key]);
    }
  });

  const order = { ...filter };
  for (const [key, value] of Object.entries(order)) {
    url.searchParams.append(`order[${key}]`, value);
  }

  try {
    const res = await fetch(url, config);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res?.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};

export const getFilter = async (filter: string) => {
  const includedTagNames = [filter];
  const tags = await makeRequest("/manga/tag");
  const includedTagIDs = tags?.data?.data
    .filter((tag: any) => includedTagNames.includes(tag.attributes.name.en))
    .map((tag: any) => tag.id);

  return includedTagIDs;
};

export const fetchCoverImages = async (array: any[], config: Object = {}) => {
  const coverImages = await Promise.all(
    array.flatMap(async (manga) => {
      const coverRelationships = manga?.relationships?.filter(
        (rel: any) => rel.type === "cover_art"
      );
      const coverPromises = coverRelationships
        ? coverRelationships.map(async (rel: any) => {
            const response = await makeRequest(
              `/cover/${rel?.id}`,
              {},
              {},
              config
            );
            const coverUrl = `https://uploads.mangadex.org/covers/${manga.id}/${response?.data?.attributes?.fileName}.256.jpg`;

            Object.assign(manga, { cover: coverUrl });
            return manga;
          })
        : [];
      return Promise.all(coverPromises);
    })
  );

  return coverImages.flat();
};

export const fetchTopMangas = async () => {
  try {
    const popularReq = await makeRequest(
      "/manga",
      { limit: 10 },
      { followedCount: "desc" },
      { cache: "force-cache" }
    );
    const popularCover = await fetchCoverImages(popularReq?.data);
    const popularStats = await fetchStats(popularReq?.data);

    const popular = { stats: popularStats, manga: popularCover };

    const topRatedReq = await makeRequest(
      "/manga",
      { limit: 10 },
      { rating: "desc" },
      { cache: "force-cache" }
    );
    const topRatedCover = await fetchCoverImages(topRatedReq?.data);
    const topRatedStats = await fetchStats(topRatedReq?.data);

    const topRated = { stats: topRatedStats, manga: topRatedCover };

    return { popular, topRated };
  } catch (err) {
    console.log(err);
  }
};

export const fetchStats = async (array: any[]) => {
  const stats = await Promise.all(
    array.map(async (manga) => {
      const response = await makeRequest(`/statistics/manga/${manga?.id}`);
      return response?.statistics[manga?.id];
    })
  );

  return stats;
};

export const fetchMangaInfo = async (mangaId: string) => {
  const req = await makeRequest(`/manga/${mangaId}`);
  const cover = await fetchCoverImages([req.data]);
  const stats = await makeRequest(`/statistics/manga/${mangaId}`);

  Object?.assign(cover[0], { stats: stats?.statistics[mangaId] });
  return cover[0];
};

export function timeAgo(dateString: string) {
  const providedDate: any = new Date(dateString);
  const now: any = new Date();

  const timeDifferenceInSeconds = Math.floor((now - providedDate) / 1000);

  if (providedDate > now) {
    return null;
  }

  if (timeDifferenceInSeconds < 60) {
    return `${timeDifferenceInSeconds} second${
      timeDifferenceInSeconds !== 1 ? "s" : ""
    } ago`;
  } else if (timeDifferenceInSeconds < 3600) {
    const minutesAgo = Math.floor(timeDifferenceInSeconds / 60);
    return `${minutesAgo} minute${minutesAgo !== 1 ? "s" : ""} ago`;
  } else if (timeDifferenceInSeconds < 86400) {
    const hoursAgo = Math.floor(timeDifferenceInSeconds / 3600);
    return `${hoursAgo} hour${hoursAgo !== 1 ? "s" : ""} ago`;
  } else if (timeDifferenceInSeconds < 2592000) {
    // Less than 30 days (approx. a month)
    const daysAgo = Math.floor(timeDifferenceInSeconds / 86400);
    return `${daysAgo} day${daysAgo !== 1 ? "s" : ""} ago`;
  } else if (timeDifferenceInSeconds < 31536000) {
    // Less than 365 days (approx. a year)
    const monthsAgo = Math.floor(timeDifferenceInSeconds / 2592000);
    return `${monthsAgo} month${monthsAgo !== 1 ? "s" : ""} ago`;
  } else {
    const yearsAgo = Math.floor(timeDifferenceInSeconds / 31536000);
    return `${yearsAgo} year${yearsAgo !== 1 ? "s" : ""} ago`;
  }
}

export const Carousel = async () => {
  const req = await makeRequest(
    "/manga",
    { limit: 100 },
    { followedCount: "desc" },
    { cache: "no-store" }
  );

  const array = [];
  for (let i = 0; i <= 6; i++) {
    if (req?.length === 0) break;
    const randomIndex: any = Math.floor(Math.random() * req?.data?.length);
    array.push(req?.data[randomIndex]);
    req.data.splice(randomIndex, 1);
  }

  const mangas = await fetchCoverImages(array, { cache: "no-store" });

  return mangas;
};

export const getRandomManga = async () => {
  const randomManga = await makeRequest("/manga/random");
  const id = await randomManga?.data?.id;
  return id;
};

export const fetchAllChapters = async (mangaId: string) => {
  let page = 1;
  const allChapters = [];

  while (true) {
    const response = await makeRequest(
      `/manga/${mangaId}/feed`,
      {
        translatedLanguage: ["en"],
        limit: 500,
        offset: (page - 1) * 500,
      },
      {
        chapter: "desc",
      }
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
  return allChapters;
};

export const getChapterImages = async (chapterId: string) => {
  const req = await makeRequest(
    `/at-home/server/${chapterId}`,
    {},
    {},
    { cache: "force-cache" }
  );
  return req;
};
