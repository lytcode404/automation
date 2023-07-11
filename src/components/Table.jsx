import React, { useState } from "react";
import Thead from "./Thead";
import Tbody from "./Tbody.jsx";
import Pagination from "./Pagination.jsx";
import Tr from "./Tr";

const Table = ({data}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the current page data
  const currentData = data.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // console.log(data, recipientsStatus)
  return (
    <div class="w-full overflow-hidden rounded-lg shadow-xs">
      <div class="w-full overflow-x-auto">
        <table class="w-full whitespace-no-wrap">
          <Thead />
          <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
            {currentData.map((item, index) => (
              <Tr
                key={index}
                name={item.email}
                status={item.status}
                
              />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalItems={data.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Table;
