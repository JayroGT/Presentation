import React, { useState } from 'react';

export const ButtonList = ({ categories, filterCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    filterCategory(category);
    setSelectedCategory(category);
  };

  return (
    <div className="flex overflow-x-auto overflow-y-hidden border-b border-gray-200 whitespace-nowrap dark:border-gray-200">
      {categories.map((category, i) => (
        <button
          key={i}
          type="button"
          onClick={() => handleCategoryClick(category)}
          className={`inline-flex items-center h-10 px-4 -mb-px text-sm text-center 
            ${selectedCategory === category ? 'text-blue-700 border-b-2 border-blue-500' : 'text-black border-b-2 border-transparent'}
          } sm:text-base dark:text-black whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

//se agrega nuevo diseño