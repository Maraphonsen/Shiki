/* eslint-disable no-unused-vars */
import axios from "axios";

const API_URL = 'https://shikimori.one/api';
const API_URLGRAPHQL = 'https://shikimori.one/api/graphql';
const api = axios.create({
  baseURL: API_URL,
});

export async function fetchAnimeList(searchTerm = '', limit = 50) {
  try {
    const query = `
      query ($search: String, $limit: Int) {
        animes(search: $search, limit: $limit, kind: "!special") {
          id
          malId
          name
          russian
          licenseNameRu
          english
          japanese
          synonyms
          kind
          rating
          score
          status
          episodes
          episodesAired
          duration
          airedOn { year month day date }
          releasedOn { year month day date }
          url
          season
          poster { id originalUrl mainUrl }
          fansubbers
          fandubbers
          licensors
          createdAt
          updatedAt
          nextEpisodeAt
          isCensored
          genres { id name russian kind }
          studios { id name imageUrl }
          externalLinks {
            id
            kind
            url
            createdAt
            updatedAt
          }
          description
          descriptionHtml
          descriptionSource
        }
      }
    `;

    const variables = {
      search: searchTerm,
      limit: limit
    };

    const response = await axios.post(API_URLGRAPHQL, {
      query,
      variables
    });

    return response.data.data.animes;
  } catch (error) {
    throw new Error('Ошибка загрузки аниме: ' + error.message);
  }
};

export const fetchMangaList = async (searchTerm = '', limit = 50) => {
  try {
    const query = `
      query ($search: String, $limit: Int) {
        mangas(search: $search, limit: $limit) {
    id
    malId
    name
    russian
    licenseNameRu
    english
    japanese
    synonyms
    kind
    score
    status
    volumes
    chapters
    airedOn { year month day date }
    releasedOn { year month day date }
    url

    poster { id originalUrl mainUrl }

    licensors
    createdAt,
    updatedAt,
    isCensored

    genres { id name russian kind }
    publishers { id name }

    externalLinks {
      id
      kind
      url
      createdAt
      updatedAt
    }

    personRoles {
      id
      rolesRu
      rolesEn
      person { id name poster { id } }
    }
    characterRoles {
      id
      rolesRu
      rolesEn
      character { id name poster { id } }
    }

    related {
      id
      anime {
        id
        name
      }
      manga {
        id
        name
      }
      relationKind
      relationText
    }

    scoresStats { score count }
    statusesStats { status count }

    description
    descriptionHtml
    descriptionSource
      }
    }
  `;
    const variables = { search: searchTerm, limit };
    const response = await axios.post(API_URLGRAPHQL, { query, variables });
    return response.data.data.mangas;
  } catch (error) {
    throw new Error('Ошибка загрузки манги: ' + error.message);
  }
};

export const fetchCharactersList = async (searchTerm = '', limit = 50) => {
  try {
    const query = `
      query ($search: String, $limit: Int) {
        characters(search: $search, limit: $limit) {
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

    const variables = {
      search: searchTerm,
      limit: limit
    };

    const response = await axios.post(API_URLGRAPHQL, { 
      query, 
      variables 
    });
    
    return response.data.data.characters || [];
  } catch (error) {
    throw new Error('Ошибка загрузки персонажей: ' + error.message);
  }
};

