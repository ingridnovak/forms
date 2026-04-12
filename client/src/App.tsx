import { useGetFormsQuery } from "./api/generated";

function App() {
  const { data, isLoading, error } = useGetFormsQuery();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-4">Forms</h1>
      {isLoading && <p>Loading…</p>}
      {error != null && <p className="text-red-600">Failed to load</p>}
      {data && (
        <ul className="space-y-2">
          {data.forms.map((f) => (
            <li key={f.id} className="border p-2 rounded">
              <strong>{f.title}</strong>
              {f.description && <p className="text-sm">{f.description}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
