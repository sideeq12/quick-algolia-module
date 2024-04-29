import algoliasearch from 'algoliasearch';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const userId = process.env.NEXT_PUBLIC_USER_ID;

const adminKey = process.env.NEXT_PUBLIC_ADMIN;
// Connect and authenticate with your Algolia app
const client = algoliasearch(API_KEY!, userId!);
const index = client.initIndex('test');
const indexTwo = client.initIndex('youtube');
const adminClient = algoliasearch(API_KEY!, adminKey!);
const adminIndex = adminClient.initIndex('test');
const adminIndexTwo = adminClient.initIndex('youtube');

export { index, adminIndex, indexTwo,adminIndexTwo };