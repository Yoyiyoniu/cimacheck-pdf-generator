import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const searchStaffByName = async (query: string) => {
	try {
		const { data, error } = await supabase
			.from("staff")
			.select("nombre")
			.ilike("nombre", `%${query}%`)
			.order("nombre", { ascending: true })
			.limit(5);

		if (error) throw error;

		return data.map((item) => (item.nombre as string).split("|")[0].trim());
	} catch (error) {
		console.error(error);
		throw Error("Error al buscar los datos");
	}
};
