import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getToolBySlug, tools } from "@/data/tools";
import { ToolShell } from "./ToolShell";

export async function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

const toolContent: Record<string, { title: string; description: string }> = {
  "text-counter": {
    title: "Text Counter",
    description:
      "Count words, characters, sentences, and reading time for any text.",
  },
  "color-converter": {
    title: "Color Converter",
    description:
      "Convert colors between HEX, RGB, and HSL with live previews.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  const content = toolContent[slug];
  return {
    title: content?.title,
    description: content?.description,
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
    return null;
  }

  const content = toolContent[slug] ?? { title: slug, description: "" };
  const thumbnailHtml = tool.thumbnailSvg(content.title);

  return (
    <ToolShell
      title={content.title}
      description={content.description}
      thumbnailHtml={thumbnailHtml}
    />
  );
}
