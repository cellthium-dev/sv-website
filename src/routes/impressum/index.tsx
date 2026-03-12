import { createFileRoute } from "@tanstack/react-router";
import Footer from "../../components/footer";
import Header from "../../components/header";

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
