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
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{profile.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 text-sm text-muted-foreground">
        <p>
          <span className="font-medium text-foreground">Email:</span>{' '}
          {profile.email}
        </p>
        <p>
          <span className="font-medium text-foreground">Phone:</span>{' '}
          {profile.phone || '-'}
        </p>
        <p>
          <span className="font-medium text-foreground">Address:</span>{' '}
          {profile.address || '-'}
        </p>
        <p>
          <span className="font-medium text-foreground">DOB:</span>{' '}
          {profile.dob || '-'}
        </p>

        <div className="mt-3 flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onView(profile.id)}
            disabled={disabled}
          >
            View
          </Button>
          <Button
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
