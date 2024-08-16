import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchRepositories } from 'api/githubApi';
import { RepositoryInfo } from 'utils/types';

export const fetchRepositoriesByQuery = createAsyncThunk(
  'repositories/fetchRepositoriesByQuery',
  async (query: string) => fetchRepositories(query)
);

// Структура стейта в нашем слайсе

type RepositoriesState = {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  repositories: RepositoryInfo[];
  selectedRepository?: RepositoryInfo | null;
  error?: string;
};

const initialState: RepositoriesState = {
  loading: 'idle',
  repositories: [],
  selectedRepository: null,
  error: '',
};

const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {
    // Выбираем репозиторий для просмотра детальной информации по id
    selectRepository: (state, action) => {
      state.selectedRepository = state.repositories.find(
        (repo) => repo.id === action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepositoriesByQuery.pending, (state) => {
        state.loading = 'pending';
        state.selectedRepository = null;
      })
      .addCase(fetchRepositoriesByQuery.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.repositories = action.payload;
      })
      .addCase(fetchRepositoriesByQuery.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to fetch repositories';
      });
  },
});

export const { selectRepository } = repositoriesSlice.actions;

export default repositoriesSlice.reducer;
