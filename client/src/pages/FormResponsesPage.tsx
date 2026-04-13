import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Inbox } from "lucide-react";
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
    return (
      <div className="bg-white rounded-xl p-8 text-center">
        <h2 className="font-medium mb-2">Form not found</h2>
        <Link to="/" className="text-[#673ab7] hover:underline">
          Go back home
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

      {/* Title card with purple top border */}
      <div className="bg-white rounded-xl border-t-[10px] border-t-[#673ab7] border border-black/10 p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-medium">{form.title}</h2>
        <p className="text-gray-500 mt-1">
          {responses.length} response{responses.length === 1 ? "" : "s"}
        </p>
      </div>

      {responses.length === 0 ? (
        <div className="bg-white rounded-xl border border-black/10 p-12 text-center">
          <Inbox className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="font-medium mb-2">No responses yet</h3>
          <p className="text-gray-500 mb-4">
            Share this form to start collecting responses
          </p>
          <Link
            to={`/forms/${form.id}/fill`}
            className="text-[#673ab7] hover:underline"
          >
            Fill out this form
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
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
