import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";

import IndexPage from "./pages/index";

const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="auto" />
      <IndexPage />
    </QueryClientProvider>
  );
}
