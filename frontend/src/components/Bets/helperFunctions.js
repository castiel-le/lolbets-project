const daysWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/**
 * Formats the date in the way desired for the bets page
 * @param {Date} epoch epoch time of match start
 * @returns the date formatted as follows: Monday - February 13
 */
export function getFormattedDate(epoch) {
    let date = new Date(epoch);
    return `${daysWeek[date.getDay()]} - ${monthNames[date.getMonth()]} ${date.getDate()}`
}

/**
 * seperates the start time of the game into a json object
 * @param {Date} date 
 * @returns 
 */
export function getGameStartTimeObject(date) {
    let hour = date.getHours() % 12;
    if (hour === 0) {
        hour = 12;
    }
    hour = hour.toString();
    return {
        'hour': hour,
        'min': date.getMinutes() < 10 
            ? '0' + date.getMinutes().toString() 
            : date.getMinutes().toString(),
        'period': date.getHours() < 12 ? 'AM' : 'PM'
    };
}

/**
 * returns a formatted json in the format needed for BetBox
 * @param {JSON} team team object obtained from a fetch
 * @returns JSON of team details
 */
export function getTeamObject(team) {
    return {
        name: team.team_name,
        image: team.logo,
        abbreviation: team.abbreviation,
        wins: team.wins,
        losses: team.losses
    }
}

/**
 * Fetchs the team info for a specific team if
 * @param {number} teamID team id you wish to fetch
 * @returns JSON promise
 */
export async function fetchTeamInfo(teamID) {
    const response = await fetch(`/api/teams/${teamID}`);
    if (!response.ok) {
        throw new Error("Error retrieving data");
    }
    let team = await response.json();
    return team;
}