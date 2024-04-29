
import { google } from 'googleapis';
import { adminIndexTwo } from './algoliaIndex';

const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.NEXT_PUBLIC_CHANNEL_ID;

const youtube = google.youtube({
   version: 'v3',
   auth: YOUTUBE_API_KEY,
 });

 const fetchVideos = async () => {
   try {
     const response = await youtube.search.list({
       part: 'snippet',
       channelId: CHANNEL_ID,
       maxResults: 20, // Change this as needed
       order: 'date',
     });
     const vidList = response.data.items;
     const newArray = vidList.map((item : any) => item.id.videoId ? ({
      title: item.snippet.title,
      objectID: item.id.videoId,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      brief: item.snippet.description,
      image : item.snippet.thumbnails.high.url
    }) : null);
    const validDataArray = newArray.filter((item:any) => item !== null)
    adminIndexTwo.replaceAllObjects(validDataArray).then(({ objectIDs }) => {
      console.log(objectIDs);
    });
   } catch (error) {
     console.error('Error fetching videos:', error);
   }
 };

 export {fetchVideos}
