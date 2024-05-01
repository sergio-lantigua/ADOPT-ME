import { useState } from "react";
import { createRoot } from "react-dom/client";
import SearchParams from "./SearchParams.jsx";
import DetailsErrorBoundary from "./Details.jsx";
import AdoptedPetXontext from "./AdoptedPetContext.js";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPet = useState(null);
  return (
    <div
      className="m-0 p-0 "
      style={{
        background: "url(https://pets-images.dev-apis.com/pets/wallpaperA.jpg)",
      }}
    >
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AdoptedPetXontext.Provider value={adoptedPet}>
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
          </AdoptedPetXontext.Provider>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
};

const rootelement = document.getElementById("root");
const root = createRoot(rootelement);
root.render(<App />);
