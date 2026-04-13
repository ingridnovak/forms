import type { QuestionType } from "../api/generated";
import type { DraftQuestion } from "../hooks/useFormBuilder";
import {
  ALL_QUESTION_TYPES,
  QUESTION_TYPE_LABELS,
  questionNeedsOptions,
} from "../utils/questionTypes";

type Props = {
  question: DraftQuestion;
  index: number;
  error?: string;
  onChange: (patch: Partial<DraftQuestion>) => void;
  onRemove: () => void;
  onAddOption: () => void;
  onRemoveOption: (index: number) => void;
  onUpdateOption: (index: number, value: string) => void;
};

function QuestionEditor({
  question,
  index,
  error,
  onChange,
  onRemove,
  onAddOption,
  onRemoveOption,
  onUpdateOption,
}: Props) {
  const showOptions = questionNeedsOptions(question.type);

  return (
    <div className="border bg-white rounded p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">Question {index + 1}</span>
        <button
          type="button"
          onClick={onRemove}
          className="text-sm text-red-600 hover:underline"
        >
          Remove
        </button>
      </div>

      <input
        type="text"
        value={question.text}
        onChange={(e) => onChange({ text: e.target.value })}
        placeholder="Question text"
        className="w-full border rounded px-3 py-2"
      />

      <select
        value={question.type}
        onChange={(e) => onChange({ type: e.target.value as QuestionType })}
        className="border rounded px-3 py-2"
      >
        {ALL_QUESTION_TYPES.map((type) => (
          <option key={type} value={type}>
            {QUESTION_TYPE_LABELS[type]}
          </option>
        ))}
      </select>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {showOptions && (
        <div className="space-y-2 pl-4 border-l-2">
          {question.options.map((option, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                value={option}
                onChange={(e) => onUpdateOption(i, e.target.value)}
                placeholder={`Option ${i + 1}`}
                className="flex-1 border rounded px-3 py-1.5 text-sm"
              />
              <button
                type="button"
                onClick={() => onRemoveOption(i)}
                className="text-sm text-red-600 px-2"
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={onAddOption}
            className="text-sm text-blue-600 hover:underline"
          >
            + Add option
          </button>
        </div>
      )}
    </div>
  );
}

export default QuestionEditor;
