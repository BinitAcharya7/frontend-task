'use client';

import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProtectedShell from '@/components/protected-shell';
import Nav from '@/components/nav';
import ProfilesSearchBar from '@/components/profiles/profiles-search-bar';
import CreateProfileDialog from '@/components/profiles/create-profile-dialog';
import ProfileCard from '@/components/profiles/profile-card';
import ProfilesPagination from '@/components/profiles/profiles-pagination';
import EditProfileForm from '@/components/profiles/edit-profile-form';
import ProfileDetailCard from '@/components/profiles/profile-detail-card';
import {
  createProfile,
  deleteProfile,
  fetchProfileById,
  fetchProfiles,
  updateProfile,
} from '@/lib/services/profile-service';

export default function HomePage() {
  const [profiles, setProfiles] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');
  const [refreshTick, setRefreshTick] = useState(0);

  const [hasPrev, setHasPrev] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');
  const [seedToastMessage, setSeedToastMessage] = useState('');

  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState('');

  const [editProfileId, setEditProfileId] = useState('');
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
  });

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
  }, [page, limit, searchQuery, refreshTick]);

  function mapErrorMessage(requestError, fallback = 'Something went wrong') {
    return (
      requestError?.response?.data?.msg ||
      requestError?.response?.data?.message ||
      fallback
    );
  }

  function resetActionMessages() {
    setActionError('');
    setActionSuccess('');
  }

  function showSeedToast(message) {
    setSeedToastMessage(message);
    window.setTimeout(() => {
      setSeedToastMessage('');
    }, 3000);
  }

  function handleSearchInputChange(value) {
    setSearchInput(value);
    setSearchQuery(value.trim());
    setPage(1);
  }

  function handleClearSearch() {
    setSearchInput('');
    setSearchQuery('');
    setPage(1);
  }

  async function handleCreateProfile(payload) {
    resetActionMessages();
    setActionLoading(true);

    try {
      await createProfile(payload);
      setActionSuccess('Profile created successfully.');
      setPage(1);
      setRefreshTick((prev) => prev + 1);
    } catch (requestError) {
      const message = mapErrorMessage(requestError, 'Failed to create profile');
      throw new Error(message);
    } finally {
      setActionLoading(false);
    }
  }

  async function handleViewProfile(id) {
    resetActionMessages();
    setDetailsError('');
    setDetailsLoading(true);
    setIsDetailOpen(true);

    if (typeof id === 'number') {
      const localProfile =
        profiles.find((profile) => profile.id === id) || null;
      setSelectedProfile(localProfile);
      setDetailsLoading(false);
      return;
    }

    try {
      const response = await fetchProfileById(id);
      setSelectedProfile(response || null);
    } catch (requestError) {
      setSelectedProfile(null);
      setDetailsError(mapErrorMessage(requestError, 'Failed to load details'));
    } finally {
      setDetailsLoading(false);
    }
  }

  function handleDetailDialogOpenChange(nextOpen) {
    setIsDetailOpen(nextOpen);
    if (!nextOpen) {
      setSelectedProfile(null);
      setDetailsError('');
      setDetailsLoading(false);
    }
  }

  function handleStartEdit(profile) {
    if (typeof profile?.id === 'number') {
      showSeedToast(
        'This seeded profile is read-only. Create a new profile to edit.',
      );
      return;
    }

    resetActionMessages();
    setEditProfileId(profile.id);
    setEditForm({
      name: profile.name || '',
      email: profile.email || '',
      phone: profile.phone || '',
      address: profile.address || '',
      dob: profile.dob || '',
    });
  }

  function handleCancelEdit() {
    setEditProfileId('');
    setEditForm({
      name: '',
      email: '',
      phone: '',
      address: '',
      dob: '',
    });
  }

  async function handleSaveEdit(event) {
    event.preventDefault();
    if (!editProfileId) return;

    resetActionMessages();
    setActionLoading(true);

    try {
      await updateProfile(editProfileId, editForm);
      setActionSuccess('Profile updated successfully.');
      setEditProfileId('');
      setRefreshTick((prev) => prev + 1);
      if (selectedProfile?.id === editProfileId) {
        setSelectedProfile((prev) => ({ ...prev, ...editForm }));
      }
    } catch (requestError) {
      setActionError(mapErrorMessage(requestError, 'Failed to update profile'));
    } finally {
      setActionLoading(false);
    }
  }

  async function handleDeleteProfile(id) {
    if (typeof id === 'number') {
      showSeedToast(
        'This seeded profile is read-only. Create a new profile to delete.',
      );
      return;
    }

    const confirmed = window.confirm('Delete this profile?');
    if (!confirmed) return;

    resetActionMessages();
    setActionLoading(true);

    try {
      await deleteProfile(id);
      setActionSuccess('Profile deleted successfully.');
      if (selectedProfile?.id === id) {
        setSelectedProfile(null);
      }

      if (profiles.length === 1 && page > 1) {
        setPage((prev) => Math.max(1, prev - 1));
      } else {
        setRefreshTick((prev) => prev + 1);
      }
    } catch (requestError) {
      setActionError(mapErrorMessage(requestError, 'Failed to delete profile'));
    } finally {
      setActionLoading(false);
    }
  }

  const sortedProfiles = useMemo(() => {
    const items = [...profiles];

    items.sort((a, b) => {
      if (sortBy === 'name-desc') {
        return String(b?.name || '').localeCompare(String(a?.name || ''));
      }

      if (sortBy === 'dob-asc') {
        return new Date(a?.dob || 0) - new Date(b?.dob || 0);
      }

      if (sortBy === 'dob-desc') {
        return new Date(b?.dob || 0) - new Date(a?.dob || 0);
      }

      return String(a?.name || '').localeCompare(String(b?.name || ''));
    });

    return items;
  }, [profiles, sortBy]);

  return (
    <ProtectedShell>
      <Nav />

      <main className="mx-auto min-h-screen w-full max-w-6xl p-6">
        {seedToastMessage && (
          <div className="fixed top-24 left-1/2 z-50 w-[min(92vw,32rem)] -translate-x-1/2 rounded-lg border border-rose-300 bg-linear-to-r from-rose-800/90 via-amber-600/90 to-rose-700/90 px-4 py-3 text-sm text-white shadow-lg backdrop-blur-sm">
            <p className="font-medium">❌ {seedToastMessage}</p>
          </div>
        )}

        <Card className="mb-6 border-gray-400 p-4 border rounded-2xl flex-col text-left shadow-black bg-linear-120 from-gray-900 via-slate-700 to-slate-900 text-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Profiles</CardTitle>
            <CreateProfileDialog
              onCreate={handleCreateProfile}
              disabled={actionLoading}
            />
          </CardHeader>
          <CardContent>
            <ProfilesSearchBar
              searchInput={searchInput}
              sortBy={sortBy}
              onSearchInputChange={handleSearchInputChange}
              onSortChange={setSortBy}
              onClear={handleClearSearch}
            />
          </CardContent>
        </Card>

        <EditProfileForm
          open={Boolean(editProfileId)}
          editForm={editForm}
          setEditForm={setEditForm}
          onSubmit={handleSaveEdit}
          onCancel={handleCancelEdit}
          actionLoading={actionLoading}
        />

        <ProfileDetailCard
          open={isDetailOpen}
          onOpenChange={handleDetailDialogOpenChange}
          detailsLoading={detailsLoading}
          detailsError={detailsError}
          selectedProfile={selectedProfile}
        />

        {(actionError || actionSuccess) && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              {actionError && (
                <p className="text-sm text-red-600">{actionError}</p>
              )}
              {actionSuccess && (
                <p className="text-sm text-emerald-700">{actionSuccess}</p>
              )}
            </CardContent>
          </Card>
        )}

        <Card className="border-gray-400 p-4 border rounded-4xl flex-col text-left shadow-black bg-linear-120 from-gray-900 via-slate-700 to-slate-950 text-white">
          <CardHeader>
            <CardTitle>Profiles</CardTitle>
          </CardHeader>
          <CardContent>
            {loading && profiles.length === 0 && (
              <p className="text-muted-foreground">Loading profiles...</p>
            )}

            {error && profiles.length === 0 && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            {error && profiles.length > 0 && (
              <p className="mb-4 text-sm text-red-600">{error}</p>
            )}

            {!loading && !error && profiles.length === 0 && (
              <p className="text-muted-foreground">No profiles found.</p>
            )}

            {profiles.length > 0 && (
              <>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {sortedProfiles.map((profile) => (
                    <ProfileCard
                      key={profile.id}
                      profile={profile}
                      onView={handleViewProfile}
                      onEdit={handleStartEdit}
                      onDelete={handleDeleteProfile}
                      disabled={actionLoading}
                    />
                  ))}
                </div>

                <ProfilesPagination
                  page={page}
                  totalPages={totalPages}
                  total={total}
                  hasPrev={hasPrev}
                  hasNext={hasNext}
                  loading={loading}
                  onPrev={() => setPage((prev) => Math.max(1, prev - 1))}
                  onNext={() => setPage((prev) => prev + 1)}
                />
              </>
            )}
          </CardContent>
        </Card>
      </main>
    </ProtectedShell>
  );
}
