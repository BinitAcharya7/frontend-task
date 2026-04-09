'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function ProfileDetailCard({
  open,
  onOpenChange,
  detailsLoading,
  detailsError,
  selectedProfile,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl border-b bg-linear-120 from-blue-950 via-purple-950 to-blue-950 text-white">
        <DialogHeader>
          <DialogTitle>Profile Details</DialogTitle>
          <DialogDescription>Read-only profile information.</DialogDescription>
        </DialogHeader>

        {detailsLoading && (
          <p className="text-sm text-muted-foreground">
            Loading profile details...
          </p>
        )}

        {!detailsLoading && detailsError && (
          <p className="text-sm text-red-600">{detailsError}</p>
        )}

        {!detailsLoading && !detailsError && selectedProfile && (
          <div className="space-y-1 text-sm">
            <p>
              <span className="font-medium text-green-500">Name:</span>{' '}
              {selectedProfile.name}
            </p>
            <p>
              <span className="font-medium text-green-500">Email:</span>{' '}
              {selectedProfile.email}
            </p>
            <p>
              <span className="font-medium text-green-500">Phone:</span>{' '}
              {selectedProfile.phone || '-'}
            </p>
            <p>
              <span className="font-medium text-green-500">Address:</span>{' '}
              {selectedProfile.address || '-'}
            </p>
            <p>
              <span className="font-medium text-green-500">DOB:</span>{' '}
              {selectedProfile.dob || '-'}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
