'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// Configuração da API baseada na imagem enviada
const api = axios.create({
  baseURL: 'https://dev.codeleap.co.uk/careers',
});

export interface Post {
  id: number;
  username: string;
  created_datetime: string;
  title: string;
  content: string;
}

export function usePosts() {
  const queryClient = useQueryClient();

  // 1. FETCH - Busca os posts (adicionando a barra final obrigatória)
  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      // A API retorna um objeto com a chave "results"
      const { data } = await api.get<{ results: Post[] }>('/'); 
      return data.results;
    },
    // Atualiza automaticamente para garantir que novos posts apareçam
    refetchInterval: 5000, 
  });

  // 2. CREATE
  const createMutation = useMutation({
    mutationFn: (newPost: Pick<Post, 'username' | 'title' | 'content'>) => 
      api.post('/', newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  // 3. UPDATE - Formato /id/ é crucial para essa API
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number, data: Pick<Post, 'title' | 'content'> }) => 
      api.patch(`/${id}/`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  // 4. DELETE - Formato /id/ é crucial
  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/${id}/`),
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