const BASE_API = 'https://yts.am/api/v2/';

class API {
  async getSuggestion(id) {
    const query = await fetch(`${BASE_API}movie_suggestions.json?movie_id=${id}`);
    const { data } = await query.json();
    return data.movies
  }
  async getMovies() {
    const query = await fetch(`${BASE_API}list_movies.json?`);
    const { data } = await query.json();
    return data.movies
  }
}
//asi creamos y exportamos e instanciamos una clase
export default new API();
