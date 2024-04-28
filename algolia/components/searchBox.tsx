import { useState, useEffect } from "react";
import { index } from "./algoliaIndex";



const SearchPage = () => {
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<any[]>([]);
  
    useEffect(() => {
      const search = async () => {
        if (query.trim() !== '') {
          const { hits } = await index.search(query);
          setResults(hits);
        } else {
          setResults([]);
        }
      };
  
      search();
    }, [query]);
  
    return (
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
        />
        <ul>
          {results.map((hit) => (
            <li key={hit.objectID}>{hit.title}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default SearchPage;