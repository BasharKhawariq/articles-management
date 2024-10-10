"use client";

import { useEffect } from "react"
import useLayoutStore from "@/stores/useLayoutStore"
import useArticles from "@/stores/useArticles"

export default function page() {
  const { setLoading, setNotification } = useLayoutStore(); // For global notifications
  const { articles, fetchArticles } = useArticles();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchArticles();
      setLoading(false);
    };
    fetchData();
    console.log(articles)
  }, [fetchArticles, setLoading]);
  return (

    <div>
      
    </div>
  )
}

