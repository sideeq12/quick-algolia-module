

import SearchPage from "../../components/searchBox";
import { fetchVideos } from "../../components/updateAlgolia";
import { fetchPublication } from "../../components/getHashnode";

export default async function Home() {

fetchPublication()
fetchVideos()
  return (
    <main>
  <SearchPage />
    </main>
  );
}
