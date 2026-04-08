'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
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
  const [formError, setFormError] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: INITIAL_FORM,
  });

  function resetForm() {
    reset(INITIAL_FORM);
    setFormError('');
  }

  async function onSubmit(values) {
    try {
      await onCreate(values);
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

      <DialogContent className="sm:max-w-xl border-gray-400 p-4 border rounded-2xl flex-col text-left shadow-black bg-linear-120 from-gray-900 via-slate-700 to-slate-950 text-white">
        <DialogHeader>
          <DialogTitle>Create Profile</DialogTitle>
          <DialogDescription>
            Fill all fields to create a new profile.
          </DialogDescription>
        </DialogHeader>

        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 sm:grid-cols-2"
        >
          <div className="space-y-1">
            <Input
              placeholder="Name"
              {...register('name', {
                required: 'Name is required',
              })}
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Input
              type="email"
              placeholder="Email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Enter a valid email',
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Input
              type="tel"
              inputMode="tel"
              placeholder="Phone"
              {...register('phone', {
                required: 'Phone is required',
                pattern: {
                  value: /^\d{10}$/,
                  message: 'Phone number must be exactly 10 digits',
                },
              })}
            />
            {errors.phone && (
              <p className="text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Input
              placeholder="Address"
              {...register('address', {
                required: 'Address is required',
              })}
            />
            {errors.address && (
              <p className="text-sm text-red-600">{errors.address.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Input
              type="date"
              {...register('dob', {
                required: 'Date of birth is required',
              })}
            />
            {errors.dob && (
              <p className="text-sm text-red-600">{errors.dob.message}</p>
            )}
          </div>

          <div className="sm:col-span-2 flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
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
