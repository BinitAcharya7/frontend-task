import apiClient from '@/lib/api-client';

export async function fetchProfiles({
  page = 1,
  limit = 12,
  search = '',
} = {}) {
  const response = await apiClient.get('/api/profiles', {
    params: {
      page,
      limit,
      search,
    },
  });

  return response.data;
}

export async function fetchProfileById(id) {
  const response = await apiClient.get(`/api/profiles/${id}`);
  return response.data;
}

export async function createProfile(payload) {
  const response = await apiClient.post('/api/profiles', payload);
  return response.data;
}

export async function updateProfile(id, payload) {
  const response = await apiClient.put(`/api/profiles/${id}`, payload);
  return response.data;
}

export async function deleteProfile(id) {
  const response = await apiClient.delete(`/api/profiles/${id}`);
  return response.data;
}
