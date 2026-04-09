'use client';

import { Button } from '@/components/ui/button';

export default function ProfilesPagination({
  page,
  totalPages,
  total,
  hasPrev,
  hasNext,
  loading,
  onPrev,
  onNext,
}) {
  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Page {page}
        {totalPages > 0 ? ` of ${totalPages}` : ''} • Total {total}
      </p>

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          disabled={!hasPrev || loading}
          onClick={onPrev}
        >
          Previous
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={!hasNext || loading}
          onClick={onNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
