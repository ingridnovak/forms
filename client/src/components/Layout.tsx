import { Link, Outlet, useLocation } from "react-router-dom";
import { FileText, Plus } from "lucide-react";

function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen bg-[#f0ebf8]">
      <header className="bg-white border-b border-black/10 px-4 sm:px-6 py-3 sm:py-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#673ab7] rounded-lg flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-base sm:text-lg font-medium truncate">Forms</h1>
          </Link>
          {isHome && (
            <Link
              to="/forms/new"
              className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#673ab7] text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-full hover:bg-[#5e35a1] transition-colors text-sm font-medium shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Create Form</span>
              <span className="sm:hidden">New</span>
            </Link>
          )}
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
