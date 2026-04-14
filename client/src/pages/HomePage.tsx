import { Link } from "react-router-dom";
import { FileText, Plus } from "lucide-react";
import { useGetFormsQuery } from "../api/generated";
import FormListItem from "../components/FormListItem";

function HomePage() {
  const { data, isLoading, error } = useGetFormsQuery();

  if (isLoading) {
    return <p className="text-gray-500">Loading forms…</p>;
  }

  if (error) {
    return <p className="text-red-600">Failed to load forms.</p>;
  }

  const forms = data?.forms ?? [];

  if (forms.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
          <FileText className="w-10 h-10 text-[#673ab7]" />
        </div>
        <h2 className="text-xl font-medium mb-2">No forms yet</h2>
        <p className="text-gray-500 mb-6">
          Create your first form to get started
        </p>
        <Link
          to="/forms/new"
          className="inline-flex items-center gap-2 bg-[#673ab7] text-white px-6 py-3 rounded-full hover:bg-[#5e35a1] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create New Form
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-sm text-gray-500 mb-3">Recent forms</h2>
      <div className="grid gap-4">
        {forms.map((form) => (
          <FormListItem
            key={form.id}
            id={form.id}
            title={form.title}
            description={form.description}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
