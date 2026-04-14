type Answer = {
  questionId: string;
  values: string[];
};

type Props = {
  index: number;
  submittedAt: string;
  answers: Answer[];
  questionTextById: Map<string, string>;
};

const formatDate = (iso: string) => new Date(iso).toLocaleString();
const formatValues = (values: string[]) =>
  values.length === 0 ? "—" : values.join(", ");

function ResponseCard({
  index,
  submittedAt,
  answers,
  questionTextById,
}: Props) {
  return (
    <div className="bg-white rounded-xl border border-black/10 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-black/10">
        <span className="font-medium">Response #{index + 1}</span>
        <span className="text-sm text-gray-500">{formatDate(submittedAt)}</span>
      </div>
      <div className="space-y-4">
        {answers.map((answer) => (
          <div key={answer.questionId}>
            <p className="text-gray-500 text-sm mb-1">
              {questionTextById.get(answer.questionId) ?? "Unknown question"}
            </p>
            <p>{formatValues(answer.values)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResponseCard;
