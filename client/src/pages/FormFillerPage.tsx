import { Link, useParams } from "react-router-dom";
import { useFormFiller } from "../hooks/useFormFiller";
import QuestionInput from "../components/QuestionInput";

function FormFillerPage() {
  const { id } = useParams<{ id: string }>();
  const filler = useFormFiller(id);

  if (filler.isLoading) {
    return <p className="text-gray-500">Loading form…</p>;
  }

  if (filler.loadError || !filler.form) {
    return <p className="text-red-600">Form not found.</p>;
  }

  if (filler.isSuccess) {
    return (
      <div className="bg-white border rounded p-6 text-center space-y-3">
        <p className="text-green-700 font-semibold">
          Form submitted successfully!
        </p>
        <Link to="/" className="text-blue-600 hover:underline text-sm">
          Back to all forms
        </Link>
      </div>
    );
  }

  const { form } = filler;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">{form.title}</h2>
        {form.description && (
          <p className="text-gray-600 mt-1">{form.description}</p>
        )}
      </div>

      <div className="space-y-4">
        {form.questions.map((question, index) => (
          <div
            key={question.id}
            className="bg-white border rounded p-4 space-y-2"
          >
            <label className="block font-medium">
              {index + 1}. {question.text}
            </label>
            <QuestionInput
              question={question}
              value={filler.answers[question.id] ?? []}
              onChange={(values) => filler.setAnswer(question.id, values)}
            />
          </div>
        ))}
      </div>

      {filler.submitError != null && (
        <p className="text-red-600 text-sm">Failed to submit response.</p>
      )}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={filler.submit}
          disabled={filler.isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {filler.isSubmitting ? "Submitting…" : "Submit"}
        </button>
      </div>
    </div>
  );
}

export default FormFillerPage;
