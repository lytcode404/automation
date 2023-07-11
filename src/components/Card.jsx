import React from "react";

const Card = ({icon, heading, subHeading}) => {
  return (
    <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
      {icon}
      <div>
        <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
          {heading}
        </p>
        <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
          {subHeading}
        </p>
      </div>
    </div>
  );
};

export default Card;
