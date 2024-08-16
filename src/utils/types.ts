// Здесь типизируются данные о строке таблицы

export type RepositoryTableRowData = {
  id: string;
  name: string;
  primaryLanguage: string;
  forks: number;
  stargazers: number;
  updatedAt: string;
};

// Данные о репозитории, который возвращает api

export type RepositoryInfo = {
  id: string;
  name: string;
  description?: string;
  primaryLanguage: {
    name: string;
  } | null;
  forks: {
    totalCount: number;
  };
  stargazers: {
    totalCount: number;
  };
  updatedAt: string;
  licenseInfo: {
    name: string;
  } | null;
};
