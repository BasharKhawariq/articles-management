"use client";

import { useEffect, useState } from "react";
import useArticles from "@/stores/useArticles";
import useLayoutStore from "@/stores/useLayoutStore";
import { FaSearch, FaExternalLinkAlt } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination"; // Import from your shadcn/ui Pagination

export default function Page() {
  const { articles, fetchArticles, pagination } = useArticles();
  const { setLoading } = useLayoutStore();
  const [currentPage, setCurrentPage] = useState(1); // Track the current page

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchArticles(currentPage); // Pass current page to fetchArticles
      setLoading(false);
    };
    fetchData();
  }, [fetchArticles, setLoading, currentPage]);

  const handleClick = (src) => {
    window.open(src, "_blank", "noopener,noreferrer");
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage); // Update the current page
  };

  return (
    <div className="p-3 h-full w-full bg-gray-100">
      <div className="w-full min-h-20 flex items-center bg-white rounded-t-md pl-2 font-semibold">
        <div className="w-full px-2 flex items-center justify-between">
          <span>Total Articles : {pagination?.totalData}</span>
          <div className="flex justify-center items-center gap-4 mr-4">
            <FaSearch />
            <IoFilter />
            <button
              type="button"
              className="text-sm py-2 rounded-md bg-gradient-to-b from-[#0BA5EC] to-[#3D5ED1] px-4 text-white"
            >
              Sync
            </button>
          </div>
        </div>
      </div>

      <div className="flex shadow-lg w-full h-[36rem] overflow-x-auto overflow-y-auto text-slate-700 bg-white rounded-lg">
        <table className="table-auto min-w-full">
          <thead className="shadow-md text-sm text-left sticky top-0 bg-white outline outline-2 outline-neutral-200">
            <tr>
              <th className="px-4 py-2 border-gray-300">NO</th>
              <th className="px-4 py-2 border-gray-300">FULLNAME</th>
              <th className="px-4 py-2 border-gray-300">CAPTION</th>
              <th className="px-4 py-2 border-gray-300">PUBLISH DATE</th>
              <th className="px-4 py-2 border-gray-300">ARTICLE SOURCE</th>
              <th className="px-4 py-2 border-gray-300">WEBSITE SOURCE</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => (
              <tr
                key={article.id}
                className="hover:bg-gray-100 text-xs sm:text-sm whitespace-nowrap"
              >
                <td className="p-5 text-left border-b">{index + 1}</td>
                <td className="p-5 text-left border-b">
                  <div className="flex flex-row items-center gap-2">
                    <Image
                      src={article.image}
                      width={50}
                      height={80}
                      className="rounded-md cursor-pointer"
                      onClick={() => handleClick(article.image)}
                    />
                    <span>{article.title}</span>
                  </div>
                </td>
                <td className="p-5 text-left border-b">{article.caption}</td>
                <td className="p-5 text-left border-b">
                  {formatDate(article.date)}
                </td>
                <td className="p-5 text-left border-b">
                  <div
                    className="flex flex-row items-center gap-2 cursor-pointer hover:text-blue-500"
                    onClick={() => handleClick(article.source_url)}
                  >
                    <span>{article.title}</span>
                    <FaExternalLinkAlt />
                  </div>
                </td>
                <td className="p-5 text-left border-b">
                  <div
                    className="flex flex-row items-center gap-2 cursor-pointer hover:text-blue-500"
                    onClick={() => handleClick(article.website?.url)}
                  >
                    <span>{article.website?.name}</span>
                    <FaExternalLinkAlt />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination using shadcn/ui */}
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationPrevious
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />

          {Array.from({ length: pagination?.totalPage || 1 }, (_, index) => {
            const pageNum = index + 1;
            return (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === pageNum}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationNext
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pagination?.totalPage}
          />
        </PaginationContent>
      </Pagination>
    </div>
  );
}
