import React, { useState } from 'react'

export default function Tabs({ tabs }) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div>
      <div className="flex border-b border-gray-300 dark:border-gray-700">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            onClick={() => setActiveIndex(index)}
            className={`px-4 py-2 -mb-px font-semibold border-b-2 ${
              index === activeIndex
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-blue-600'
            } focus:outline-none`}
            aria-selected={index === activeIndex}
            role="tab"
            tabIndex={index === activeIndex ? 0 : -1}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-4" role="tabpanel">
        {tabs[activeIndex].content}
      </div>
    </div>
  )
}
