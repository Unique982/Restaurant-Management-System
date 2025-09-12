import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Pagination() {
  const [page, setPage] = useState(1);
  const totalPages = 1;

  return (
    <>
      <p className="text-sm text-gray-500">
        Page {page} of {totalPages || 1}
      </p>
      <div className="flex items-center gap-2 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </Button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <Button
            key={num}
            variant={num === page ? "default" : "outline"}
            size="sm"
            onClick={() => setPage(num)}
          >
            {num}
          </Button>
        ))}

        <Button
          variant="outline"
          size="sm"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </>
  );
}
