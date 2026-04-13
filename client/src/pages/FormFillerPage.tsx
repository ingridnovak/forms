import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useFormFiller } from "../hooks/useFormFiller";
import QuestionInput from "../components/QuestionInput";

function FormFillerPage() {
  const { id } = useParams<{ id: string }>();
  const filler = useFormFiller(id);

  if (filler.isLoading) {
    return <p className="text-gray-500">Loading form…</p>;
  }

  if (filler.loadError || !filler.form) {
    return (
      <div className="bg-white rounded-xl p-8 text-center">
        <h2 className="font-medium mb-2">Form not found</h2>
        <Link to="/" className="text-[#673ab7] hover:underline">
          Go back home
        </Link>
      </div>
    );
  }

  if (filler.isSuccess) {
    return (
      <div className="bg-white rounded-xl p-8 text-center max-w-md mx-auto">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="font-medium mb-2">Form submitted successfully!</h2>
        <p className="text-gray-500 mb-6">Your response has been recorded.</p>
        <Link
          to="/"
          className="inline-block px-5 py-2 bg-[#673ab7] text-white rounded-full hover:bg-[#5e35a1] transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const { form } = filler;

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
        {form.description && (
          <p className="text-gray-500 mt-2">{form.description}</p>
        )}
      </div>

      {/* Questions */}
      {form.questions.map((question, index) => (
        <div
          key={question.id}
          className="bg-white rounded-xl border border-black/10 p-4 sm:p-6"
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

      {filler.submitError != null && (
        <div className="bg-red-50 border border-red-200 text-[#d4183d] rounded-xl px-4 py-3">
          Failed to submit response.
        </div>
      )}

      <div>
        <button
          type="button"
          onClick={filler.submit}
          disabled={filler.isSubmitting}
          className="bg-[#673ab7] text-white px-8 py-2.5 rounded-full hover:bg-[#5e35a1] transition-colors disabled:opacity-50"
        >
          {filler.isSubmitting ? "Submitting…" : "Submit"}
        </button>
      </div>
    </div>
  );
}

export default FormFillerPage;
