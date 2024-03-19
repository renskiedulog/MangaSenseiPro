const baseUrl = "https://api.mangadex.org";

const makeRequest = async (
  endpoint: string,
  params?: object,
  filter?: object,
  options?: object
): Promise<any> => {
  try {
    let queryString = "";
    if (filter) {
      queryString = Object.entries(filter)
        .map(([key, value]) => `order[${key}]=${value}`)
        .join("&");
    }

    const url = `${baseUrl}/${endpoint}${queryString ? `?${queryString}` : ""}`;

    console.log("Request URL:", url); // Add this line for debugging

    const req = await fetch(url, options);
    const res = await req.json();

    return res;
  } catch (error) {
    console.error("Request failed:", error);
    return [];
  }
};

export default makeRequest;
