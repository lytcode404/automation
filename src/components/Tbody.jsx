import React from "react";
import Tr from "./Tr.jsx"


const Tbody = () => {
  return (
    <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
      {data.map((item, index) => (
        <Tr
          key={index}
          name={item.name}
          role={item.role}
          amount={item.amount}
          status={item.status}
          date={item.date}
          imageSrc={item.avatarSrc}
        />
      ))}
    </tbody>
  );
};

export default Tbody;
