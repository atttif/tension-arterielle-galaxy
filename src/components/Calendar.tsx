import * as React from "react";
import { Calendar as CalendarPrimitive } from "@/components/ui/calendar";
import { fr } from "date-fns/locale";

interface CalendarProps {
  selected: Date | null;
  onSelect: (date: Date | null) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ selected, onSelect }) => {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <CalendarPrimitive
        mode="single"
        selected={selected}
        onSelect={onSelect}
        locale={fr}
        className="rounded-md border"
      />
    </div>
  );
};