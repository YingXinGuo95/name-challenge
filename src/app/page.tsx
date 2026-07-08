import { ToolCard } from "@/components/layout/ToolCard";
import { tools } from "@/data/tools";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          ToolShelf
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          A small collection of lightweight, self-contained browser tools.
          Built as a starter template — clone it, add your own tools, ship fast.
        </p>
      </section>

      {/* Tools Grid */}
      <section id="tools">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">
          All Tools
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>
    </div>
  );
}
