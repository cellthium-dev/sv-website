import { createFileRoute } from "@tanstack/react-router";
import Footer from "../../components/footer";
import Header from "../../components/header";
import ToolsPage from "../../components/tools-page";

export const Route = createFileRoute("/tools/")({
  component: ToolsRoute,
});

function ToolsRoute() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ToolsPage />
      </main>
      <Footer />
    </div>
  );
}
