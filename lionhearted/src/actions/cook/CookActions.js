import axios from 'axios';

export const getRecipes = async () => {
    const query = `
    query {
      recipesCollection {
        items {
          title
          picture {
            title
            description
            contentType
            fileName
            size
            url
            width
            height
          }
          link
        }
      }
    }`;

    try {
        const response = await axios.post(`${process.env.REACT_APP_CONTENTFUL_URL}`, { query: query });
        return response.data.data.recipesCollection.items;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const searchRecipes = async (searchPhrase) => {
    const query = `
    query {
      recipesCollection(where: {
        OR: [
          {title_contains:"${searchPhrase}"}
        ]
      }) {
        items {
          title
          picture {
            title
            description
            contentType
            fileName
            size
            url
            width
            height
          }
          link
        }
      }
    }`;

    try {
        const response = await axios.post(`${process.env.REACT_APP_CONTENTFUL_URL}`, { query: query });
        return response.data.data.recipesCollection.items;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
