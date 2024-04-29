import { useState, useEffect } from "react";
import { index } from "./algoliaIndex";
import Link from "next/link";



const SearchPage = () => {
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<any[]>([]);
    const [showInput,setShowInput ] = useState<boolean>(true)
  
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
          {results.map((hit) => (
            <div key={hit.objectID} className="flex justify-start align-middle   border-t border-gray-500">
               <div className="py-3">
                <h6 className="font-semibold text-base mb-2">{hit.title}</h6>
                <p className="text-xs mb-3">{hit.brief}</p>
                <Link href={""} target="_blank" className="px-6 py-1 text-xs ml-auto
                 text-white bg-blue-600">{"Read article"}</Link>
                </div> 
            </div>
          ))}
        </div>
      </div>}
   </div>
    );
  };
  
  export default SearchPage;