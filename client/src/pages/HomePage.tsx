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
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">No forms yet.</p>
        <p className="text-sm text-gray-400">
          Click "Create new form" to get started.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">All forms</h2>
      <ul className="space-y-3">
        {forms.map((form) => (
          <FormListItem
            key={form.id}
            id={form.id}
            title={form.title}
            description={form.description}
          />
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
