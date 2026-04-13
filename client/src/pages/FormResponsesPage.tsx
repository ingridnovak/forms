import { useParams } from "react-router-dom";
import { useFormResponses } from "../hooks/useFormResponses";
import ResponseCard from "../components/ResponseCard";

function FormResponsesPage() {
  const { id } = useParams<{ id: string }>();
  const { form, responses, questionTextById, isLoading, error } =
    useFormResponses(id);

  if (isLoading) {
    return <p className="text-gray-500">Loading responses…</p>;
  }

  if (error || !form) {
    return <p className="text-red-600">Form not found.</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">{form.title}</h2>
        <p className="text-sm text-gray-500 mt-1">
          {responses.length} response{responses.length === 1 ? "" : "s"}
        </p>
      </div>

      {responses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No responses yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {responses.map((response, index) => (
            <ResponseCard
              key={response.id}
              index={index}
              submittedAt={response.submittedAt}
              answers={response.answers}
              questionTextById={questionTextById}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FormResponsesPage;
