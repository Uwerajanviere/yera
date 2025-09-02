"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Loader2, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface DailyWord {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function IjamboRyumunsiPage() {
  const [dailyWord, setDailyWord] = useState<DailyWord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDailyWord();
  }, []);

  const fetchDailyWord = async () => {
    try {
      const response = await fetch('/api/daily-word');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch daily word: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setDailyWord(data);
    } catch (err) {
      console.error('Error fetching daily word:', err);
      setError(err instanceof Error ? err.message : 'Failed to load daily word');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  if (!dailyWord) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center flex-col">
          <p className="text-gray-500 text-lg">Nta jambo ry'umunsi rihari ubu.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Header Section */}
      <div className="bg-blue-500 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Ijambo ry'Umunsi
          </h1>
        </div>
      </div>

      {/* Daily Word Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Date */}
          <div className="flex justify-center mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-500" />
              <span className="text-blue-800 font-medium">
                {new Date(dailyWord.createdAt).toLocaleDateString('rw-RW', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>

          {/* Main Content */}
          <Card className="shadow-lg">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
                {dailyWord.title}
              </h2>

              <div className="prose prose-lg max-w-none">
                <div 
                  className="text-gray-700 leading-relaxed text-base md:text-lg"
                  style={{ lineHeight: '1.7' }}
                >
                  {dailyWord.content}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bible Verse */}
          <div className="mt-8 text-center">
            <Card className="bg-gray-50">
              <CardContent className="p-6">
                <blockquote className="text-lg text-gray-700 italic">
                  "Ijambo ry'Imana ni itara ku maguru yanjye, n'urumuri ku nzira yanjye."
                </blockquote>
                <cite className="block mt-3 text-blue-500 font-medium">
                  Zaburi 119:105
                </cite>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
