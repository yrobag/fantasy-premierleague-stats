import { Component } from 'react';

class LastMatchesStatsData extends Component{

    static getStatsList(){
        return [
            {label:'Points', render: this.getPoints, extParam: 1},
            {label:'Minutes Played', render: this.getMinutesPlayed, extParam: 1},
            {label:'Goals', render: this.getGoals, extParam: 1},
            {label:'Asists', render: this.getAsists, extParam: 1},
            {label:'Clean Sheets', render: this.getCleanSheets, extParam: 1},
            {label:'Bonus Points', render: this.getBonusPoints, extParam: 1},
            {label:'Missed Penalties', render: this.getMissedPenalties, extParam: 1},
            {label:'Goals Conceded', render: this.getGoalsConceded, extParam: 1},
            {label:'Own Goals', render: this.getOwnGoals, extParam: 1},
            {label:'Saved Penalties', render: this.getSavedPenalties, extParam: 1},
            {label:'Yellow', render: this.getYellowCards, extParam: 1},
            {label:'Red Cards', render: this.getRedCards, extParam: 1},
        ]
    }

    static getLastMatchesStats(extPlayer, param) {
        let result = [];
        let total = 0;
        extPlayer.history_summary.map(event => {
            result.push(event[param]);
            total += event[param];
            return event;
        });
        result.push(total);
        return result
    }

    static getPoints(extPlayer){
        let points = LastMatchesStatsData.getLastMatchesStats(extPlayer, 'total_points');
        return `${points[0]}/${points[1]}/${points[2]}`
    }
    static getMinutesPlayed(extPlayer){
        let points = LastMatchesStatsData.getLastMatchesStats(extPlayer, 'minutes');
        return `${points[0]}/${points[1]}/${points[2]}`
    }

    static getGoals(extPlayer){
        let points = LastMatchesStatsData.getLastMatchesStats(extPlayer, 'goals_scored');
        return `${points[0]}/${points[1]}/${points[2]}`
    }

    static getAsists(extPlayer){
        let points = LastMatchesStatsData.getLastMatchesStats(extPlayer, 'assists');
        return `${points[0]}/${points[1]}/${points[2]}`
    }

    static getMissedPenalties(extPlayer){
        let points = LastMatchesStatsData.getLastMatchesStats(extPlayer, 'penalties_missed');
        return `${points[0]}/${points[1]}/${points[2]}`
    }

    static getCleanSheets(extPlayer){
        let points = LastMatchesStatsData.getLastMatchesStats(extPlayer, 'clean_sheets');
        return `${points[0]}/${points[1]}/${points[2]}`
    }

    static getGoalsConceded(extPlayer){
        let points = LastMatchesStatsData.getLastMatchesStats(extPlayer, 'clean_sheets');
        return `${points[0]}/${points[1]}/${points[2]}`
    }
    static getOwnGoals(extPlayer){
        let points = LastMatchesStatsData.getLastMatchesStats(extPlayer, 'own_goals');
        return `${points[0]}/${points[1]}/${points[2]}`
    }
    static getSavedPenalties(extPlayer){
        let points = LastMatchesStatsData.getLastMatchesStats(extPlayer, 'penalties_saved');
        return `${points[0]}/${points[1]}/${points[2]}`
    }

    static getBonusPoints(extPlayer){
        let points = LastMatchesStatsData.getLastMatchesStats(extPlayer, 'bonus');
        return `${points[0]}/${points[1]}/${points[2]}`
    }

    static getYellowCards(extPlayer){
        let points = LastMatchesStatsData.getLastMatchesStats(extPlayer, 'yellow_cards');
        return `${points[0]}/${points[1]}/${points[2]}`
    }

    static getRedCards(extPlayer){
        let points = LastMatchesStatsData.getLastMatchesStats(extPlayer, 'red_cards');
        return `${points[0]}/${points[1]}/${points[2]}`
    }






}


export default LastMatchesStatsData;