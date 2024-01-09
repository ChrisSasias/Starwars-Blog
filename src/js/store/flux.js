const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		people: [],
		planets: [],
		starships: [],
		favorites: [],
		currentPerson: null,
		currentPlanet: null,
		currentStarship: null,
	  },
	  actions: {
		fetchPeople: async (resource = "people", page = 1, count = 0) => {
		  if (count >= 10) {
			return;
		  }
  
		  const resp = await fetch(
			`https://swapi.dev/api/${resource}/?page=${page}`
		  );
		  const data = await resp.json();
  
		  const peopleWithId = data.results.map((person) => {
			const urlParts = person.url.split("/");
			const id = urlParts[urlParts.length - 2];
			return { ...person, id };
		  });
  
		  setStore({ people: [...getStore().people, ...peopleWithId] });
  
		  if (data.next) {
			getActions().fetchPeople(resource, page + 1, count + 1);
		  }
		},
  
		fetchPersonDetails: async (id) => {
		  try {
			const url = `https://swapi.dev/api/people/${id}/`;
			const response = await fetch(url);
			if (!response.ok) {
			  throw new Error("Failed to fetch person details");
			}
			const data = await response.json();
			setStore({ currentPerson: data });
		  } catch (error) {
			console.error("Error fetching person details: ", error);
		  }
		},
  
		fetchPlanets: async (resource = "planets", page = 1, count = 0) => {
		  if (count >= 10) {
			return;
		  }
  
		  const resp = await fetch(
			`https://swapi.dev/api/${resource}/?page=${page}`
		  );
		  const data = await resp.json();
  
		  const planetsWithId = data.results.map((planet) => {
			const urlParts = planet.url.split("/");
			const id = urlParts[urlParts.length - 2];
			return { ...planet, id };
		  });
  
		  setStore({ planets: [...getStore().planets, ...planetsWithId] });
  
		  if (data.next) {
			getActions().fetchPlanets(resource, page + 1, count + 1);
		  }
		},
  
		fetchPlanetDetail: async (id) => {
		  try {
			const url = `https://swapi.dev/api/planets/${id}/`; // Update the API endpoint to fetch planet details
			const response = await fetch(url);
			if (!response.ok) {
			  throw new Error("Failed to fetch planet details"); // Update the error message
			}
			const data = await response.json();
			setStore({ currentPlanet: data }); // Set the currentPlanet in the store
		  } catch (error) {
			console.error("Error fetching planet details: ", error); // Update the error message
		  }
		},
  
		fetchStarShips: async (resource = "starships", page = 1, count = 0) => {
		  if (count >= 10) {
			return;
		  }
  
		  const resp = await fetch(
			`https://swapi.dev/api/${resource}/?page=${page}`
		  );
		  const data = await resp.json();
  
		  const starshipsWithId = data.results.map((starship) => {
			const urlParts = starship.url.split("/");
			const id = urlParts[urlParts.length - 2];
			return { ...starship, id };
		  });
  
		  setStore({ starships: [...getStore().starships, ...starshipsWithId] });
  
		  if (data.next) {
			getActions().fetchStarShips(resource, page + 1, count + 1);
		  }
		},
		fetchStarshipDetails: async (id) => {
		  try {
			
			const url = `https://swapi.dev/api/starships/${id}/`; 
			const response = await fetch(url);
			if (!response.ok) {
			  throw new Error("Failed to fetch starship details"); // Update the error message
			}
			const data = await response.json();
			setStore({ currentStarship: data }); // Set the currentStarship in the store
		  } catch (error) {
			console.error("Error fetching starship details: ", error); // Update the error message
		  }
		},
		addFavorites: (name, id, type) => {
		  const store = getStore();
		  
		  const newFavorite = { name, id, type}; 
		  const newFavorites = [...store.favorites, newFavorite];
		  setStore({ favorites: newFavorites });
		},
  
		removeFavorites: (name) => {
		  const store = getStore();
		  const newFavorites = store.favorites.filter(
			(favorite) => favorite.name !== name
		  );
		  setStore({ favorites: newFavorites });
		},
	  },
	};
  };
  
  export default getState;
