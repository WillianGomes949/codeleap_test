'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useUser } from '../context/UserContext';

const API_URL = 'https://dev.codeleap.co.uk/careers';

export interface Post {
  id: number;
  username: string;
  created_datetime: string;
  title: string;
  content: string;
}

interface CreatePostData {
  username: string;
  title: string;
  content: string;
}

interface UpdatePostData {
  title: string;
  content: string;
}

const fetchPosts = async (): Promise<Post[]> => {
  // Quebra cache do Firefox
  const url = `${API_URL}/?t=${Date.now()}`;
  
  const response = await fetch(url, {
    method: 'GET',
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  
  const data = await response.json();
  return data.results || [];
};

const createPostApi = async (postData: CreatePostData): Promise<Post> => {
  const response = await fetch(`${API_URL}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create post');
  }
  
  return response.json();
};

const updatePostApi = async (id: number, postData: UpdatePostData): Promise<Post> => {
  const response = await fetch(`${API_URL}/${id}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update post');
  }
  
  return response.json();
};

const deletePostApi = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}/`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete post');
  }
};

export function usePosts() {
  const queryClient = useQueryClient();
  const { username } = useUser();

  // Query para buscar posts - PÚBLICA (não requer login)
  const { data: posts = [], isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    refetchInterval: 30000,
    staleTime: 10000,
  });

  const createMutation = useMutation({
    mutationFn: createPostApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdatePostData }) => 
      updatePostApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePostApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const createPost = (
    data: Omit<CreatePostData, 'username'>,
    options?: { onSuccess?: () => void; onError?: () => void }
  ) => {
    if (!username) {
      throw new Error('Must be logged in to create post');
    }
    
    createMutation.mutate(
      { ...data, username },
      { onSuccess: options?.onSuccess, onError: options?.onError }
    );
  };

  const updatePost = (
    id: number,
    data: UpdatePostData,
    options?: { onSuccess?: () => void }
  ) => {
    if (!username) {
      throw new Error('Must be logged in to update post');
    }
    
    updateMutation.mutate(
      { id, data },
      { onSuccess: options?.onSuccess }
    );
  };

  const deletePost = (
    id: number,
    options?: { onSuccess?: () => void }
  ) => {
    if (!username) {
      throw new Error('Must be logged in to delete post');
    }
    
    deleteMutation.mutate(id, { onSuccess: options?.onSuccess });
  };

  return {
    posts,
    isLoading,
    error,
    createPost,
    updatePost,
    deletePost,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}