import { homeViewModel } from "./homeViewModel";

export default async function Home() {
  const { message } = await homeViewModel();

  return (
    <div className="grid min-h-screen items-center justify-center bg-vs-background text-vs-foreground font-sans p-10">
      <h1 className="text-4xl font-bold text-vs-primary">{message}</h1>
      <p className="mt-4 text-vs-foreground">
        This is a demonstration of Clean Architecture in a Next.js application.
      </p>
    </div>
  );
}