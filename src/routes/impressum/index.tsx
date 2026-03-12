import { createFileRoute } from "@tanstack/react-router";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

export const Route = createFileRoute("/impressum/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Header />
      Hello "/impressum/"!
      <Footer />
    </div>
  );
}
