"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

// WARNING: Any component using this hook MUST be wrapped in a <Suspense> boundary 
// when rendered in a server component (like app/products/page.tsx), or the Vercel build will fail.
export function useProductFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const getQuery = useCallback((key: string) => searchParams.get(key) || "", [searchParams]);
  const getAllQuery = useCallback((key: string) => searchParams.getAll(key), [searchParams]);

  const setFilter = useCallback(
    (key: string, value: string | string[] | null) => {
      const params = new URLSearchParams(searchParams.toString());
      
      if (value === null || (Array.isArray(value) && value.length === 0) || value === "") {
        params.delete(key);
      } else if (Array.isArray(value)) {
        params.delete(key);
        value.forEach((v) => params.append(key, v));
      } else {
        params.set(key, value);
      }
      
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  return {
    searchQuery: getQuery("q"),
    sort: getQuery("sort") || "featured",
    flavors: getAllQuery("flavor"),
    setFilter,
  };
}