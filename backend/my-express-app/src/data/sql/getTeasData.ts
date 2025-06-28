import sql from "./db";


// export type sortedParamType = 'popularDESC' | 'popularASC' | 'priceDESC' | 'priceASC' | null

// export async function getTeas(param:sortedParamType){

//     if(param) {
//         switch(param){
//             case 'popularDESC':
//                 const popularTeasDESC = await sql
//                 `SELECT teas.*,
//                     types.name AS type_name,
//                     countries.name as country_name
//                 FROM teas
//                 JOIN types ON teas.type_id = types.id
//                 Join countries on teas.country_id = countries.id
//                 order by orders DESC;`;
//                 return popularTeasDESC
//             case 'popularASC':
//                 const popularTeasASC = await sql
//                 `SELECT teas.*,
//                     types.name AS type_name,
//                     countries.name as country_name
//                 FROM teas
//                 JOIN types ON teas.type_id = types.id
//                 Join countries on teas.country_id = countries.id
//                 order by orders ASC;`;
//                 return popularTeasASC
//             case 'priceDESC':
//                 const priceTeasDESC = await sql
//                 `SELECT teas.*,
//                     types.name AS type_name,
//                     countries.name as country_name
//                 FROM teas
//                 JOIN types ON teas.type_id = types.id
//                 Join countries on teas.country_id = countries.id
//                 order by price DESC;`;
//                 return priceTeasDESC
//             case 'priceASC':
//                  const priceTeasASC = await sql
//                 `SELECT teas.*,
//                     types.name AS type_name,
//                     countries.name as country_name
//                 FROM teas
//                 JOIN types ON teas.type_id = types.id
//                 Join countries on teas.country_id = countries.id
//                 order by price ASC;`;
//                 return priceTeasASC
//         }
//     }
//         const teas = await sql
//             `SELECT teas.*,
//                 types.name AS type_name,
//                 countries.name as country_name
//             FROM teas
//             JOIN types ON teas.type_id = types.id
//             Join countries on teas.country_id = countries.id;`;
//         return teas
// }


// export async function getTea(id: number) {
//     const tea = await sql 
//     `SELECT teas.*,
//                 types.name AS type_name,
//                 countries.name as country_name
//             FROM teas
//             JOIN types ON teas.type_id = types.id
//             Join countries on teas.country_id = countries.id
// 			where teas.id = ${id};`
//     return tea
// }








// export async function getTeasTypes() {
//     const types = await sql
//     `select (name) from types order by name`
//     return types
// }

// export async function getTeasCountries() {
//     const countries = await sql
//     `select (name) from countries order by name`
//     return countries
// }

// export async function getTeasIngredients() {
//     const ingredients = await sql
//     `select (name) from ingredients order by name`
//     return ingredients
// }


// export async function getTeasTastes() {
//     const tastes = await sql
//     `select (name) from tastes order by name`
//     return tastes
// }


interface GetTeasOptions {
    sortBy?: 'popular' | 'price';
    direction?: 'ASC' | 'DESC';
}

export async function getTeas(options?: GetTeasOptions) {
    const baseQuery = sql`
        SELECT teas.*,
               types.name AS type_name,
               countries.name as country_name
        FROM teas
        JOIN types ON teas.type_id = types.id
        JOIN countries ON teas.country_id = countries.id
    `;

    if (options?.sortBy) {
        const orderBy = options.sortBy === 'popular' ? sql`orders` : sql`price`;
        const direction = options.direction === 'ASC' ? sql`ASC` : sql`DESC`;
        
        return await sql`${baseQuery} ORDER BY ${orderBy} ${direction}`;
    }

    return await baseQuery;
}

export async function getFilterOptions(table: 'types' | 'countries' | 'ingredients' | 'tastes') {
    return await sql`SELECT id, name FROM ${sql(table)} ORDER BY name`;
}