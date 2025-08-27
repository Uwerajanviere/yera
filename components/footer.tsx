"use client";

import Link from "next/link"
import { Facebook, Instagram, Youtube } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Footer() {
  const [currentYear, setCurrentYear] = useState('');

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="relative z-10 mt-auto">
      <div className="bg-[#0a3a5c] py-8 md:py-12 px-4">
        <div className="container mx-auto">
          {/* Logo */}
          <div className="flex justify-center mb-6 md:mb-8">
            <Link href="/" className="text-3xl md:text-4xl font-bold text-white">
              yera
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap justify-center gap-x-4 md:gap-x-8 gap-y-2 md:gap-y-4 mb-8 md:mb-10 text-white text-sm md:text-base">
                          <Link href="/#latest-ibiganiro" className="hover:underline">
              WATCH
            </Link>
            <span className="hidden md:inline text-white/50">|</span>
            <Link href="/about" className="hover:underline">
              ABOUT
            </Link>
            <span className="hidden md:inline text-white/50">|</span>
            <Link href="/contact" className="hover:underline">
              CONTACT US
            </Link>
            <span className="hidden md:inline text-white/50">|</span>
            <Link href="/privacy" className="hover:underline">
              PRIVACY POLICY
            </Link>
          </div>



          <div className="flex justify-center gap-3 md:gap-4 mb-8 md:mb-10">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-full p-2 md:p-3 hover:opacity-90 transition"
            >
              <Facebook className="h-5 w-5 md:h-6 md:w-6 text-orange-900" />
              <span className="sr-only">Facebook</span>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-full p-2 md:p-3 hover:opacity-90 transition"
            >
              <Instagram className="h-5 w-5 md:h-6 md:w-6 text-orange-900" />
              <span className="sr-only">Instagram</span>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-full p-2 md:p-3 hover:opacity-90 transition"
            >
              <Youtube className="h-5 w-5 md:h-6 md:w-6 text-orange-900" />
              <span className="sr-only">YouTube</span>
            </a>
          </div>


        </div>
      </div>
    </footer>
  )
}
