"use client";

import { Nav } from "@/components/landing/Nav";
import { MenuOverlay } from "@/components/landing/MenuOverlay";
import { BecomePartnerModal } from "@/components/landing/BecomePartnerModal";
import { EndFooter } from "@/components/landing/EndFooter";
import { useState } from "react";
import {
  BookOpen,
  Search,
  Trophy,
  BarChart2,
  BadgeCheck,
  Accessibility,
} from "lucide-react";
import Image from "next/image";
import { LINKS } from "@/lib/chapters";

export default function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Header Nav */}
      <Nav progress={0} onOpenMenu={() => setMenuOpen(true)} />

      {/* Mobile Menu Overlay */}
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Page Content - Following PlayShell UI patterns */}
      <div className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-navy text-cream">
        {/* Decorative background layers - matching PlayShell */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(46,229,157,0.18),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(245,197,66,0.12),_transparent_45%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(247,241,228,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(247,241,228,0.5)_1px,transparent_1px)] [background-size:48px_48px]"
        />

        {/* Content container - similar to PlayShell main */}
        <main className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-20 sm:px-6 pt-20">
          {/* Hero Section */}
          <section className="mb-16 text-center mt-10">
            <h1 className="font-display text-5xl font-bold text-cream mb-6 sm:text-6xl">
              About Civic Play
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-cream/90">
              Empowering Nigerian youth through civic education, media literacy,
              and democratic engagement via innovative game-based learning.
            </p>
          </section>

          {/* Mission & Vision */}
          <section className="mb-20">
            <h2 className="font-display text-3xl font-bold text-cream mb-10">
              Our Mission & Vision
            </h2>
            <div className="grid gap-10 md:grid-cols-2">
              <div className="bg-[var(--color-navy-deep)]/80 backdrop-blur-md rounded-2xl p-8 border border-[var(--color-green)]/30">
                <h3 className="font-display text-2xl font-bold text-green mb-6">
                  Our Mission
                </h3>
                <p className="text-cream/90 leading-relaxed text-lg">
                  To equip young Nigerians with the knowledge, skills, and values
                  necessary for active and responsible citizenship through
                  engaging, accessible, and impactful civic education that aligns
                  with SDG 4 (Quality Education) and SDG 16 (Peace, Justice, and
                  Strong Institutions).
                </p>
              </div>

              <div className="bg-[var(--color-navy-deep)]/80 backdrop-blur-md rounded-2xl p-8 border border-[var(--color-green)]/30">
                <h3 className="font-display text-2xl font-bold text-green mb-6">
                  Our Vision
                </h3>
                <p className="text-cream/90 leading-relaxed text-lg">
                  A Nigeria where every youth is media literate, civically
                  engaged, and empowered to contribute meaningfully to democratic
                  processes, fostering a generation of informed leaders who uphold
                  transparency, accountability, and participatory governance.
                </p>
              </div>
            </div>
          </section>

          {/* What We Do */}
          <section className="mb-24">
            <h2 className="font-display text-3xl font-bold text-cream mb-10">
              What We Do
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-cream/90 mb-12">
              Civic Play delivers comprehensive civic education through six core
              pillars, each designed to build practical skills and deepen
              understanding of Nigeria's democratic processes while promoting
              media and information literacy.
            </p>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Civic Knowledge */}
              <div className="bg-[var(--color-navy-deep)]/80 backdrop-blur-md rounded-2xl p-8 border border-[var(--color-green)]/40">
                <div className="flex items-center gap-2 mb-6">
                  <BookOpen className="h-10 w-10 text-green" />
                  <span className="font-display text-xl font-bold text-cream">
                    Civic Knowledge
                  </span>
                </div>
                <p className="text-cream/90 leading-relaxed text-lg">
                  Interactive quizzes covering Nigerian governance, history,
                  constitution, and citizens' rights and responsibilities.
                </p>
              </div>

              {/* Media & Information Literacy */}
              <div className="bg-[var(--color-navy-deep)]/80 backdrop-blur-md rounded-2xl p-8 border border-[var(--color-green)]/40">
                <div className="flex items-center gap-2 mb-6">
                  <Search className="h-10 w-10 text-green" />
                  <span className="font-display text-xl font-bold text-cream">
                    Media Literacy
                  </span>
                </div>
                <p className="text-cream/90 leading-relaxed text-lg">
                  Critical thinking skills to identify misinformation, verify
                  sources, and navigate digital media responsibly - essential for
                  SDG 16.
                </p>
              </div>

              {/* Compete & Climb Leaderboards */}
              <div className="bg-[var(--color-navy-deep)]/80 backdrop-blur-md rounded-2xl p-8 border border-[var(--color-green)]/40">
                <div className="flex items-center gap-2 mb-6">
                  <Trophy className="h-10 w-10 text-green" />
                  <span className="font-display text-xl font-bold text-cream">
                    Compete & Climb Leaderboards
                  </span>
                </div>
                <p className="text-cream/90 leading-relaxed text-lg">
                  Friendly competition through state and national leaderboards
                  that motivate learning and celebrate achievement in civic
                  knowledge.
                </p>
              </div>

              {/* Track Your Progress */}
              <div className="bg-[var(--color-navy-deep)]/80 backdrop-blur-md rounded-2xl p-8 border border-[var(--color-green)]/40">
                <div className="flex items-center gap-2 mb-6">
                  <BarChart2 className="h-10 w-10 text-green" />
                  <span className="font-display text-xl font-bold text-cream">
                    Track Your Progress
                  </span>
                </div>
                <p className="text-cream/90 leading-relaxed text-lg">
                  Personalized learning paths with progress tracking, streak
                  rewards, and achievement badges to encourage continuous
                  improvement.
                </p>
              </div>

              {/* SDG Alignment */}
              <div className="bg-[var(--color-navy-deep)]/80 backdrop-blur-md rounded-2xl p-8 border border-[var(--color-green)]/40">
                <div className="flex items-center gap-2 mb-6">
                  <BadgeCheck className="h-10 w-10 text-green" />
                  <span className="font-display text-xl font-bold text-cream">
                    SDG Alignment
                  </span>
                </div>
                <p className="text-cream/90 leading-relaxed text-lg">
                  Content specifically designed to support SDG 4 (Quality
                  Education) and SDG 16 (Peace, Justice, and Strong Institutions)
                  through targeted learning objectives and outcomes.
                </p>
              </div>

              {/* Inclusive & Accessible */}
              <div className="bg-[var(--color-navy-deep)]/80 backdrop-blur-md rounded-2xl p-8 border border-[var(--color-green)]/40">
                <div className="flex items-center gap-2 mb-6">
                  <Accessibility className="h-10 w-10 text-green" />
                  <span className="font-display text-xl font-bold text-cream">
                    Inclusive & Accessible
                  </span>
                </div>
                <p className="text-cream/90 leading-relaxed text-lg">
                  Designed for accessibility across devices, bandwidths, and
                  learning styles, ensuring no youth is left behind in civic
                  education.
                </p>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="mb-24">
            <h2 className="font-display text-3xl font-bold text-cream mb-10">
              How It Works
            </h2>
            <div className="grid gap-10 md:grid-cols-2">
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 h-12 w-12 bg-green/20 rounded-2xl flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-green" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-cream">
                      Learn Through Play
                    </h3>
                    <p className="text-cream/90 text-base">
                      Engaging quiz format turns civic education into an exciting
                      challenge that motivates consistent learning and retention.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 h-12 w-12 bg-green/20 rounded-2xl flex items-center justify-center">
                    <BarChart2 className="h-6 w-6 text-green" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-cream">
                      Track Your Growth
                    </h3>
                    <p className="text-cream/90 text-base">
                      Monitor progress with detailed analytics, streaks, and
                      achievements that celebrate your civic learning journey.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 h-12 w-12 bg-green/20 rounded-2xl flex items-center justify-center">
                    <Trophy className="h-6 w-6 text-green" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-cream">
                      Compete & Climb
                    </h3>
                    <p className="text-cream/90 text-base">
                      Challenge friends and climb leaderboards as you master civic
                      concepts and contribute to community learning goals.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 h-12 w-12 bg-green/20 rounded-2xl flex items-center justify-center">
                    <Search className="h-6 w-6 text-green" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-cream">
                      Media Literacy Focus
                    </h3>
                    <p className="text-cream/90 text-base">
                      Specialized content develops critical skills to identify
                      misinformation, verify facts, and engage responsibly with
                      media.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 h-12 w-12 bg-green/20 rounded-2xl flex items-center justify-center">
                    <Accessibility className="h-6 w-6 text-green" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-cream">
                      Accessible Everywhere
                    </h3>
                    <p className="text-cream/90 text-base">
                      Optimized for low-bandwidth environments and accessible on
                      mobile devices to reach youth across Nigeria.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 h-12 w-12 bg-green/20 rounded-2xl flex items-center justify-center">
                    <BadgeCheck className="h-6 w-6 text-green" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-cream">
                      Aligned with SDGs
                    </h3>
                    <p className="text-cream/90 text-base">
                      Directly supports SDG 4 (Quality Education) and SDG 16
                      (Peace, Justice, and Strong Institutions) through targeted
                      civic education outcomes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center mb-20">
            <h2 className="font-display text-3xl font-bold text-cream mb-8">
              Ready to Make a Difference?
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-cream/90 mb-10">
              Join thousands of Nigerians who are learning, competing, and growing
              their civic knowledge through Civic Play. Whether you're a student,
              educator, or concerned citizen, your participation strengthens
              Nigeria's democratic foundation.
            </p>
            <div className="flex flex-col gap-6 sm:flex-row sm:justify-center sm:gap-8">
              <a
                href="/play"
                className="rounded-full bg-[var(--color-navy-deep)] px-8 py-4 font-[family-name:var(--font-cal)] text-lg font-bold uppercase tracking-wide text-[var(--color-cream)] shadow-[0_10px_30px_rgba(0,0,0,0.35)] ring-2 ring-[var(--color-green)]/40 transition hover:bg-[var(--color-green)] hover:text-[var(--color-navy-deep)] hover:-translate-y-2"
              >
                Start Playing
              </a>
              <a
                href={LINKS.contactMailto}
                className="rounded-full bg-[var(--color-navy-deep)]/60 px-8 py-4 font-[family-name:var(--font-cal)] text-lg font-bold uppercase tracking-wide text-[var(--color-cream)] border border-[var(--color-green)]/60 shadow-[0_10px_30px_rgba(0,0,0,0.35)] ring-2 ring-[var(--color-green)]/40 transition hover:bg-[var(--color-navy-deep)]/80 hover:text-[var(--color-green)] hover:-translate-y-2"
              >
                Contact Us
              </a>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <EndFooter visible={false} />
    </>
  );
}
