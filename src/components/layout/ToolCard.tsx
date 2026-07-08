import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Tool } from "@/data/tools";

interface ToolCardProps {
  tool: Tool;
}

const cardContent: Record<
  string,
  { title: string; description: string; category: string }
> = {
  "text-counter": {
    title: "Text Counter",
    description:
      "Count words, characters, sentences, and reading time for any text.",
    category: "Text",
  },
  "color-converter": {
    title: "Color Converter",
    description:
      "Convert colors between HEX, RGB, and HSL with live previews.",
    category: "Color",
  },
};

export function ToolCard({ tool }: ToolCardProps) {
  const content = cardContent[tool.slug] ?? {
    title: tool.slug,
    description: "",
    category: "",
  };
  const { title, description, category } = content;

  return (
    <Link href={`/tools/${tool.slug}`}>
      <Card className="group h-full overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
        <div
          className="aspect-video w-full bg-muted"
          dangerouslySetInnerHTML={{ __html: tool.thumbnailSvg(title) }}
        />
        <CardHeader className="p-4 pb-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base font-semibold leading-tight">
              {title}
            </CardTitle>
            <span className="shrink-0 rounded bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
              {category || "Tool"}
            </span>
          </div>
          <CardDescription className="text-xs text-muted-foreground">
            {category}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
