import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "@/constants";
import TableLoader from "./Loader";

const Hero = () => {
   const [torData, setTorData] = useState([]);
   const [search, setSearch] = useState("");
   const [searched, setSearched] = useState(false);
   const [isLoading, setLoading] = useState(false)

   const handleSearch = (e) => {
      e.preventDefault();
      setSearch(e.target.value);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true)
      try {
         const data = await axios.get(`${url}/api?search=${search}`);
         const response = await data.data;
         setTorData(response);
         setSearched(true);
      } catch (error) {
         console.log(error)
      }finally{
         setLoading(false)
      }
   };

   return (
      <>
         <section className="flex items-center flex-col justify-center w-full bg-zinc-800 px-4 min-h-screen pb-44 ">
            <div className="flex items-center flex-col justify-center pt-24 ">
               <h1 className="text-5xl font-palanquin text-white pb-10">Magnet Hunt</h1>
               <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center ">
                  <div className="relative ">
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           className="h-6 w-6 text-gray-400"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke="currentColor"
                        >
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-5.2-5.2" />
                           <circle cx="10" cy="10" r="7" />
                        </svg>
                     </div>
                     <input
                        type="text"
                        className="rounded-full font-montserrat pl-12 pr-4 py-2 bg-transparent text-slate-600 border border-gray-300 focus:outline-none focus:border-blue-500 text-xl"
                        placeholder="Search..."
                        onChange={handleSearch}
                     />
                  </div>
                  <button
                     type="submit"
                     className="w-32 my-4 text-white sm:w-36 flex items-center text-xs justify-center text-center  h-9 rounded-full  hover:brightness-110 bg-opacity-0 shadow-sm  mt-4 bg-gradient-to-t from-indigo-900 via-indigo-900 to-indigo-800"
                  >
                     {isLoading ?"Loading..":"Search"}
                  </button>
               </form>
            </div>
            {searched && !isLoading && torData !== null ? (
               torData.length > 0 ? (
                  <div className="max-w-full overflow-x-auto">
                     <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-slate-800 text-white">
                           <tr>
                              <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                 Title
                              </th>
                              <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                 Size
                              </th>
                              <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                 Magnet Link
                              </th>
                              <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                 Seeds
                              </th>
                              <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                 Leech
                              </th>
                              <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                 Upload Time
                              </th>
                           </tr>
                        </thead>
                        <tbody className="bg-slate-800 divide-y divide-gray-200">
                           {torData?.length ? (
                              torData.map((torrent, index) => (
                                 <tr key={index}>
                                    <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                                       <div className="text-xs text-white sm:text-sm">{torrent.Name}</div>
                                    </td>
                                    <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                                       <div className="text-xs text-white sm:text-sm">{torrent.Size}</div>
                                    </td>
                                    <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                                       <a href={torrent.Magnet} className="text-xs text-white hover:underline sm:text-sm">
                                          Magnet Link
                                       </a>
                                    </td>
                                    <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                                       <div className="text-xs text-white sm:text-sm">{torrent.Seeders}</div>
                                    </td>
                                    <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                                       <div className="text-xs text-white sm:text-sm">{torrent.Leechers}</div>
                                    </td>
                                    <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs text-white sm:text-sm">
                                       {torrent.UploadedBy}
                                    </td>
                                 </tr>
                              ))
                           ) : (
                              <tr>
                                 <td colSpan="6" className="px-4 py-2 text-center text-xs font-medium text-white">
                                    No data available.
                                 </td>
                              </tr>
                           )}
                        </tbody>
                     </table>
                  </div>
               ) : (
                  <div className="text-center text-white text-sm py-4">Nothing Found</div>
               )
            ) : isLoading ? <TableLoader/>:null}
            
         </section>
      </>
   );
};
export default Hero;
