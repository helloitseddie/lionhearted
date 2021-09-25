import axios from 'axios';

export const getAllTags = async () => {
    const query = `
    query {
      markersCollection {
        items {
          tagger
          coordinates {
            lat
            lon
          }
          location
          numSpotted
          numCaught
          waterDepth
          likes
          dislikes
          sys {
            id
          }
        }
      }
    }`;

    try {
        const response = await axios.post(`${process.env.REACT_APP_CONTENTFUL_URL}`, { query: query });
        return response.data.data.markersCollection.items;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const checkWater = async (coords) => {

  let lat = coords.lat;
  let lng = coords.lng;

  var url = (`https://api.onwater.io/api/v1/results/${lat},${lng}?access_token=${process.env.REACT_APP_ONWATER_ACCESS_TOKEN}`);
  try {
      const response = await fetch(url);
      const data = await response.json();
      return(data.water);
    } catch (error) {
      console.error(error);
    }
}

export const uploadTag = async (name, coords, location, depth, numSpotted, numCaught) => {
  const contentful = require('contentful-management')

  const client = contentful.createClient({
    accessToken: `${process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN}`
  })

  let lat = parseFloat(coords[0].replace(/\s/g, ''));
  let lng = parseFloat(coords[1].replace(/\s/g, ''));


  client.getSpace(`${process.env.REACT_APP_CONTENTFUL_SPACE_ID}`)
    .then((space) => space.getEnvironment(`${process.env.REACT_APP_CONTENTFUL_ENVIRONMENT}`))
    .then((environment) => environment.createEntry('markers', {
      fields: {
        tagger: {
          'en-US': name
        },
        coordinates: {
          'en-US': { lat: lat, lon: lng}
        },
        location: {
          'en-US': location
        },
        waterDepth: {
          'en-US': depth
        },
        numSpotted: {
          'en-US': numSpotted
        },
        numCaught: {
          'en-US': numCaught
        },
        likes: {
          'en-US': 0
        },
        dislikes: {
          'en-US': 0
        }
      }
    }))
    .then((entry) => entry.publish())
    .catch(console.error)

}

export const addLikeOrDislike = async (isLike, id, numLikes) => {

  const contentful = require('contentful-management')

  const client = contentful.createClient({
    accessToken: `${process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN}`
  })

  client.getSpace(`${process.env.REACT_APP_CONTENTFUL_SPACE_ID}`)
    .then((space) => space.getEnvironment(`${process.env.REACT_APP_CONTENTFUL_ENVIRONMENT}`))
    .then((environment) => environment.getEntry(`${id}`))
    .then((entry) => {
      if (isLike) {
        entry.fields.likes['en-US'] = numLikes + 1;
      } else {
        entry.fields.dislikes['en-US'] = numLikes + 1;
      }
      return entry.update()
    })
    .then((entry) => entry.publish())
    .catch(console.error)
}
