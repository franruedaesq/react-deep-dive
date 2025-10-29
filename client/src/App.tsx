import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Navigation from "./components/Navigation";
import ClientSideRendering from "./pages/rendering/ClientSideRendering";
import ServerSideRendering from "./pages/rendering/ServerSideRendering";
import StaticSiteGeneration from "./pages/rendering/StaticSiteGeneration";
import IncrementalStaticRegeneration from "./pages/rendering/IncrementalStaticRegeneration";
import ReactServerComponents from "./pages/rendering/ReactServerComponents";
import Hydration from "./pages/concepts/Hydration";
import ReactFiber from "./pages/concepts/ReactFiber";
import IslandsArchitecture from "./pages/concepts/IslandsArchitecture";
import StreamingAndSuspense from "./pages/advanced/StreamingAndSuspense";
import ConcurrentFeatures from "./pages/advanced/ConcurrentFeatures";
import CachingAndDataFetching from "./pages/advanced/CachingAndDataFetching";
import PerformanceBenchmarks from "./pages/advanced/PerformanceBenchmarks";
import InteractiveDiagrams from "./pages/advanced/InteractiveDiagrams";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1">
        <Switch>
          <Route path={"/"} component={Home} />
          <Route path={"/rendering/csr"} component={ClientSideRendering} />
          <Route path={"/rendering/ssr"} component={ServerSideRendering} />
          <Route path={"/rendering/ssg"} component={StaticSiteGeneration} />
          <Route path={"/rendering/isr"} component={IncrementalStaticRegeneration} />
          <Route path={"/rendering/rsc"} component={ReactServerComponents} />
           <Route path={"/concepts/hydration"} component={Hydration} />
          <Route path={"/concepts/fiber"} component={ReactFiber} />
           <Route path={"/concepts/islands"} component={IslandsArchitecture} />
          <Route path={"/advanced/streaming"} component={StreamingAndSuspense} />
          <Route path={"/advanced/concurrent"} component={ConcurrentFeatures} />
          <Route path={"/advanced/caching"} component={CachingAndDataFetching} />
          <Route path={"/advanced/benchmarks"} component={PerformanceBenchmarks} />
          <Route path={"/advanced/diagrams"} component={InteractiveDiagrams} />
          <Route path={"/404"} component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
