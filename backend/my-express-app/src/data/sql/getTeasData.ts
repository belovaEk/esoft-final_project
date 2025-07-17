import sql from "./db";


interface GetTeasOptions {
    clientId?: number;

    sortBy?: 'popular' | 'price';
    direction?: 'ASC' | 'DESC';
    typeIds?: number[] ;
    countryIds?: number[];
    ingredientIds?: number[];
    tasteIds?: number[];
    minPrice?: number;
    maxPrice?: number;

    search?: string;
}

export async function getTeas(options?: GetTeasOptions) {
    let query = sql`
        SELECT tea.*,
               type.name AS type_name,
               country.name as country_name,
               CASE WHEN fav.tea_id IS NOT NULL THEN true ELSE false END as isFav,
               CASE WHEN cart.tea_id IS NOT NULL THEN true ELSE false END as isCart
        FROM tea
        JOIN type ON tea.type_id = type.id
        JOIN country ON tea.country_id = country.id
        LEFT JOIN favourite fav ON tea.id = fav.tea_id AND fav.client_id = ${options?.clientId || 0}
        LEFT JOIN cart ON tea.id = cart.tea_id AND cart.client_id = ${options?.clientId || 0}
        WHERE 1=1
    `;


    if(options?.typeIds?.length) {
        query = sql`${query} AND tea.type_id IN ${sql(options.typeIds)}`
    }

    if(options?.countryIds?.length) {
        query = sql`${query} AND tea.country_id IN ${sql(options.countryIds)}`
    }

    if (options?.minPrice) {
         query = sql`${query} AND tea.price >= ${Number(options.minPrice)}`;
    }
    if (options?.maxPrice) {
      query = sql`${query} AND tea.price <= ${Number(options.maxPrice)}`;
    }

    if (options?.ingredientIds?.length) {
        query = sql
        `${query} and tea.id in (
                select tea_id from tea_ingredient
                where ingredient_id in ${sql(options.ingredientIds)}
            )`
    }

    if (options?.tasteIds?.length) {
        query = sql
        `${query} and tea.id in (
                select tea_id from tea_taste
                where taste_id in ${sql(options.tasteIds)}
            )`
    }

    if (options?.search) {

        query = sql 
        `${query} and
        (tea.name ilike ${'%' + options.search + '%'} or type.name ilike ${'%' + options.search + '%'} or tea.description ilike ${'%' + options.search + '%'})`;
    }


    if (options?.sortBy) {

        const orderBy = options.sortBy === 'popular' ? sql`orders` : sql`price`;
        const direction = options.direction === 'ASC' ? sql`ASC` : sql`DESC`;
        
        query = sql`${query} ORDER BY ${orderBy} ${direction}`;
    }
    return await query;
}

export async function getFilterOptions(table: 'type' | 'country' | 'ingredient' | 'taste') {
    return await sql`SELECT id, name FROM ${sql(table)} ORDER BY name`;
}

export async function getTea(id: number, clientId?: number) {
    let teaQuery = sql`
        SELECT tea.*,
               type.name AS type_name,
               country.name as country_name,
            CASE WHEN fav.tea_id IS NOT NULL THEN true ELSE false END as isFav,
            CASE WHEN cart.tea_id IS NOT NULL THEN true ELSE false END as isCart
        FROM tea
        JOIN type ON tea.type_id = type.id
        JOIN country ON tea.country_id = country.id
        LEFT JOIN favourite fav ON tea.id = fav.tea_id AND fav.client_id = ${clientId || 0}
        LEFT JOIN cart ON tea.id = cart.tea_id AND cart.client_id = ${clientId || 0}
        WHERE tea.id = ${id}
    `;

    let ingredientsQuery =  sql
    `SELECT *
    FROM 
        tea_ingredient
    JOIN 
        ingredient ON ingredient.id = tea_ingredient.ingredient_id
    WHERE 
        tea_ingredient.tea_id = ${id};`

    let tastesQuery = sql
    `select *
    from tea_taste
    join taste on taste.id = tea_taste.taste_id
    where tea_taste.tea_id = ${id};`

   const [tea, ingredients, tastes] = await Promise.all([
        teaQuery,
        ingredientsQuery,
        tastesQuery
    ]);
    
    return {
        ...tea[0],
        ingredients: ingredients.map(i => i.name),
        tastes: tastes.map(t => t.name),
    };
}
