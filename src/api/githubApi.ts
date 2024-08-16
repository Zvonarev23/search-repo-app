import axios from 'axios';
import { RepositoryInfo } from 'utils/types';

const API_URL = 'https://api.github.com/graphql';

/*
  Функция для получения репозиториев на основе поискового запроса (query)
  Установил first: 50, чтобы получать первые 50 результатов.
*/

export const fetchRepositories = async (
  query: string
): Promise<RepositoryInfo[]> => {
  try {
    const response = await axios.post(
      API_URL,
      {
        query: `
          {
            search(query: "${query}", type: REPOSITORY, first: 50) {
              edges {
                node {
                  ... on Repository {
                    id
                    name
                    description
                    primaryLanguage {
                      name
                    }
                    forks {
                      totalCount
                    }
                    stargazers {
                      totalCount
                    }
                    updatedAt
                    licenseInfo {
                      name
                    }
                  }
                }
              }
            }
          }
        `,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      }
    );

    return response.data.data.search.edges.map(
      (edge: { node: RepositoryInfo }) => edge.node
    );
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    throw new Error(
      'Не удалось получить данные. Пожалуйста, попробуйте еще раз позже.'
    );
  }
};

