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
          placeholder="Your answer"
          className="w-full border-b-2 border-black/10 focus:border-[#673ab7] bg-transparent py-2 outline-none mt-2"
        />
      );

    case "DATE":
      return (
        <input
          type="date"
          value={value[0] ?? ""}
          onChange={(e) => onChange([e.target.value])}
          className="border border-black/10 rounded-lg px-3 py-2 mt-2 outline-none focus:border-[#673ab7]"
        />
      );

    case "MULTIPLE_CHOICE":
      return (
        <div className="mt-3 space-y-2">
          {(question.options ?? []).map((option) => (
            <label
              key={option}
              className="flex items-center gap-3 cursor-pointer py-1"
            >
              <input
                type="radio"
                name={question.id}
                checked={value[0] === option}
                onChange={() => onChange([option])}
                className="accent-[#673ab7] w-4 h-4"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      );

    case "CHECKBOX":
      return (
        <div className="mt-3 space-y-2">
          {(question.options ?? []).map((option) => {
            const checked = value.includes(option);
            return (
              <label
                key={option}
                className="flex items-center gap-3 cursor-pointer py-1"
              >
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
                  className="accent-[#673ab7] w-4 h-4"
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
