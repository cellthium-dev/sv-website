import { useState } from "react";
import type { Article } from "../types";

export default function KnowledgeBase() {
  const [selectedCategory, setSelectedCategory] = useState("alle");
  const [searchQuery, setSearchQuery] = useState("");

  const articles: Article[] = [
    {
      id: "1",
      category: "fehleranalyse",
      date: "15.11.2024",
      image:
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop",
      title: "Typische Fehlerquellen bei Photovoltaikanlagen",
      excerpt:
        "Ein Überblick über die häufigsten technischen Probleme bei PV-Anlagen – von Hotspots über Wechselrichterausfälle bis zu Verschattungsproblemen. Erfahren Sie, wie Sie frühzeitig Schäden erkennen.",
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
        "Aus Sachverständigensicht: Typische Probleme bei Battery Management Systems (BMS), Sicherheitsbewertungen und Hochvolt-Prüfungen nach geltenden Standards.",
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
        "Was sollte jährlich überprüft werden? Von der Sichtprüfung über elektrische Messungen bis zur Dokumentation – eine Checkliste für Betreiber und Installateure.",
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
        "Grundlagen des Sachverständigenwesens, Vertragsarten nach BGB, Pflicht zur Neutralität und die Rolle von Sachverständigen bei Versicherungen.",
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

  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      selectedCategory === "alle" || article.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryLabel = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.label : categoryId;
  };

  return (
    <section className="py-16" id="wissen">
      <div className="container mx-auto px-5">
        <h2 className="mb-4 text-center font-bold text-4xl">Wissensbereich</h2>
        <p className="mb-12 text-center text-gray-600 text-lg">
          Fachartikel, Ratgeber und aktuelle Informationen rund um Photovoltaik
          und Batteriesysteme
        </p>

        {/* Search Box */}
        <div className="mx-auto mb-8 flex max-w-2xl gap-2">
          <input
            className="flex-1 rounded-lg border-2 border-gray-300 px-4 py-3 focus:border-[#0066CC] focus:outline-none focus:ring-2 focus:ring-[#0066CC]/20"
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Artikel durchsuchen..."
            type="text"
            value={searchQuery}
          />
          <button className="rounded-lg bg-[#0066CC] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#004C99]">
            Suchen
          </button>
        </div>

        {/* Category Filters */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              className={`rounded-lg border-2 px-4 py-2 transition-all ${
                selectedCategory === category.id
                  ? "border-[#0066CC] bg-[#0066CC] text-white"
                  : "border-gray-300 bg-white text-gray-700 hover:border-[#0066CC]"
              }`}
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid gap-8">
          {filteredArticles.map((article) => (
            <div
              className="flex flex-col gap-6 rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg md:flex-row"
              key={article.id}
            >
              <img
                alt={article.title}
                className="h-40 w-full flex-shrink-0 rounded-lg object-cover md:w-52"
                loading="lazy"
                src={article.image}
              />
              <div className="flex-1">
                <div className="mb-2 flex gap-4 text-gray-500 text-sm">
                  <span>📅 {article.date}</span>
                  <span className="rounded bg-gray-100 px-3 py-1 text-xs">
                    {getCategoryLabel(article.category)}
                  </span>
                </div>
                <h3 className="mb-3 font-bold text-2xl">{article.title}</h3>
                <p className="mb-4 text-gray-600">{article.excerpt}</p>
                <a
                  className="inline-block rounded-lg border-2 border-[#0066CC] bg-transparent px-6 py-2 font-semibold text-[#0066CC] transition-all hover:bg-[#0066CC] hover:text-white"
                  href={article.link}
                >
                  Weiterlesen →
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            <p className="text-xl">Keine Artikel gefunden.</p>
            <p className="mt-2">
              Versuchen Sie eine andere Suche oder Kategorie.
            </p>
          </div>
        )}

        <div className="mt-12 text-center">
          <button className="rounded-lg border-2 border-[#0066CC] bg-transparent px-8 py-3 font-semibold text-[#0066CC] transition-all hover:bg-[#0066CC] hover:text-white">
            Mehr Artikel laden
          </button>
        </div>
      </div>
    </section>
  );
}
