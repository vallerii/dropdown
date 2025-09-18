"use client";
import Dropdown from "@/ui/Dropdown";
import { useState } from "react";

export default function DropdownComponent() {
  const items = ["Item 1", "Item 2", "Item 3"];
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("");

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative flex w-full h-screen justify-center items-center">
      <Dropdown 
        items={filteredItems} 
        search={search} 
        setSearch={setSearch} 
        selected={selected} 
        setSelected={setSelected}
        renderItem={(item) => (
          <span className="text-[#333333]">
            <span>{item}</span>
          </span>
        )}
        renderSelected={(item) =>
          item ? (
            <span className="text-[#333333]">
              <span>{item}</span>
            </span>
          ) : (
            "Оберіть ваше місто"
          )
        }
      />
    </div>
  );
}
