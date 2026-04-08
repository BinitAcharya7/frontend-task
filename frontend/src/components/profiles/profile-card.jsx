'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ProfileCard({
  profile,
  onView,
  onEdit,
  onDelete,
  disabled,
}) {
  const isSeedProfile = typeof profile?.id === 'number';

  return (
    <Card className="border-gray-400 p-4 border rounded-4xl flex-col text-left shadow-black bg-linear-120 from-blue-950 via-purple-950 to-blue-950 text-white">
      <CardHeader>
        <CardTitle className="text-base font-extrabold">
          {profile.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 text-sm text-white">
        <p>
          <span className="font-medium text-green-500">Email:</span>{' '}
          {profile.email}
        </p>
        <p>
          <span className="font-medium text-green-500">Phone:</span>{' '}
          {profile.phone || '-'}
        </p>
        <p>
          <span className="font-medium text-green-500">Address:</span>{' '}
          {profile.address || '-'}
        </p>
        <p>
          <span className="font-medium text-green-500">DOB:</span>{' '}
          {profile.dob || '-'}
        </p>

        {isSeedProfile && (
          <p className="text-xs text-amber-500">Seed profile (Read Only)</p>
        )}

        <div className="mt-3 flex gap-2">
          <Button
            className="text-purple-500"
            type="button"
            variant="outline"
            onClick={() => onView(profile.id)}
            disabled={disabled}
          >
            View
          </Button>
          <Button
            className="text-purple-500"
            type="button"
            variant="outline"
            onClick={() => onEdit(profile)}
            disabled={disabled}
          >
            Edit
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => onDelete(profile.id)}
            disabled={disabled}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
