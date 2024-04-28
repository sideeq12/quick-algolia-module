import algoliasearch from 'algoliasearch';

const client = algoliasearch('APW4RXIUMQ', '7fa983b785f148a1f97fda180c82bf7c');
const index = client.initIndex('test');

export { index };