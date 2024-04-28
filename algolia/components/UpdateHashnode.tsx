import { gql, request } from 'graphql-request';
import { index } from './algoliaIndex';

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
      host: "abcfoundationconnect.hashnode.dev" // Replace with your publication host
    }
    try {
        const data = await request(endpoint, query, variables);
        const { publication : {
          posts :{
            edges
          }
        } } : any = data
        return edges;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
}

export { fetchPublication };