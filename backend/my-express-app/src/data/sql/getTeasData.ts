import sql from "./db";


interface GetTeasOptions {
    sortBy?: 'popular' | 'price';
    direction?: 'ASC' | 'DESC';
    typeIds?: number[] ;
    countryIds?: number[];
    ingredientIds?: number[];
    tasteIds?: number[];
    minPrice?: number;
    maxPrice?: number;
}

export async function getTeas(options?: GetTeasOptions) {
    let query = sql`
        SELECT teas.*,
               types.name AS type_name,
               countries.name as country_name
        FROM teas
        JOIN types ON teas.type_id = types.id
        JOIN countries ON teas.country_id = countries.id
        WHERE 1=1
    `;

    if(options?.typeIds?.length) {
        query = sql`${query} AND teas.type_id IN ${sql(options.typeIds)}`
    }

    if(options?.countryIds?.length) {
        query = sql`${query} AND teas.country_id IN ${sql(options.countryIds)}`
    }

    if (options?.minPrice) {
         query = sql`${query} AND teas.price >= ${Number(options.minPrice)}`;
    }
    if (options?.maxPrice) {
      query = sql`${query} AND teas.price <= ${Number(options.maxPrice)}`;
    }

    if (options?.ingredientIds?.length) {
        query = sql
        `${query} and teas.id in (
                select tea_id from teas_ingredients 
                where ingredient_id in ${sql(options.ingredientIds)}
            )`
    }

    if (options?.tasteIds?.length) {
        query = sql
        `${query} and teas.id in (
                select tea_id from teas_tastes 
                where taste_id in ${sql(options.tasteIds)}
            )`
    }

    if (options?.sortBy) {

        const orderBy = options.sortBy === 'popular' ? sql`orders` : sql`price`;
        const direction = options.direction === 'ASC' ? sql`ASC` : sql`DESC`;
        
        query = sql`${query} ORDER BY ${orderBy} ${direction}`;

       
    }

    return await query;
}

export async function getFilterOptions(table: 'types' | 'countries' | 'ingredients' | 'tastes') {
    return await sql`SELECT id, name FROM ${sql(table)} ORDER BY name`;
}