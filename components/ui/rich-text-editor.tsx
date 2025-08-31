"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bold, Type, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  rows?: number;
}

export function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = "Andika content hano...", 
  className,
  rows = 12 
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isBold, setIsBold] = useState(false);
  const [isBig, setIsBig] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      const selection = window.getSelection();
      const wasAtEnd = editorRef.current.innerHTML === value;
      
      editorRef.current.innerHTML = value;
      
      // Restore cursor position if it was at the end
      if (wasAtEnd && selection && selection.rangeCount > 0) {
        const newRange = document.createRange();
        newRange.selectNodeContents(editorRef.current);
        newRange.collapse(false); // collapse to end
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      const newValue = editorRef.current.innerHTML;
      if (newValue !== value) {
        onChange(newValue);
      }
    }
  };

  const formatText = (command: string, value?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    
    // Update button states
    setIsBold(document.queryCommandState('bold'));
    setIsBig(document.queryCommandState('fontSize'));
    
    // Trigger input event to update form value
    setTimeout(() => {
      handleInput();
    }, 0);
  };

  const makeBold = () => {
    formatText('bold');
  };

  const makeBig = () => {
    formatText('fontSize', '4');
  };

  const makeNormal = () => {
    formatText('fontSize', '3');
  };

  const changeColor = (color: string) => {
    formatText('foreColor', color);
    setShowColorPicker(false);
    
    // Trigger input event to update form value
    setTimeout(() => {
      handleInput();
    }, 0);
  };

  return (
    <div className={cn("border rounded-md", className)}>
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b bg-gray-50">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={makeBold}
          className={cn("h-8 px-2", isBold && "bg-blue-100 text-blue-700")}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={makeBig}
          className={cn("h-8 px-2", isBig && "bg-blue-100 text-blue-700")}
        >
          <Type className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={makeNormal}
          className="h-8 px-2 text-xs"
        >
          Normal
        </Button>
        
        {/* Color Picker */}
        <div className="relative">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="h-8 px-2"
          >
            <Palette className="h-4 w-4" />
          </Button>
          
          {showColorPicker && (
            <div className="absolute top-full left-0 mt-1 bg-white border rounded-md shadow-lg p-2 z-10">
              <div className="grid grid-cols-4 gap-1">
                <button
                  type="button"
                  onClick={() => changeColor('#000000')}
                  className="w-6 h-6 bg-black rounded border hover:scale-110 transition-transform"
                  title="Black"
                />
                <button
                  type="button"
                  onClick={() => changeColor('#3B82F6')}
                  className="w-6 h-6 bg-blue-500 rounded border hover:scale-110 transition-transform"
                  title="Blue"
                />
                <button
                  type="button"
                  onClick={() => changeColor('#EF4444')}
                  className="w-6 h-6 bg-red-500 rounded border hover:scale-110 transition-transform"
                  title="Red"
                />
                <button
                  type="button"
                  onClick={() => changeColor('#10B981')}
                  className="w-6 h-6 bg-green-500 rounded border hover:scale-110 transition-transform"
                  title="Green"
                />
                <button
                  type="button"
                  onClick={() => changeColor('#F59E0B')}
                  className="w-6 h-6 bg-yellow-500 rounded border hover:scale-110 transition-transform"
                  title="Yellow"
                />
                <button
                  type="button"
                  onClick={() => changeColor('#8B5CF6')}
                  className="w-6 h-6 bg-purple-500 rounded border hover:scale-110 transition-transform"
                  title="Purple"
                />
                <button
                  type="button"
                  onClick={() => changeColor('#F97316')}
                  className="w-6 h-6 bg-orange-500 rounded border hover:scale-110 transition-transform"
                  title="Orange"
                />
                <button
                  type="button"
                  onClick={() => changeColor('#06B6D4')}
                  className="w-6 h-6 bg-cyan-500 rounded border hover:scale-110 transition-transform"
                  title="Cyan"
                />
              </div>
            </div>
          )}
        </div>
      </div>

             {/* Editor */}
       <div
         ref={editorRef}
         contentEditable
         onInput={handleInput}
         onBlur={handleInput}
         onKeyUp={handleInput}
         className="p-3 min-h-[200px] focus:outline-none focus:ring-0"
         style={{ 
           minHeight: `${rows * 1.5}rem`,
           lineHeight: '1.5'
         }}
         data-placeholder={placeholder}
         suppressContentEditableWarning
       />
      
      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
