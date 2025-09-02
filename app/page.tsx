import { Navigation } from "@/components/navigation"
import { DailyWordSection } from "@/components/daily-word-section"
import { LatestBooksSection } from "@/components/latest-books-section"
import { LatestBibleStudiesSection } from "@/components/latest-bible-studies-section"

export default function Home() {

  return (
    <div className="relative min-h-screen flex flex-col bg-background">

      {/* Navigation */}
      <Navigation />

      {/* Daily Word Hero Section */}
      <main className="flex-1 flex flex-col pt-16 md:pt-20">
        <section className="py-8 bg-gradient-to-r from-primary/10 to-primary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <DailyWordSection />
            </div>
          </div>
        </section>

        {/* Latest Books Section */}
        <LatestBooksSection />

        {/* Latest Bible Studies Section */}
        <LatestBibleStudiesSection />

      </main>
    </div>
  )
}
