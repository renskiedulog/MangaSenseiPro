import { redirect } from "next/navigation";
import { getRandomManga } from '../../utils/requests';

const page = async () => {
  const randomManga = await getRandomManga();
  redirect(`/${randomManga}`);

  return <></>
};

export default page;
