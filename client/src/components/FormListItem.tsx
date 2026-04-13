import { Link } from "react-router-dom";

type Props = {
  id: string;
  title: string;
  description?: string | null;
};

function FormListItem({ id, title, description }: Props) {
  return (
    <li className="border bg-white rounded p-4 flex items-start justify-between">
      <div>
        <h3 className="font-semibold">{title}</h3>
        {description && (
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        )}
      </div>
      <div className="flex gap-2 shrink-0">
        <Link
          to={`/forms/${id}/fill`}
          className="text-sm text-blue-600 hover:underline"
        >
          View form
        </Link>
        <span className="text-gray-300">|</span>
        <Link
          to={`/forms/${id}/responses`}
          className="text-sm text-blue-600 hover:underline"
        >
          View responses
        </Link>
      </div>
    </li>
  );
}

export default FormListItem;
