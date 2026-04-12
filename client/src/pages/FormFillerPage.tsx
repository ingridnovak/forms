import { useParams } from "react-router-dom";

function FormFillerPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h2 className="text-xl font-semibold">Fill form</h2>
      <p className="text-gray-600">Form filler for id: {id}</p>
    </div>
  );
}

export default FormFillerPage;
