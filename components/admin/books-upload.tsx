"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { TitleInput } from "@/components/ui/title-input";
import { toast } from "sonner";

const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  titleColor: z.string().default("#000000"),
  imageUrl: z.string().url("Please enter a valid image URL"),
  content: z.string().min(10, "Content must be at least 10 characters long"),
});

type BookFormData = z.infer<typeof bookSchema>;

export function BooksUpload() {
  const [isLoading, setIsLoading] = useState(false);
  const [titleColor, setTitleColor] = useState("#000000");
  const { register, handleSubmit, reset, control, setValue, formState: { errors } } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      titleColor: "#000000"
    }
  });

  const onSubmit = async (data: BookFormData) => {
    try {
      setIsLoading(true);
      
      console.log('Submitting book data:', data);
      
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          createdAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to upload book');
      }

      const result = await response.json();
      console.log('Book uploaded successfully:', result);
      
      toast.success("Book uploaded successfully!");
      reset();
      
    } catch (error) {
      console.error('Error uploading book:', error);
      toast.error("Failed to upload book. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Upload New Book</CardTitle>
        <CardDescription>
          Add a new book to the Ibitabo collection
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Book Title</Label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TitleInput
                  value={field.value}
                  onChange={field.onChange}
                  titleColor={titleColor}
                  onTitleColorChange={(color) => {
                    setTitleColor(color);
                    setValue("titleColor", color);
                  }}
                  placeholder="Enter book title"
                  error={!!errors.title}
                />
              )}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Cover Image URL</Label>
            <Input
              id="imageUrl"
              placeholder="https://example.com/book-cover.jpg"
              {...register("imageUrl")}
              className={errors.imageUrl ? "border-red-500" : ""}
            />
            {errors.imageUrl && (
              <p className="text-sm text-red-500">{errors.imageUrl.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Book Content</Label>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <RichTextEditor
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Enter the full book content here..."
                  rows={12}
                  className={errors.content ? "border-red-500" : ""}
                />
              )}
            />
            {errors.content && (
              <p className="text-sm text-red-500">{errors.content.message}</p>
            )}
            <p className="text-xs text-gray-500">
              Koresha ibintu byo guhindura inyandiko: <strong>B</strong> kugira ngo ubone inyandiko, <strong>T</strong> kugira ngo ubone inyandiko nini, <strong>🎨</strong> kugira ngo uhindure ibara ry'inyandiko.
            </p>
          </div>

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Uploading..." : "Upload Book"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
