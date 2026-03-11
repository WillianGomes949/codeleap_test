'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dev.codeleap.co.uk/careers/',
});

// Tipagem do Post baseada no documento
export interface Post {
  id: number;
  username: string;
  created_datetime: string;
  title: string;
  content: string;
}

export function usePosts() {
  const queryClient = useQueryClient();

  // 1. FETCH (READ) - Busca os posts
  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data } = await api.get<{ results: Post[] }>('');
      // O documento pede para ordenar pelos mais recentes no topo
      return data.results;
    },
    refetchInterval: 10000, // Opcional: atualiza a cada 10s para ver posts de outros usuários
  });

  // 2. CREATE
  const createMutation = useMutation({
    mutationFn: (newPost: Pick<Post, 'username' | 'title' | 'content'>) => 
      api.post('', newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  // 3. UPDATE (PATCH)
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number, data: Pick<Post, 'title' | 'content'> }) => 
      api.patch(`${id}/`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  // 4. DELETE
  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`${id}/`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  return {
    posts: postsQuery.data ?? [],
    isLoading: postsQuery.isLoading,
    isError: postsQuery.isError,
    createPost: createMutation.mutate,
    updatePost: updateMutation.mutate,
    deletePost: deleteMutation.mutate,
    isCreating: createMutation.isPending,
  };
}