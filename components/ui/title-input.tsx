"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";
import { cn } from "@/lib/utils";

interface TitleInputProps {
  value?: string;
  onChange: (value: string) => void;
  titleColor: string;
  onTitleColorChange: (color: string) => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
}

export function TitleInput({ 
  value = "", 
  onChange, 
  titleColor, 
  onTitleColorChange,
  placeholder = "Enter title...",
  className,
  error 
}: TitleInputProps) {
  const [showColorPicker, setShowColorPicker] = useState(false);

  const colors = [
    { name: "Black", value: "#000000", bg: "bg-black" },
    { name: "Blue", value: "#3B82F6", bg: "bg-blue-500" },
    { name: "Red", value: "#EF4444", bg: "bg-red-500" },
    { name: "Green", value: "#10B981", bg: "bg-green-500" },
    { name: "Purple", value: "#8B5CF6", bg: "bg-purple-500" },
    { name: "Orange", value: "#F97316", bg: "bg-orange-500" },
    { name: "Teal", value: "#14B8A6", bg: "bg-teal-500" },
    { name: "Pink", value: "#EC4899", bg: "bg-pink-500" },
  ];

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn("flex-1", error && "border-red-500", className)}
          style={{ color: titleColor }}
        />
        
        {/* Color Picker */}
        <div className="relative">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="h-10 px-3"
          >
            <Palette className="h-4 w-4" />
          </Button>
          
          {showColorPicker && (
            <div className="absolute top-full right-0 mt-1 bg-white border rounded-md shadow-lg p-2 z-10">
              <div className="grid grid-cols-4 gap-1">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => {
                      onTitleColorChange(color.value);
                      setShowColorPicker(false);
                    }}
                    className={cn(
                      "w-6 h-6 rounded border hover:scale-110 transition-transform",
                      color.bg,
                      titleColor === color.value && "ring-2 ring-blue-500 ring-offset-1"
                    )}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Preview */}
      {value && (
        <div className="text-sm text-gray-500">
          Preview: <span style={{ color: titleColor }}>{value}</span>
        </div>
      )}
    </div>
  );
}
