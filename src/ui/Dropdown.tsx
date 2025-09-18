"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export default function Dropdown({
  items,
  search,
  setSearch,
  selected,
  setSelected,
  renderItem,
  renderSelected,
}: {
  items: string[]
  search: string
  setSearch: (value: string) => void
  selected: string
  setSelected: (value: string) => void
  renderItem: (item: string) => React.ReactNode
  renderSelected: (item: string) => React.ReactNode
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-64" ref={dropdownRef}>
      <button
        onFocus={() => setOpen(true)}
        className={cn("w-full flex justify-between items-center rounded-[8px] border bg-[#F9FAFB] px-[16px] py-[12px] shadow-sm hover:bg-gray-50 cursor-pointer text-[#999999]", open ? "border-[#666666] border-b-0 rounded-b-none" : "border-[#D1D5DB]")}
      >
        {renderSelected ? renderSelected(selected) : selected || "Оберіть ваше місто"}
        <svg
          className="ml-2 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 8l4 4 4-4" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute w-full rounded-b-[8px] border border-[#666666] bg-white shadow-lg z-10 pt-[10px] pb-[16px] ">
          <div className="px-[16px] pb-[12px]">
            <input
              type="text"
              placeholder="Пошук..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-[26px] rounded-[6px] border border-[#D1D5DB99] px-[8px] py-[4px] text-[14px] focus:outline-none focus:ring-1 focus:ring-[#666666]"
            />
          </div>
          <ul className="max-h-40 overflow-y-auto flex flex-col gap-[12px]">
            {items.length > 0 ? (
              items.map((item, i) => (
                <li
                  key={i}
                  onClick={() => {
                    setSelected(item);
                    setOpen(false);
                  }}
                  className="px-[16px] py-[3px] text-[14px] text-[#6B7280] leading-[150%] hover:bg-[#F5F5F5] cursor-pointer"
                >
                  {renderItem ? renderItem(item) : String(item)}
                </li>
              ))
            ) : (
              <li className="px-[16px] py-[3px] text-[14px] text-[#6B7280] leading-[150%]">Нічого не знайдено</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}