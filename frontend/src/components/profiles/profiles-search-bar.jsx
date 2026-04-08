'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ProfilesSearchBar({
  searchInput,
  onSearchInputChange,
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
      <div className="flex gap-2">
        <Button type="submit">Search</Button>
        <Button type="button" variant="outline" onClick={onClear}>
          Clear
        </Button>
      </div>
    </form>
  );
}
