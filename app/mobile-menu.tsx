"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Menu, X, ChevronDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const handleClose = () => {
    setOpen(false)
    setOpenDropdown(null)
  }

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden text-white">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-black/95 border-white/10 p-0">
        <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-white/10 flex justify-end">
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="h-6 w-6 text-white" />
            </Button>
          </div>
          <nav className="flex flex-col p-4 gap-4">
            <div className="flex flex-col gap-4">
              {/* Main Navigation Dropdowns */}
              <div>
                <button 
                  onClick={() => toggleDropdown('soma')}
                  className="flex items-center justify-between w-full text-white hover:text-amber-400 transition py-2"
                >
                  Soma Bibiliya
                  <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === 'soma' ? 'rotate-180' : ''}`} />
                </button>
                {openDropdown === 'soma' && (
                  <div className="ml-4 mt-2 space-y-2">
                    <Link href="/twige-bibiliya" onClick={handleClose} className="block text-white/80 hover:text-amber-400 transition">
                      Twige Bibiliya
                    </Link>
                    <Link href="/ijambo-ryumunsi" onClick={handleClose} className="block text-white/80 hover:text-amber-400 transition">
                      Ijambo ry'Umunsi
                    </Link>
                  </div>
                )}
              </div>

              <div>
                <button 
                  onClick={() => toggleDropdown('indirimbo')}
                  className="flex items-center justify-between w-full text-white hover:text-amber-400 transition py-2"
                >
                  Indirimbo
                  <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === 'indirimbo' ? 'rotate-180' : ''}`} />
                </button>
                {openDropdown === 'indirimbo' && (
                  <div className="ml-4 mt-2 space-y-2">
                    <Link href="/umva-indirimbo" onClick={handleClose} className="block text-white/80 hover:text-amber-400 transition">
                      Umva Indirimbo
                    </Link>
                  </div>
                )}
              </div>

              <div>
                <button 
                  onClick={() => toggleDropdown('isomero')}
                  className="flex items-center justify-between w-full text-white hover:text-amber-400 transition py-2"
                >
                  Isomero
                  <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === 'isomero' ? 'rotate-180' : ''}`} />
                </button>
                {openDropdown === 'isomero' && (
                  <div className="ml-4 mt-2 space-y-2">
                    <Link href="/ibitabo" onClick={handleClose} className="block text-white/80 hover:text-amber-400 transition">
                      Ibitabo
                    </Link>
                  </div>
                )}
              </div>

              {/* Direct Links */}
              <Link href="/videos" onClick={handleClose} className="text-white hover:text-amber-400 transition py-2">
                Videos
              </Link>
              <Link href="/about" onClick={handleClose} className="text-white hover:text-amber-400 transition py-2">
                Turi bande ?
              </Link>
              <Link href="/contact" onClick={handleClose} className="text-white hover:text-amber-400 transition py-2">
                Twandikire
              </Link>
            </div>
          </nav>
          <div className="mt-auto p-4 flex flex-col gap-4">
            <Link href="/#latest-ibiganiro" onClick={handleClose}>
              <Button className="w-full bg-amber-400 text-black hover:bg-amber-500">Watch Now</Button>
            </Link>
            <form action="https://www.paypal.com/donate" method="post" target="_top" className="w-full">
              <input type="hidden" name="hosted_button_id" value="Z4UPJDXNDFCQJ" />
              <Button 
                type="submit"
                className="w-full bg-amber-400 hover:bg-amber-500 text-black"
              >
                Give Now
              </Button>
              <Image 
                src="https://www.paypal.com/en_RW/i/scr/pixel.gif" 
                alt="" 
                width={1} 
                height={1} 
              />
            </form>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
