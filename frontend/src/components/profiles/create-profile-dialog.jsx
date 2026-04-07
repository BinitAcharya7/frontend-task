'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  address: '',
  dob: '',
};

export default function CreateProfileDialog({ onCreate, disabled = false }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [formError, setFormError] = useState('');

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function resetForm() {
    setForm(INITIAL_FORM);
    setFormError('');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError('');

    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.address ||
      !form.dob
    ) {
      setFormError('All fields are required.');
      return;
    }

    try {
      await onCreate(form);
      resetForm();
      setOpen(false);
    } catch (error) {
      setFormError(error?.message || 'Failed to create profile');
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) {
          resetForm();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button type="button" disabled={disabled}>
          Create Profile
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Create Profile</DialogTitle>
          <DialogDescription>
            Fill all fields to create a new profile.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-2">
          <Input
            placeholder="Name"
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(event) => updateField('email', event.target.value)}
          />
          <Input
            placeholder="Phone"
            value={form.phone}
            onChange={(event) => updateField('phone', event.target.value)}
          />
          <Input
            placeholder="Address"
            value={form.address}
            onChange={(event) => updateField('address', event.target.value)}
          />
          <Input
            type="date"
            value={form.dob}
            onChange={(event) => updateField('dob', event.target.value)}
          />

          <div className="sm:col-span-2 flex items-center justify-between gap-3 pt-1">
            {formError ? (
              <p className="text-sm text-red-600">{formError}</p>
            ) : (
              <span />
            )}
            <Button type="submit" disabled={disabled}>
              {disabled ? 'Saving...' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
