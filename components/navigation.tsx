"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MobileMenu } from "@/app/mobile-menu"
import { useEffect, useState } from "react"
import Image from "next/image"
import { useTheme } from 'next-themes'
import { Sun, Moon, ChevronDown, ChevronUp } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from 'next/navigation'

// Kinyarwanda Bible books
const kinyarwandaBooks = [
  { value: "gen", label: "Itangiriro" },
  { value: "exo", label: "Kuva" },
  { value: "lev", label: "Levitiko" },
  { value: "num", label: "Numeri" },
  { value: "deu", label: "Gusubira inyuma" },
  { value: "jos", label: "Yosua" },
  { value: "jdg", label: "Abacamanza" },
  { value: "rut", label: "Rutu" },
  { value: "1sa", label: "1 Samweli" },
  { value: "2sa", label: "2 Samweli" },
  { value: "1ki", label: "1 Abami" },
  { value: "2ki", label: "2 Abami" },
  { value: "1ch", label: "1 Ibyakozwe n'Intumwa" },
  { value: "2ch", label: "2 Ibyakozwe n'Intumwa" },
  { value: "ezr", label: "Ezira" },
  { value: "neh", label: "Nehemiya" },
  { value: "est", label: "Esiteri" },
  { value: "job", label: "Yobu" },
  { value: "psa", label: "Inzebukuru" },
  { value: "pro", label: "Imigani" },
  { value: "ecc", label: "Umuvugizi" },
  { value: "sng", label: "Indirimbo" },
  { value: "isa", label: "Yesaya" },
  { value: "jer", label: "Yeremiya" },
  { value: "lam", label: "Indirimbo za Yeremiya" },
  { value: "eze", label: "Ezekeli" },
  { value: "dan", label: "Daniyeli" },
  { value: "hos", label: "Hoseya" },
  { value: "joe", label: "Yoweli" },
  { value: "amo", label: "Amosi" },
  { value: "oba", label: "Obadiya" },
  { value: "jon", label: "Yona" },
  { value: "mic", label: "Mika" },
  { value: "nah", label: "Nahumu" },
  { value: "hab", label: "Habakuki" },
  { value: "zep", label: "Sefaniya" },
  { value: "hag", label: "Hagai" },
  { value: "zec", label: "Zekariya" },
  { value: "mal", label: "Malaki" },
  { value: "mat", label: "Matayo" },
  { value: "mrk", label: "Marko" },
  { value: "luk", label: "Luka" },
  { value: "jhn", label: "Yohana" },
  { value: "act", label: "Ibyakozwe n'Intumwa" },
  { value: "rom", label: "Abaroma" },
  { value: "1co", label: "1 Abakorinto" },
  { value: "2co", label: "2 Abakorinto" },
  { value: "gal", label: "Abagalatia" },
  { value: "eph", label: "Abefeso" },
  { value: "php", label: "Abafilipi" },
  { value: "col", label: "Abakolosayi" },
  { value: "1th", label: "1 Abatesalonike" },
  { value: "2th", label: "2 Abatesalonike" },
  { value: "1ti", label: "1 Abatimoteyo" },
  { value: "2ti", label: "2 Abatimoteyo" },
  { value: "tit", label: "Tito" },
  { value: "phm", label: "Filemoni" },
  { value: "heb", label: "Abaheburayo" },
  { value: "jas", label: "Yakobo" },
  { value: "1pe", label: "1 Petero" },
  { value: "2pe", label: "2 Petero" },
  { value: "1jn", label: "1 Yohana" },
  { value: "2jn", label: "2 Yohana" },
  { value: "3jn", label: "3 Yohana" },
  { value: "jud", label: "Yuda" },
  { value: "rev", label: "Ibyahishuwe" }
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [selectedBook, setSelectedBook] = useState<string>("gen")
  const [selectedChapter, setSelectedChapter] = useState<string>("1")
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled, isMounted])

  const handleBibleSelection = () => {
    if (selectedBook && selectedChapter) {
      window.location.href = `/twige-bibiliya?book=${selectedBook}&chapter=${selectedChapter}`;
    }
  };



  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isMounted && scrolled ? "bg-primary/90 backdrop-blur-md shadow-md" : "bg-primary"}`}
      >
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl md:text-3xl font-bold text-primary-foreground">
                <span className="">yera</span>
              </Link>
            </div>

            {/* Desktop Navigation Links - Centered */}
            <nav className="hidden md:flex items-center justify-center flex-1 px-4 md:px-8">
              <div className="flex items-center space-x-4 lg:space-x-8">
                <div className="relative group">
                  <button className="text-primary-foreground hover:text-primary-foreground/80 transition flex items-center gap-1 text-base">
                    Soma Bibiliya
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <div className="absolute top-full left-0 mt-2 bg-popover backdrop-blur-sm border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-48 z-50">
                    <div className="p-2">
                      <Link href="/twige-bibiliya" className="block px-3 py-2 text-popover-foreground hover:bg-accent rounded text-sm">
                        Twige Bibiliya
                      </Link>
                      <Link href="/ijambo-ryumunsi" className="block px-3 py-2 text-popover-foreground hover:bg-accent rounded text-sm">
                        Ijambo ry'Umunsi
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <button className="text-primary-foreground hover:text-primary-foreground/80 transition flex items-center gap-1 text-base">
                    Indirimbo
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <div className="absolute top-full left-0 mt-2 bg-popover backdrop-blur-sm border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-48 z-50">
                    <div className="p-2">
                      <a href="https://giramahoro.yera.rw/" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 text-popover-foreground hover:bg-accent rounded text-sm">
                        Umva Indirimbo
                      </a>
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <button className="text-primary-foreground hover:text-primary-foreground/80 transition flex items-center gap-1 text-base">
                    Isomero
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <div className="absolute top-full left-0 mt-2 bg-popover backdrop-blur-sm border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-48 z-50">
                    <div className="p-2">
                      <Link href="/ibitabo" className="block px-3 py-2 text-popover-foreground hover:bg-accent rounded text-sm">
                        Ibitabo
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </nav>

            {/* Mobile Navigation Links - Centered */}
            <nav className="flex md:hidden items-center justify-center flex-1">
              <div className="flex items-center space-x-3">
                <Link href="/twige-bibiliya" className="text-primary-foreground hover:text-primary-foreground/80 transition text-xs">
                  Twige Bibiliya
                </Link>
                <a href="https://giramahoro.yera.rw/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground hover:text-primary-foreground/80 transition text-xs">
                  Indirimbo
                </a>
                <Link href="/ibitabo" className="text-primary-foreground hover:text-primary-foreground/80 transition text-xs">
                  Ibitabo
                </Link>
              </div>
            </nav>

            {/* Right Side - Theme Toggle & Mobile Menu */}
            <div className="flex items-center gap-2">
              <button
                aria-label="Toggle theme"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="hidden lg:flex p-2 rounded-full bg-secondary/20 hover:bg-secondary/30 text-foreground flex items-center justify-center transition-colors"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <MobileMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Secondary Navigation Bar */}
      <div className="relative bg-secondary mt-[72px] md:mt-[80px]">
        <div className="container mx-auto px-4 py-2 md:py-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0">
            {/* Left Side - Action Buttons */}
            <div className="flex items-center gap-2 md:gap-4">
              <Link href="/twige-bibiliya">
                <Button className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs md:text-sm px-2 md:px-4 py-1 md:py-2">
                  TWIGE BIBILIYA
                </Button>
              </Link>
              <Link href="/ijambo-ryumunsi">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm px-2 md:px-4 py-1 md:py-2">
                  <svg className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Ijambo ry'Umunsi
                </Button>
              </Link>
            </div>

            {/* Center - Navigation Links */}
            <div className="flex items-center gap-2 md:gap-4 lg:gap-6 text-secondary-foreground text-xs md:text-sm">
              <a href="https://giramahoro.yera.rw/" target="_blank" rel="noopener noreferrer" className="hover:text-secondary-foreground/80 transition">
                Umva Indirimbo
              </a>
              <Link href="/ibitabo" className="hover:text-secondary-foreground/80 transition">
                Ibitabo
              </Link>
              <Link href="/videos" className="hover:text-secondary-foreground/80 transition">
                Videos
              </Link>
              <Link href="/about" className="hover:text-secondary-foreground/80 transition">
                Turi bande ?
              </Link>
              <Link href="/contact" className="hover:text-secondary-foreground/80 transition">
                Twandikire
              </Link>
            </div>


          </div>
        </div>
      </div>
    </>
  )
}
