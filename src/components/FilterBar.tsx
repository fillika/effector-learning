import React from "react";

export const FilterBar: React.FC<{
  filterHadler: React.Dispatch<React.SetStateAction<string>>;
}> = React.memo(({ filterHadler }) => {
  return (
    <div>
      <button onClick={() => filterHadler("All")}>All</button>
      <button onClick={() => filterHadler("Active")}>Active</button>
      <button onClick={() => filterHadler("Done")}>Done</button>
    </div>
  );
});
