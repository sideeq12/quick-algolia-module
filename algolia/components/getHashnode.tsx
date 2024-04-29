import { gql, request } from 'graphql-request';
import { adminIndex } from './algoliaIndex';

const fetchPublication = async () => {
    const endpoint = 'https://gql.hashnode.com';

    const query = gql`
      query Publication($host: String!) {
        publication(host: $host) {
          title
          id
          posts(first: 10) {
            edges {
              node {
                title
                id
                url
                brief
                coverImage {
                  attribution
                  photographer
                }
                content {
                  text
                }
              }
            }
          }
        }
      }
    `;

    const variables = {
      host: "abcfoundationconnect.hashnode.dev"
    }
    try {
        const data = await request(endpoint, query, variables);
        const { publication : {
          posts :{
            edges
          }
        } } : any = data
        const newArray = edges.map((item : any) => ({
          title: item.node.title,
          objectID: item.node.id,
          url: item.node.url,
          brief: item.node.brief,
          image : item.node.coverImage == null ? item.node.coverImage : "https://images.unsplash.com/photo-1598620617137-2ab990aadd37?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }));
        adminIndex.replaceAllObjects(newArray).then(({ objectIDs }) => {
          console.log(objectIDs);
        });
        return edges;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
}

export { fetchPublication };