import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { account } from '../lib/appwrite';
import { ID } from 'appwrite';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        return await account.get();
      } catch (error) {
        return null;
      }
    },
  });

  const login = useMutation({
    mutationFn: async ({ email, password }) => {
      return await account.createEmailSession(email, password);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      navigate('/dashboard');
    },
  });

  const register = useMutation({
    mutationFn: async ({ email, password, firstName, lastName }) => {
      const name = `${firstName} ${lastName}`;
      await account.create(ID.unique(), email, password, name);
      return await account.createEmailSession(email, password);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      navigate('/dashboard');
    },
  });

  const logout = async () => {
    await account.deleteSession('current');
    queryClient.invalidateQueries({ queryKey: ['user'] });
    navigate('/login');
  };

  return {
    user,
    login,
    register,
    logout,
  };
}