import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"

export default function AboutPage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <Image src="/images/sunrise.jpg" alt="Sunrise background" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Navigation */}
      <Navigation />

      <main className="flex-1 container mx-auto px-4 py-16 pt-28 relative z-10">
        <div className="max-w-3xl mx-auto bg-card/80 backdrop-blur-sm p-8 rounded-xl border border-border">
          <h1 className="text-4xl font-bold text-card-foreground mb-8">About Yera</h1>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-card-foreground/90 text-lg mb-6">
              Yera is a Christian ministry platform dedicated to spreading the Gospel and nurturing spiritual growth. Our
              mission is to provide accessible, inspiring content that helps believers deepen their faith and connect with God's word.
            </p>

            <h2 className="text-2xl font-bold text-card-foreground mt-8 mb-4">Our Mission</h2>
            <p className="text-card-foreground/90 mb-6">
              To share the love of Christ through digital ministry, providing Bible studies, daily devotionals, worship songs, 
              and spiritual resources that inspire and strengthen believers in their walk with God.
            </p>

            <h2 className="text-2xl font-bold text-card-foreground mt-8 mb-4">Our Story</h2>
            <p className="text-card-foreground/90 mb-6">
              Yera was born from a vision to create a comprehensive digital ministry platform that serves the global Christian community. 
              We believe that technology can be a powerful tool for spreading God's word and building meaningful connections among believers.
            </p>
            <p className="text-card-foreground/90 mb-6">
              Today, Yera offers a diverse range of spiritual content including Bible studies, daily words of encouragement, 
              worship music, and inspirational messages. Our platform serves believers worldwide, providing 24/7 access to 
              resources that nurture faith and spiritual growth.
            </p>

            <h2 className="text-2xl font-bold text-card-foreground mt-8 mb-4">Our Team</h2>
            <p className="text-card-foreground/90 mb-6">
              Our dedicated team consists of pastors, Bible teachers, worship leaders, and ministry professionals who are
              passionate about serving God through digital ministry. We collaborate with gifted ministers and Christian content creators 
              to bring you authentic, life-changing spiritual content.
            </p>

            <h2 className="text-2xl font-bold text-card-foreground mt-8 mb-4">Our Values</h2>
            <ul className="list-disc pl-6 text-card-foreground/90 mb-6 space-y-2">
              <li>Biblical truth and sound doctrine</li>
              <li>Accessibility for all believers</li>
              <li>Community and fellowship</li>
              <li>Innovation in ministry</li>
              <li>Integrity and authenticity</li>
            </ul>

            <div className="mt-10 flex justify-center">
              <Link href="/contact">
                <Button className="bg-amber-500 hover:bg-amber-600 text-black">Contact Us</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
