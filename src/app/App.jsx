import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import { AuthProvider } from "@auth/model/AuthProvider";
import ErrorBoundary from "@features/common/ErrorBoundary";
import MainLayout from "@widgets/layout/MainLayout";
import { PrivateRoute } from "@auth/ui/PrivateRoute";


function App() {
  const Home = lazy(() => import("@pages/Home/Home"));
      const Login = lazy(() => import("@pages/Login/Login"));
      const CategoryPage = lazy(() => import("@features/categories/ui/CategoryPage"));
      const DetailPage = lazy(() => import("@features/details/ui/DetailPage"));
      const NotFound = lazy(() => import("@pages/NotFound/NotFound"));
  
  return (
    <BrowserRouter>
    <AuthProvider>
      <MainLayout />
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
                path="/category/:type"
                element={
                  <PrivateRoute>
                    <CategoryPage />
                  </PrivateRoute>
                }
                />
            <Route
              path="/category/:type/:id"
              element={
                <PrivateRoute>
                  <DetailPage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
        </Routes>        </Suspense>
      </ErrorBoundary>
    </AuthProvider>
    </BrowserRouter> 
  );
}

export default App;