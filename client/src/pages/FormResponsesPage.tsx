import { useParams } from "react-router-dom";

function FormResponsesPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h2 className="text-xl font-semibold">Responses</h2>
      <p className="text-gray-600">Responses for form id: {id}</p>
    </div>
  );
}

export default FormResponsesPage;
