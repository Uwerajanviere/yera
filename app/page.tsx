import { Navigation } from "@/components/navigation"
import { VideoSection } from "@/components/video-section"
import { DailyWordSection } from "@/components/daily-word-section"
import { LatestBooksSection } from "@/components/latest-books-section"
import { LatestBibleStudiesSection } from "@/components/latest-bible-studies-section"
import Link from 'next/link'

export default function Home() {

  return (
    <div className="relative min-h-screen flex flex-col bg-background">

      {/* Navigation */}
      <Navigation />

      {/* Daily Word Hero Section */}
      <main className="flex-1 flex flex-col pt-16 md:pt-20">
        <DailyWordSection />

        {/* Latest Books Section */}
        <LatestBooksSection />

        {/* Latest Bible Studies Section */}
        <LatestBibleStudiesSection />

        {/* Sermons Section */}
        <section id="latest-sermons" className="py-12 md:py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center mb-8 md:mb-12">Latest Sermons</h2>

            <div className="max-w-6xl mx-auto">
              <VideoSection limit={4} />
            </div>
            
            {/* View All Videos Button */}
            <div className="text-center mt-8 md:mt-12">
              <Link href="/videos" className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors text-sm md:text-base">
                Reba Amashusho Yose
                <svg className="w-4 h-4 md:w-5 md:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>


      </main>
    </div>
  )
}
