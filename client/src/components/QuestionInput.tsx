import type { QuestionType } from "../api/generated";

type Question = {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[] | null;
};

type Props = {
  question: Question;
  value: string[];
  onChange: (values: string[]) => void;
};

function QuestionInput({ question, value, onChange }: Props) {
  switch (question.type) {
    case "TEXT":
      return (
        <input
          type="text"
          value={value[0] ?? ""}
          onChange={(e) => onChange([e.target.value])}
          className="w-full border rounded px-3 py-2"
        />
      );

    case "DATE":
      return (
        <input
          type="date"
          value={value[0] ?? ""}
          onChange={(e) => onChange([e.target.value])}
          className="border rounded px-3 py-2"
        />
      );

    case "MULTIPLE_CHOICE":
      return (
        <div className="space-y-2">
          {(question.options ?? []).map((option) => (
            <label key={option} className="flex items-center gap-2">
              <input
                type="radio"
                name={question.id}
                checked={value[0] === option}
                onChange={() => onChange([option])}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      );

    case "CHECKBOX":
      return (
        <div className="space-y-2">
          {(question.options ?? []).map((option) => {
            const checked = value.includes(option);
            return (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() =>
                    onChange(
                      checked
                        ? value.filter((v) => v !== option)
                        : [...value, option],
                    )
                  }
                />
                <span>{option}</span>
              </label>
            );
          })}
        </div>
      );
  }
}

export default QuestionInput;
