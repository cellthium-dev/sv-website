import { createFileRoute } from "@tanstack/react-router";
import Footer from "../../components/footer";
import Header from "../../components/header";
import KnowledgeBase from "../../components/knowledge-base";

export const Route = createFileRoute("/wissen/")({
  component: WissenPage,
});

function WissenPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <KnowledgeBase />
      </main>
      <Footer />
    </div>
  );
}
