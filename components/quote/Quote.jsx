import React from "react";

function Quote({ data }) {
  return (
    <div className="flex justify-center mt-0 mb-0 sm:my-10 mb-10">
      <a
        href="#"
        className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {data.text}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {data.author}
          </p>
        </div>
      </a>
    </div>
  );
}

export default Quote;
