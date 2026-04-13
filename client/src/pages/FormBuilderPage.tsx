import { Link } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { useFormBuilder } from "../hooks/useFormBuilder";
import QuestionEditor from "../components/QuestionEditor";
import QuestionTypeIcon from "../components/QuestionTypeIcon";
import {
  ALL_QUESTION_TYPES,
  QUESTION_TYPE_LABELS,
} from "../utils/questionTypes";

function FormBuilderPage() {
  const builder = useFormBuilder();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
        <button
          type="button"
          onClick={builder.submit}
          disabled={!builder.canSubmit || builder.isSubmitting}
          className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#673ab7] text-white px-4 sm:px-5 py-2 rounded-full hover:bg-[#5e35a1] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
        >
          <Save className="w-4 h-4" />
          {builder.isSubmitting ? "Saving…" : "Save form"}
        </button>
      </div>

      {/* Title card with the signature purple top border */}
      <div className="bg-white rounded-xl border-t-[10px] border-t-[#673ab7] border border-black/10 p-4 sm:p-6">
        <input
          type="text"
          value={builder.title}
          onChange={(e) => builder.setTitle(e.target.value)}
          placeholder="Untitled form"
          className="w-full bg-transparent outline-none text-xl sm:text-2xl placeholder:text-gray-400 border-b-2 border-transparent focus:border-[#673ab7] pb-2"
        />
        {builder.validationErrors.title && (
          <p className="text-sm text-[#d4183d] mt-1">
            {builder.validationErrors.title}
          </p>
        )}
        <input
          type="text"
          value={builder.description}
          onChange={(e) => builder.setDescription(e.target.value)}
          placeholder="Form description"
          className="w-full bg-transparent outline-none mt-3 text-gray-500 border-b border-transparent focus:border-[#673ab7] pb-1"
        />
      </div>

      {/* Questions */}
      {builder.questions.map((question, index) => (
        <QuestionEditor
          key={question.id}
          question={question}
          index={index}
          error={builder.validationErrors.questions?.[question.id]}
          onChange={(patch) => builder.updateQuestion(question.id, patch)}
          onRemove={() => builder.removeQuestion(question.id)}
          onAddOption={() => builder.addOption(question.id)}
          onRemoveOption={(i) => builder.removeOption(question.id, i)}
          onUpdateOption={(i, value) =>
            builder.updateOption(question.id, i, value)
          }
        />
      ))}

      {/* Add question buttons */}
      <div className="bg-white rounded-xl border border-black/10 p-4 sm:p-5">
        <p className="text-sm text-gray-500 mb-3">Add a question</p>
        <div className="flex flex-wrap gap-2">
          {ALL_QUESTION_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => builder.addQuestion(type)}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 border border-black/10 rounded-full hover:bg-[#e9ebef] transition-colors text-sm"
            >
              <QuestionTypeIcon type={type} />
              {QUESTION_TYPE_LABELS[type]}
            </button>
          ))}
        </div>
      </div>

      {builder.submitError != null && (
        <p className="text-[#d4183d] text-sm">Failed to save form.</p>
      )}
    </div>
  );
}

export default FormBuilderPage;
