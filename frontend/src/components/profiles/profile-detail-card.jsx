'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProfileDetailCard({
  detailsLoading,
  detailsError,
  selectedProfile,
}) {
  if (detailsLoading) {
    return (
      <Card className="mb-6">
        <CardContent className="pt-6">
          <p className="text-muted-foreground">Loading profile details...</p>
        </CardContent>
      </Card>
    );
  }

  if (detailsError) {
    return (
      <Card className="mb-6">
        <CardContent className="pt-6">
          <p className="text-sm text-red-600">{detailsError}</p>
        </CardContent>
      </Card>
    );
  }

  if (!selectedProfile) return null;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Profile Detail</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 text-sm">
        <p>
          <span className="font-medium">Name:</span> {selectedProfile.name}
        </p>
        <p>
          <span className="font-medium">Email:</span> {selectedProfile.email}
        </p>
        <p>
          <span className="font-medium">Phone:</span>{' '}
          {selectedProfile.phone || '-'}
        </p>
        <p>
          <span className="font-medium">Address:</span>{' '}
          {selectedProfile.address || '-'}
        </p>
        <p>
          <span className="font-medium">DOB:</span> {selectedProfile.dob || '-'}
        </p>
      </CardContent>
    </Card>
  );
}
