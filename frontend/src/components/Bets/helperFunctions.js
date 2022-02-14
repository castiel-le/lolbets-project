const days_week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/**
 * Formats the date in the way desired for the bets page
 * @param {Date} epoch epoch time of match start
 * @returns the date formatted as follows: Monday - February 13
 */
export function getFormattedDate(epoch) {
    let date = new Date(epoch);
    return `${days_week[date.getDay()]} - ${month_names[date.getMonth()]} ${date.getDate()}`
}

/**
 * seperates the start time of the game into a json object
 * @param {Date} date 
 * @returns 
 */
export function getGameStartTimeObject(date) {
    return {
        'hour': (date.getHours() % 12).toString(),
        'min': date.getMinutes() < 10 ? '0' + date.getMinutes().toString() : date.getMinutes().toString(),
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

/**
 * Sorts the matches into arrays , seperated by date
 * @param {*} matches all matches fetched from fb
 * @returns array of matches by date
 */
export function sortMatchesByDate(matches) {
    let matchesCurrentDate = [];
    let allDates = [];

    matches.forEach(element => {
        if (matchesCurrentDate.length === 0 || new Date(matchesCurrentDate[0].match_start_time).getDate() === new Date(element.match_start_time).getDate()) {
            matchesCurrentDate.push(element);
        } else {
            allDates.push(matchesCurrentDate);
            matchesCurrentDate = [];
        }
    });
    if (matchesCurrentDate.length > 0) {
        allDates.push(matchesCurrentDate);
    }
    return allDates;
}