import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <nav className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">
            Forms
          </Link>
          <Link
            to="/forms/new"
            className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm"
          >
            Create new form
          </Link>
        </nav>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
