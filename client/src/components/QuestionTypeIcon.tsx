import { Type, CircleDot, CheckSquare, Calendar } from "lucide-react";
import type { QuestionType } from "../api/generated";

type Props = {
  type: QuestionType;
  className?: string;
};

function QuestionTypeIcon({ type, className = "w-4 h-4" }: Props) {
  switch (type) {
    case "TEXT":
      return <Type className={className} />;
    case "MULTIPLE_CHOICE":
      return <CircleDot className={className} />;
    case "CHECKBOX":
      return <CheckSquare className={className} />;
    case "DATE":
      return <Calendar className={className} />;
  }
}

export default QuestionTypeIcon;
