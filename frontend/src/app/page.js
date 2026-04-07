'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ProtectedShell from '@/components/protected-shell';
import Nav from '@/components/nav';
import { fetchProfiles } from '@/lib/services/profile-service';

export default function HomePage() {
  const [profiles, setProfiles] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [hasPrev, setHasPrev] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isCancelled = false;

    async function loadProfiles() {
      setLoading(true);
      setError('');

      try {
        const response = await fetchProfiles({
          page,
          limit,
          search: searchQuery,
        });

        if (isCancelled) return;

        setProfiles(Array.isArray(response?.data) ? response.data : []);
        setHasPrev(Boolean(response?.has_prev));
        setHasNext(Boolean(response?.has_next));
        setTotal(Number(response?.total || 0));
        setTotalPages(Number(response?.total_pages || 0));
      } catch (requestError) {
        if (isCancelled) return;

        const message =
          requestError?.response?.data?.msg ||
          requestError?.response?.data?.message ||
          'Failed to fetch profiles';

        setProfiles([]);
        setError(message);
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    loadProfiles();

    return () => {
      isCancelled = true;
    };
  }, [page, limit, searchQuery]);

  function handleSearchSubmit(event) {
    event.preventDefault();
    setPage(1);
    setSearchQuery(searchInput.trim());
  }

  function handleClearSearch() {
    setSearchInput('');
    setSearchQuery('');
    setPage(1);
  }

  return (
    <ProtectedShell>
      <main className="mx-auto min-h-screen max-w-6xl p-6">
        <Nav />

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Profiles</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSearchSubmit}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <Input
                type="text"
                placeholder="Search by name, email, phone"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
              />
              <div className="flex gap-2">
                <Button type="submit">Search</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClearSearch}
                >
                  Clear
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profile Listing</CardTitle>
          </CardHeader>
          <CardContent>
            {loading && (
              <p className="text-muted-foreground">Loading profiles...</p>
            )}

            {!loading && error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            {!loading && !error && profiles.length === 0 && (
              <p className="text-muted-foreground">No profiles found.</p>
            )}

            {!loading && !error && profiles.length > 0 && (
              <>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {profiles.map((profile) => (
                    <Card key={profile.id}>
                      <CardHeader>
                        <CardTitle className="text-base">
                          {profile.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-1 text-sm text-muted-foreground">
                        <p>
                          <span className="font-medium text-foreground">
                            Email:
                          </span>{' '}
                          {profile.email}
                        </p>
                        <p>
                          <span className="font-medium text-foreground">
                            Phone:
                          </span>{' '}
                          {profile.phone || '-'}
                        </p>
                        <p>
                          <span className="font-medium text-foreground">
                            Address:
                          </span>{' '}
                          {profile.address || '-'}
                        </p>
                        <p>
                          <span className="font-medium text-foreground">
                            DOB:
                          </span>{' '}
                          {profile.dob || '-'}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

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
                      onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                    >
                      Previous
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      disabled={!hasNext || loading}
                      onClick={() => setPage((prev) => prev + 1)}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </main>
    </ProtectedShell>
  );
}
