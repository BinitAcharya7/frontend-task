'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ProfilesSearchBar({
  searchInput,
  sortBy,
  onSearchInputChange,
  onSortChange,
  onSearchSubmit,
  onClear,
}) {
  return (
    <form onSubmit={onSearchSubmit} className="flex flex-col gap-3 sm:flex-row">
      <Input
        type="text"
        placeholder="Search by name, email, phone"
        value={searchInput}
        onChange={(event) => onSearchInputChange(event.target.value)}
      />
      <select
        value={sortBy}
        onChange={(event) => onSortChange(event.target.value)}
        className="h-10 rounded-md border border-input bg-background px-3 text-sm"
      >
        <option value="name-asc">Name (A -{'>'} Z)</option>
        <option value="name-desc">Name (Z -{'>'} A)</option>
        <option value="dob-asc">DOB (Oldest first)</option>
        <option value="dob-desc">DOB (Youngest first)</option>
      </select>
      <div className="flex gap-2">
        <Button type="submit">Search</Button>
        <Button type="button" variant="outline" onClick={onClear}>
          Clear
        </Button>
      </div>
    </form>
  );
}
