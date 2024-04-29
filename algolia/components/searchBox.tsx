"use client"

import { useState, useEffect } from "react";
import { index , indexTwo} from "./algoliaIndex";
import Link from "next/link";



const SearchPage = () => {
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<any[]>([]);
    const [showInput,setShowInput ] = useState<boolean>(true)

    useEffect(() => {
      const search = async () => {
        if (query.trim() !== '') {
          try {
            // Perform search query on both indices
            const [result1, result2] = await Promise.all([
              index.search(query),
              indexTwo.search(query)
            ]);
  
            // Combine the results from both indices
            const combinedResults = [...result1.hits, ...result2.hits];
            setResults(combinedResults);
            console.log("res", combinedResults)
          } catch (error) {
            console.error('Error performing search:', error);
          }
        } else {
          setResults([]);
        }
      };
  
      search();
    }, [query]);
  
    return (
   <div className="relative pt-16">
    <div className="absolute h-screen w-screen top-0 left-0 bg-black opacity-30" onClick={()=>{setShowInput(false)}}>
    </div>
       {showInput && <div className="relative bg-white w-5/6 md:w-1/2 mx-auto p-10 rounded-lg drop-shadow-lg">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="w-full h-16 outline-none "
        />
        <div className="flex flex-col space-y-3">
          {results.map((hit, idx) => (
            <div key={hit.objectID} className="flex justify-start align-middle   border-t border-gray-500">
               <div className="py-3">
                <h6 className="font-semibold text-base mb-2">{hit.title}</h6>
                <p className="text-xs mb-3">{hit.brief}</p>
                { idx%2 ==0 ?<Link href={hit.url} target="_blank" className="px-6 py-1 text-xs ml-auto
                 text-white bg-blue-600">{"Read article"}</Link> :
                  <Link href={hit.url} target="_blank" className="px-6 py-1 text-xs
                 text-white bg-red-600 flex w-fit  gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16"
                  height="16" fill="currentColor" className="bi bi-youtube" viewBox="0 0 16 16">
                 <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"/>
               </svg>
              <span> watch video</span></Link>}
                </div> 
            </div>
          ))}
        </div>
      </div>}
   </div>
    );
  };
  
  export default SearchPage;