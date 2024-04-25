import { createRoot } from "react-dom/client";
import SearchParams from "./SearchParams.jsx";
import DetailsErrorBoundary from "./Details.jsx";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            cacheTime: Infinity,
        }
    }
});

const App = () => {
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <header>
                    <Link to={"/"}> Adopt me!</Link>
                </header>
                <Routes>
                    <Route path="/details/:id" element={<DetailsErrorBoundary />} />
                    <Route path="/" element={<SearchParams />} />
                </Routes>
            </QueryClientProvider>
        </BrowserRouter>
    );
};

const rootelement = document.getElementById("root");
const root = createRoot(rootelement);
root.render(<App />);