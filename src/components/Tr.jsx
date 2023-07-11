import React from "react";

const Tr = ({ name, status }) => {
  return (
    <tr class="text-gray-700 dark:text-gray-400">
      <td class="px-4 py-3">
        <div class="flex items-center text-sm">
          {/* <!-- Avatar with inset shadow --> */}
          <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
            <div className="w-full h-full rounded-full flex justify-center items-center text-2xl font-bold text-gray-500 uppercase">{name.charAt(0)}</div>
            <div
              class="absolute inset-0 rounded-full shadow-inner"
              aria-hidden="true"
            ></div>
          </div>
          <div>
            <p class="font-semibold">{name}</p>
          </div>
        </div>
      </td>
      <td class="px-4 py-3 text-xs">
        <span className={`px-2 py-1 font-semibold leading-tight text-green-700  rounded-full ${status==="Approved"?"bg-green-100": "bg-red-100"}`}>
         {status}
        </span>
      </td>
    </tr>
  );
};

export default Tr;
