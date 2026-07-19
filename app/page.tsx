import Link from "next/link";
import { ArrowRight, BotMessageSquare, Building2, LineChart, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="fixed top-0 w-full border-b border-border/40 bg-background/80 backdrop-blur-md z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center animate-pulse-glow">
              <BotMessageSquare className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">PropBot AI</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link href="#features" className="text-foreground/80 hover:text-primary transition-colors">Features</Link>
            <Link href="#how-it-works" className="text-foreground/80 hover:text-primary transition-colors">How it works</Link>
            <Link href="#pricing" className="text-foreground/80 hover:text-primary transition-colors">Pricing</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-sm font-medium hover:text-primary transition-colors">
              Log in
            </Link>
            <Link
              href="/auth/signup"
              className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 transition-transform hover:scale-105 active:scale-95"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-32 pb-16">
        <section className="container mx-auto px-4 text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <Sparkles className="h-4 w-4" />
            <span>The future of Real Estate Lead Generation</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Automate your property <br className="hidden md:block" />
            <span className="text-primary">sales with AI.</span>
          </h1>

          <p className="text-xl text-foreground/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            PropBot engages leads 24/7, answers property questions instantly, and schedules viewings automatically through WhatsApp & Web.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-primary-foreground text-lg px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
            >
              Go to Dashboard <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="#demo"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-secondary/10 text-secondary border border-secondary/20 text-lg px-8 py-4 rounded-full font-semibold hover:bg-secondary/20 transition-colors"
            >
              Watch Demo
            </Link>
          </div>
        </section>

        <section id="features" className="container mx-auto px-4 mt-32">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BotMessageSquare,
                title: "24/7 AI Assistant",
                description: "Never miss a lead. Our AI responds instantly to property inquiries on WhatsApp and your website.",
              },
              {
                icon: Building2,
                title: "Smart Property Match",
                description: "Automatically matches buyers with suitable listings based on their budget, preferences, and location.",
              },
              {
                icon: LineChart,
                title: "Analytics Dashboard",
                description: "Track lead quality, conversion rates, and bot performance in real-time.",
              }
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-card border border-border p-8 rounded-2xl hover:border-primary/50 transition-colors group cursor-default"
                style={{ animationDelay: `${i * 150}ms`, animationFillMode: 'both' }}
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-foreground/60 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border/40 py-8 bg-card">
        <div className="container mx-auto px-4 text-center text-foreground/50 text-sm">
          <p>© {new Date().getFullYear()} PropBot AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

