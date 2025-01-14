"use client";

import { Input } from "@/components/ui/input";
import { parseAsString, useQueryState } from "nuqs";
import React from "react";

const SearchInput = () => {
  const [query, setQuery] = useQueryState(
    "query",
    parseAsString.withDefault("").withOptions({
      throttleMs: 600,
      shallow: false,
    })
  );

  return (
    <Input
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
      }}
      placeholder="Filter..."
    />
  );
};

export default SearchInput;
