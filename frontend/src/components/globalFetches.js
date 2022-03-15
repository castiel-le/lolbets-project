/**
 * Fetchs the user coins from the database
 * @param {Number} userID if of current user
 * @returns 0 if fetch failed, otherwise a number of coins the user currently has
 */
export async function getUserCoins(userID) { 
    const response = await fetch(`/api/user/coins/${userID}`);
    if (response.ok) {
        return await response.json();
    } 
    return {coins: 0};
}
