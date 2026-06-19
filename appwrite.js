import {Client, Databases, Query, ID, TablesDB} from 'appwrite'

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_ID
const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT

const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID)

const database = new TablesDB(client);

export const updateSearchcount = async (searchterm,movie) => {
    try {
        const result = await database.listRows(DATABASE_ID,  TABLE_ID, [Query.equal('searchTerm', searchterm)]);
        
        if (result.rows.length > 0) {
            const document = result.rows[0];
            await database.updateRow(DATABASE_ID, TABLE_ID, document.$id, { count: document.count + 1 });
        }
        else {
            await database.createRow(DATABASE_ID, TABLE_ID, ID.unique(), { searchTerm: searchterm, count: 1, movieID: movie.id, posterURL: `https://image.tmdb.org/t/p/w500${movie.poster_path}` });
        }
    }
    catch (error) {
        console.error('Error updating search count:', error);
    }
}
export const getTrending = async () => {
    try {
        const result = await database.listRows(DATABASE_ID, TABLE_ID, [Query.limit(5),Query.orderDesc('count')]);
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching trending searches:', error);
    }
}