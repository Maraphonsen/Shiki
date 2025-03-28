/* eslint-disable no-unused-vars */
import axios from "axios";

const API_URL = 'https://shikimori.one/api';
const API_URLGRAPHQL = 'https://shikimori.one/api/graphql';
const api = axios.create({
  baseURL: API_URL,
});

export async function fetchAnimeList(searchTerm = '', limit = 20) {
  try {
    const response = await api.get('/animes', {
      params: {
        search: searchTerm,
        limit: limit
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Ошибка загрузки аниме');
  }
}

export async function fetchMangaList(searchTerm = '', limit = 20) {
  try {
    const response = await api.get('/mangas', {
      params: {
        search: searchTerm,
        limit: limit
      }
    });
    return response.data
  } catch (error) {
    throw new Error('Ошибка загрузки манги')
  }
}

// export async function fetchCharacterList(searchTerm = '', limit = 20) {
//   try {
//     const response = await api.post('/graphql', {
//     });
//     return response.data;
//   } catch (error) {
//     throw new Error('Ошибка загрузки персонажей: ' + error.message);
//   }
// }


export const fetchCharactersList = async () => {
  try {
    const query = `
      query {
        characters(page: 1, limit: 20) {
          id
          malId
          name
          russian
          japanese
          synonyms
          url
          createdAt
          updatedAt
          isAnime
          isManga
          isRanobe
          poster { 
            id 
            originalUrl 
            mainUrl 
          }
          description
          descriptionHtml
          descriptionSource
        }
      }
    `;

    const response = await axios.post(API_URLGRAPHQL, { query });
    return response.data.data.characters;
  } catch (error) {
    throw new Error('Ошибка загрузки персонажей: ' + error.message);
  }
};



export async function fetchAnimeById(id) {
  try {
    const response = await api.get(`/animes/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Ошибка загрузки аниме');
  }
}

export async function fetchMangaById(id) {
  try {
    const response = await api.get(`/mangas/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Ошибка загрузки манги');
  }
}

export async function fetchAnimeCharacters(animeId) {
  try {
    const response = await api.get(`/animes/${animeId}/characters`);
    return response.data;
  } catch (error) {
    throw new Error('Ошибка загрузки персонажей аниме');
  }
}

export async function fetchMangaCharacters(mangaId) {
  try {
    const response = await api.get(`/mangas/${mangaId}/characters`);
    return response.data;
  } catch (error) {
    throw new Error('Ошибка загрузки персонажей манги');
  }
}

export async function fetchRelatedAnime(animeId) {
  try {
    const response = await api.get(`/animes/${animeId}/related`);
    return response.data;
  } catch (error) {
    throw new Error('Ошибка загрузки связанных аниме');
  }
}

export async function fetchRelatedManga(mangaId) {
  try {
    const response = await api.get(`/mangas/${mangaId}/related`);
    return response.data;
  } catch (error) {
    throw new Error('Ошибка загрузки связанной манги');
  }
}