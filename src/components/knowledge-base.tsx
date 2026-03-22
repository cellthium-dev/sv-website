import { CalendarIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Article } from "../types";

const articles: Article[] = [
  {
    id: "1",
    category: "fehleranalyse",
    date: "15.11.2024",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop",
    title: "Typische Fehlerquellen bei Photovoltaikanlagen",
    excerpt:
      "Ein Überblick über die häufigsten technischen Probleme bei PV-Anlagen – von Hotspots über Wechselrichterausfälle bis zu Verschattungsproblemen.",
    link: "#",
  },
  {
    id: "2",
    category: "wirtschaftlichkeit",
    date: "08.11.2024",
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=300&fit=crop",
    title: "Was tun bei Ertragsminderung?",
    excerpt:
      "Ursachen, Prüfung und rechtliche Aspekte bei Mindererträgen Ihrer PV-Anlage. Wann haben Sie Anspruch auf Nachbesserung oder Schadensersatz?",
    link: "#",
  },
  {
    id: "3",
    category: "batteriespeicher",
    date: "02.11.2024",
    image:
      "https://images.unsplash.com/photo-1624397640148-949b1732bb0a?w=400&h=300&fit=crop",
    title: "Fehleranalyse bei Batteriespeichern",
    excerpt:
      "Typische Probleme bei Battery Management Systems (BMS), Sicherheitsbewertungen und Hochvolt-Prüfungen nach geltenden Standards.",
    link: "#",
  },
  {
    id: "4",
    category: "recht",
    date: "25.10.2024",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop",
    title: "PV-Gutachten: Aufbau, Aussagekraft und Bedeutung",
    excerpt:
      "Was muss ein technisches Gutachten beinhalten? Welche Normen sind relevant? Und wie wird ein Gutachten bei Versicherungen verwendet?",
    link: "#",
  },
  {
    id: "5",
    category: "wartung",
    date: "18.10.2024",
    image:
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400&h=300&fit=crop",
    title: "Checkliste: Jährliche Wartung von PV-Anlagen",
    excerpt:
      "Was sollte jährlich überprüft werden? Von der Sichtprüfung über elektrische Messungen bis zur Dokumentation.",
    link: "#",
  },
  {
    id: "6",
    category: "recht",
    date: "10.10.2024",
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop",
    title: "Sachverständigenwesen: Neutralität und Unabhängigkeit",
    excerpt:
      "Grundlagen des Sachverständigenwesens, Vertragsarten nach BGB, Pflicht zur Neutralität und die Rolle bei Versicherungen.",
    link: "#",
  },
];

const categories = [
  { id: "alle", label: "Alle" },
  { id: "fehleranalyse", label: "Fehleranalyse" },
  { id: "wartung", label: "Wartung" },
  { id: "recht", label: "Recht & Normen" },
  { id: "wirtschaftlichkeit", label: "Wirtschaftlichkeit" },
  { id: "batteriespeicher", label: "Batteriespeicher" },
];

const getCategoryLabel = (id: string) =>
  categories.find((c) => c.id === id)?.label ?? id;

export default function KnowledgeBase() {
  const [selectedCategory, setSelectedCategory] = useState("alle");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = articles.filter((a) => {
    const matchCat =
      selectedCategory === "alle" || a.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch =
      q === "" ||
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  return (
    <section className="scroll-mt-16 py-20 md:py-28" id="wissen">
      <div className="section-container">
        {/* Section header */}
        <div className="mb-14 max-w-2xl">
          <div className="section-label mb-4">
            <span className="solar-bar" />
            <span>Wissen</span>
          </div>
          <h2
            className="mb-4 font-extrabold text-4xl tracking-tight md:text-5xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Wissensbereich
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Fachartikel, Ratgeber und aktuelle Informationen rund um
            Photovoltaik und Batteriesysteme.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 flex max-w-xl gap-2">
          <div className="relative flex-1">
            <SearchIcon className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 size-4 text-muted-foreground" />
            <Input
              className="h-10 pl-9"
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Artikel durchsuchen..."
              type="text"
              value={searchQuery}
            />
          </div>
          <Button
            className="font-medium"
            onClick={() => setSearchQuery("")}
            variant="secondary"
          >
            Zurücksetzen
          </Button>
        </div>

        {/* Category filters */}
        <div className="mb-12 flex flex-wrap gap-2">
          {categories.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                className={cn(
                  "rounded-lg border px-4 py-1.5 font-medium text-sm transition-all",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                )}
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Articles list */}
        {filtered.length > 0 ? (
          <div className="flex flex-col gap-6">
            {filtered.map((article) => (
              <div
                className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-5 transition-all hover:shadow-md md:flex-row"
                key={article.id}
              >
                <img
                  alt={article.title}
                  className="h-44 w-full flex-shrink-0 rounded-xl object-cover md:w-48"
                  loading="lazy"
                  src={article.image}
                />
                <div className="flex flex-1 flex-col">
                  <div className="mb-3 flex items-center gap-3">
                    <Badge className="text-xs" variant="secondary">
                      {getCategoryLabel(article.category)}
                    </Badge>
                    <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
                      <CalendarIcon className="size-3.5" />
                      {article.date}
                    </span>
                  </div>
                  <h3
                    className="mb-2 font-bold text-foreground text-xl"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {article.title}
                  </h3>
                  <p className="mb-4 flex-1 text-muted-foreground text-sm leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div>
                    <Button
                      asChild
                      className="font-semibold"
                      size="sm"
                      variant="outline"
                    >
                      <a href={article.link}>Weiterlesen</a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-muted-foreground">
            <p className="mb-1 font-medium text-lg">Keine Artikel gefunden.</p>
            <p className="text-sm">
              Versuchen Sie eine andere Suche oder Kategorie.
            </p>
          </div>
        )}

        {/* Load more */}
        <div className="mt-12 flex justify-center">
          <Button className="px-8 font-semibold" variant="outline">
            Mehr Artikel laden
          </Button>
        </div>
      </div>
    </section>
  );
}
