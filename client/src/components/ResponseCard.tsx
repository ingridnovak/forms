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

function ResponseCard({ index, submittedAt, answers, questionTextById }: Props) {
  return (
    <div className="bg-white border rounded p-4 space-y-3">
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Response #{index + 1}</span>
        <span>{formatDate(submittedAt)}</span>
      </div>
      <dl className="space-y-2">
        {answers.map((answer) => (
          <div key={answer.questionId}>
            <dt className="text-sm font-medium text-gray-700">
              {questionTextById.get(answer.questionId) ?? "Unknown question"}
            </dt>
            <dd className="text-sm text-gray-900">
              {formatValues(answer.values)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default ResponseCard;
