import { useState } from "react";
import { createRoot } from "react-dom/client";
import SearchParams from "./SearchParams";
import DetailsErrorBoundary from "./Details";
import AdoptedPetContext from "./AdoptedPetContext";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IPet } from "./APIResponseTypes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPet = useState(null as IPet | null);
  return (
    <div
      className="m-0 p-0"
      style={{
        background: "url(https://pets-images.dev-apis.com/pets/wallpaperA.jpg)",
      }}
    >
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AdoptedPetContext.Provider value={adoptedPet}>
            <header className="mb-10 w-full bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500 p-7 text-center">
              <Link
                className="text-6xl text-white hover:text-gray-200"
                to={"/"}
              >
                {" "}
                Adopt me!
              </Link>
            </header>
            <Routes>
              <Route path="/details/:id" element={<DetailsErrorBoundary />} />
              <Route path="/" element={<SearchParams />} />
            </Routes>
          </AdoptedPetContext.Provider>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
};

const rootelement = document.getElementById("root");
if (!rootelement) {
  throw new Error("No elemnt to render the app");
}

const root = createRoot(rootelement);
root.render(<App />);
