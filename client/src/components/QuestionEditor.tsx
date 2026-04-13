import { Trash2, Calendar, Plus, ChevronDown } from "lucide-react";
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
    <div className="bg-white rounded-xl border border-black/10 p-4 sm:p-5 hover:shadow-sm transition-shadow">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm text-gray-500 shrink-0">Q{index + 1}</span>
        <div className="group relative ml-auto max-w-[160px]">
          <select
            value={question.type}
            onChange={(e) => onChange({ type: e.target.value as QuestionType })}
            className="appearance-none w-full border border-black/10 rounded-lg pl-3 pr-8 py-1.5 text-sm bg-white truncate cursor-pointer focus:outline-none focus:border-[#673ab7]"
          >
            {ALL_QUESTION_TYPES.map((type) => (
              <option key={type} value={type}>
                {QUESTION_TYPE_LABELS[type]}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none transition-transform duration-200 group-focus-within:rotate-180" />
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="shrink-0 p-1.5 text-gray-500 hover:text-[#d4183d] rounded-lg hover:bg-red-50 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <input
        type="text"
        value={question.text}
        onChange={(e) => onChange({ text: e.target.value })}
        placeholder="Question text"
        className="w-full border-b-2 border-[#673ab7] bg-transparent py-2 outline-none placeholder:text-gray-400"
      />

      {error && <p className="text-sm text-[#d4183d] mt-2">{error}</p>}

      {showOptions && (
        <div className="mt-4 space-y-2">
          {question.options.map((option, i) => (
            <div key={i} className="flex items-center gap-2">
              {question.type === "MULTIPLE_CHOICE" ? (
                <div className="w-4 h-4 rounded-full border-2 border-gray-400 shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded border-2 border-gray-400 shrink-0" />
              )}
              <input
                type="text"
                value={option}
                onChange={(e) => onUpdateOption(i, e.target.value)}
                placeholder={`Option ${i + 1}`}
                className="flex-1 border-b border-black/10 py-1 bg-transparent outline-none focus:border-[#673ab7]"
              />
              {question.options.length > 1 && (
                <button
                  type="button"
                  onClick={() => onRemoveOption(i)}
                  className="p-1 text-gray-500 hover:text-[#d4183d]"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={onAddOption}
            className="text-[#673ab7] text-sm flex items-center gap-1 mt-2 hover:underline"
          >
            <Plus className="w-3.5 h-3.5" /> Add option
          </button>
        </div>
      )}

      {question.type === "TEXT" && (
        <div className="mt-3 border-b border-dashed border-black/10 py-2 text-gray-400 text-sm">
          Short answer text
        </div>
      )}

      {question.type === "DATE" && (
        <div className="mt-3 border-b border-dashed border-black/10 py-2 text-gray-400 text-sm flex items-center gap-2">
          <Calendar className="w-4 h-4" /> Month, day, year
        </div>
      )}
    </div>
  );
}

export default QuestionEditor;
