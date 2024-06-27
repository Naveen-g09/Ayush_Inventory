//Fetch data
import { supabase } from "../supabase";
export const fetchData = async (table: string) => {
    try {
        const { data, error } = await supabase.from(table).select("*");
        if (error) {
            console.log("Error fetching data", error.message);
            return;
        }
        console.log("Fetched data", data);
        return data;
    } catch (error) {
        console.error("Error loading data:", error);
    }
};

//post data
export const postData = async (table: string, data: object) => {
    try {
        const { error } = await supabase.from(table).insert([data]);
        if (error) {
            console.log("Error inserting data", error.message);
            return;
        }
        console.log("Data inserted successfully");
    } catch (error) {
        console.error("Error inserting data:", error);
    }
};