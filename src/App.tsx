import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { DarkModeProvider } from "./context/DarkModeContext";

import ProtectedRoute from "./features/authentication/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import AppLayout from "./ui/AppLayout/AppLayout";

import Account from "./pages/Account";
import Booking from "./pages/Booking";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Checkin from "./pages/Checkin";
import PageNotFound from "./pages/PageNotFound";
import Settings from "./pages/Settings";
import Users from "./pages/Users";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 0 } },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <BrowserRouter
          future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
        >
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route index path="/bookings" element={<Bookings />} />
              <Route index path="/bookings/:bookingId" element={<Booking />} />
              <Route index path="/checkin/:bookingId" element={<Checkin />} />
              <Route index path="/cabins" element={<Cabins />} />
              <Route index path="/user" element={<Users />} />
              <Route index path="/account" element={<Account />} />
              <Route index path="/settings" element={<Settings />} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-center" gutter={8} />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
