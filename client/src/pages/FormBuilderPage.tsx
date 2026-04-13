import { useFormBuilder } from "../hooks/useFormBuilder";
import QuestionEditor from "../components/QuestionEditor";

function FormBuilderPage() {
  const builder = useFormBuilder();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Create new form</h2>

      <div className="bg-white border rounded p-4 space-y-3">
        <input
          type="text"
          value={builder.title}
          onChange={(e) => builder.setTitle(e.target.value)}
          placeholder="Form title"
          className="w-full border rounded px-3 py-2 text-lg font-semibold"
        />
        <textarea
          value={builder.description}
          onChange={(e) => builder.setDescription(e.target.value)}
          placeholder="Description (optional)"
          rows={2}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="space-y-3">
        {builder.questions.map((question, index) => (
          <QuestionEditor
            key={question.id}
            question={question}
            index={index}
            onChange={(patch) => builder.updateQuestion(question.id, patch)}
            onRemove={() => builder.removeQuestion(question.id)}
            onAddOption={() => builder.addOption(question.id)}
            onRemoveOption={(i) => builder.removeOption(question.id, i)}
            onUpdateOption={(i, value) =>
              builder.updateOption(question.id, i, value)
            }
          />
        ))}
      </div>

      <button
        type="button"
        onClick={builder.addQuestion}
        className="text-sm text-blue-600 hover:underline"
      >
        + Add question
      </button>

      {builder.submitError != null && (
        <p className="text-red-600 text-sm">Failed to save form.</p>
      )}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={builder.submit}
          disabled={!builder.canSubmit || builder.isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {builder.isSubmitting ? "Saving…" : "Save form"}
        </button>
      </div>
    </div>
  );
}

export default FormBuilderPage;
