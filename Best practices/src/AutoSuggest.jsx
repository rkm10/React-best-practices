import React, { useEffect, useState, useRef } from "react";

function AutoSuggest() {
  // State for managing input value and search results
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [show, setShow] = useState(false);
  // Cache to store previous search results and minimize API calls
  const [cache, setCache] = useState({});
  // Track currently selected item in suggestions list
  const [selectedIndex, setSelectedIndex] = useState(-1);
  // Refs for managing scroll behavior
  const listRef = useRef(null);
  const itemRefs = useRef([]); // Array of refs for each suggestion item

  // Fetch search results from API with debouncing
  const fetchData = async () => {
    if (!input.trim()) {
      setResults([]);
      return;
    }

    // Return cached results if available
    if (cache[input]) {
      setResults(cache[input]);
      return;
    }

    try {
      const response = await fetch(`https://dummyjson.com/recipes/search?q=${input}`);
      const data = await response.json();
      setResults(data?.recipes || []);
      // Cache the new results
      setCache((prev) => ({ ...prev, [input]: data.recipes || [] }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Handle keyboard navigation in suggestions list
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      // Move selection down, but not beyond last item
      setSelectedIndex((prev) => {
        const nextIndex = prev < results.length - 1 ? prev + 1 : prev;
        scrollToItem(nextIndex);
        return nextIndex;
      });
    } else if (e.key === "ArrowUp") {
      // Move selection up, but not above first item
      setSelectedIndex((prev) => {
        const prevIndex = prev > 0 ? prev - 1 : 0;
        scrollToItem(prevIndex);
        return prevIndex;
      });
    } else if (e.key === "Enter") {
      // Select current item on Enter
      if (selectedIndex !== -1 && results.length > 0) {
        setInput(results[selectedIndex].name);
        setShow(false);
        setSelectedIndex(-1);
      }
    }
  };

  // Scroll selected item into view
  const scrollToItem = (index) => {
    if (itemRefs.current[index]) {
      itemRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  // Debounce API calls using useEffect
  useEffect(() => {
    const timer = setTimeout(fetchData, 300);
    return () => clearTimeout(timer);
  }, [input]);

  return (
    <div className="auto-suggest-container">
      <h1>Auto Complete Search Bar</h1>
      <input
        className="auto-suggest"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setSelectedIndex(-1); // Reset selection when input changes
        }}
        onFocus={() => setShow(true)}
        onKeyDown={handleKeyDown}
      />

      {/* Show suggestions list when there are results and show is true */}
      {show && results.length > 0 && (
        <div className="auto-suggest-list" ref={listRef} style={{ maxHeight: "200px", overflowY: "auto" }}>
          {results.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => (itemRefs.current[index] = el)}
              className={`auto-suggest-list-item ${selectedIndex === index ? "selected" : ""}`}
              onMouseEnter={() => setSelectedIndex(index)}
              onMouseDown={() => {
                setInput(item.name);
                setShow(false);
                setSelectedIndex(-1);
              }}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AutoSuggest;
