import { Posts } from "./Posts";
import "./App.css";
import { QueryClient, QueryClientProvider, queryOptions } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 3, // Default stale time (5 minutes)
    },
  }
});

function App() {
  return (
    // provide React Query client to App
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Blog &apos;em Ipsum</h1>
        <Posts />
      </div>
      <ReactQueryDevtools/>
    </QueryClientProvider>    

  );
}

export default App;
