const days_week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function getFormattedDate(epoch) {
    let date = new Date(epoch);
    return `${days_week[date.getDay()]} - ${month_names[date.getMonth()]} ${date.getDate()}`
} 

export function getGameStartTimeObject(date) {
    return {
        'hour': (date.getHours() % 12).toString(), 
        'min': date.getMinutes() < 10 ? '0' + date.getMinutes().toString() : date.getMinutes().toString(),
        'period': date.getHours() > 12 ? 'AM' : 'PM'
    };
}

export function getTeamObject(team) {
    console.log(team);
    return {
        name: team.team_name,
        image: team.logo,
        abbreviation: team.abbreviation,
        wins: team.wins,
        losses: team.losses
    }
    /*
    return {
        name: 'Cloud 9', 
        image: 'https://cdn.pandascore.co/images/team/image/1097/cloud9-gnd9b0gn.png', 
        wins: 2, 
        losses: 0
    };*/
}

export async function fetchTeamInfo(teamID) {
    const response = await fetch(`/api/teams/${teamID}`);
    if (!response.ok) {
      throw new Error("Error retrieving data");
    }
    let team = await response.json();
    return team;
}