"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { TitleInput } from "@/components/ui/title-input";
import { toast } from "sonner";

const dailySongSchema = z.object({
  title: z.string().min(1, "Title is required"),
  titleColor: z.string().default("#000000"),
  youtubeUrl: z.string().url("Please enter a valid YouTube URL").min(1, "YouTube URL is required"),
});

type DailySongFormData = z.infer<typeof dailySongSchema>;

export function DailySongUpload() {
  const [isLoading, setIsLoading] = useState(false);
  const [titleColor, setTitleColor] = useState("#000000");
  const { register, handleSubmit, reset, control, setValue, formState: { errors } } = useForm<DailySongFormData>({
    resolver: zodResolver(dailySongSchema),
    defaultValues: {
      title: "",
      titleColor: "#000000"
    }
  });

  const onSubmit = async (data: DailySongFormData) => {
    try {
      setIsLoading(true);
      
      console.log('Submitting daily song data:', data);
      
      const apiUrl = '/api/daily-song';
      console.log('Making POST request to:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          createdAt: new Date().toISOString(),
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error text:', errorText);
        throw new Error(`Failed to upload daily song: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Daily song uploaded successfully:', result);
      
      toast.success("Indirimbo y'Umunsi uploaded successfully!");
      reset();
      
    } catch (error) {
      console.error('Error uploading daily song:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload daily song. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Upload Indirimbo y'Umunsi</CardTitle>
        <CardDescription>
          Add a new daily song with YouTube link
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Song Title</Label>
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
                  placeholder="Enter song title"
                  error={!!errors.title}
                />
              )}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="youtubeUrl">YouTube URL</Label>
            <Input
              id="youtubeUrl"
              placeholder="https://www.youtube.com/watch?v=..."
              {...register("youtubeUrl")}
              className={errors.youtubeUrl ? "border-red-500" : ""}
            />
            {errors.youtubeUrl && (
              <p className="text-sm text-red-500">{errors.youtubeUrl.message}</p>
            )}
            <p className="text-xs text-gray-500">
              Paste the full YouTube URL of the song you want to feature.
            </p>
          </div>

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Uploading..." : "Upload Indirimbo y'Umunsi"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
