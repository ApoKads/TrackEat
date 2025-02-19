import React from "react";

function SearchBar({ searchTerm, setSearchTerm, filterType, setFilterType }) {
  return (
    <div className="flex flex-col w-full justify-center gap-2">
      <div className="w-full gap-4 flex justify-center items-center px-4 py-2">
        <div action="" className="w-full flex gap-2">
          <input
            type="text"
            value={searchTerm}
            placeholder="Search your schedules..."
            style={{ boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)" }}
            className="bg-background shadow-inner w-72 lg:w-96 p-2 rounded-lg focus:outline-none focus:placeholder-transparent focus:border-solid focus:border-slate-600 focus:border-2 transition duration-100 ease-in-out"
            onChange={(e) => {
              const value = e.target.value;
              setSearchTerm(value);
            }}
          />
          <button
            type="button"
            style={{ boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)" }}
            className="p-1 bg-background rounded-xl hover:scale-110 transition duration-300 ease-in-out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
              viewBox="0 0 50 50"
              width="50px"
              height="50px"
            >
              <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;