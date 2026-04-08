'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function EditProfileForm({
  open,
  editForm,
  setEditForm,
  onSubmit,
  onCancel,
  actionLoading,
}) {
  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          onCancel();
        }
      }}
    >
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update the selected profile details.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={onSubmit}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          <Input
            placeholder="Name"
            value={editForm.name}
            onChange={(event) =>
              setEditForm((prev) => ({ ...prev, name: event.target.value }))
            }
          />
          <Input
            type="email"
            placeholder="Email"
            value={editForm.email}
            onChange={(event) =>
              setEditForm((prev) => ({ ...prev, email: event.target.value }))
            }
          />
          <Input
            placeholder="Phone"
            value={editForm.phone}
            onChange={(event) =>
              setEditForm((prev) => ({ ...prev, phone: event.target.value }))
            }
          />
          <Input
            placeholder="Address"
            value={editForm.address}
            onChange={(event) =>
              setEditForm((prev) => ({ ...prev, address: event.target.value }))
            }
          />
          <Input
            type="date"
            value={editForm.dob}
            onChange={(event) =>
              setEditForm((prev) => ({ ...prev, dob: event.target.value }))
            }
          />
          <div className="flex gap-2">
            <Button type="submit" disabled={actionLoading}>
              {actionLoading ? 'Saving...' : 'Save'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={actionLoading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
