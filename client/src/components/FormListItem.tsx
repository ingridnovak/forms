import { Link } from "react-router-dom";
import { FileText, BarChart3 } from "lucide-react";

type Props = {
  id: string;
  title: string;
  description?: string | null;
};

function FormListItem({ id, title, description }: Props) {
  return (
    <div className="bg-white rounded-xl border border-black/10 p-5 hover:shadow-md transition-shadow">
      <div className="min-w-0">
        <h3 className="text-base font-medium truncate">
          {title || "Untitled form"}
        </h3>
        {description && (
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {description}
          </p>
        )}
      </div>
      <div className="flex gap-3 mt-4">
        <Link
          to={`/forms/${id}/fill`}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#673ab7] text-white rounded-full hover:bg-[#5e35a1] transition-colors text-sm"
        >
          <FileText className="w-3.5 h-3.5" />
          Fill Out
        </Link>
        <Link
          to={`/forms/${id}/responses`}
          className="inline-flex items-center gap-1.5 px-4 py-2 border border-black/10 rounded-full hover:bg-[#e9ebef] transition-colors text-sm"
        >
          <BarChart3 className="w-3.5 h-3.5" />
          Responses
        </Link>
      </div>
    </div>
  );
}

export default FormListItem;
