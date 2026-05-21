import HiddenReveal from "@/components/HiddenReveal";

export const metadata = {
  title: "Hidden Reveal Sections - Labs Test",
  description: "Interactive vertical scroll snap hidden reveal sections test environment.",
};

export default function RevealTestPage() {
  return (
    <main className="w-full min-h-screen bg-black">
      <HiddenReveal />
    </main>
  );
}
