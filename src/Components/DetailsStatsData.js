import React, { Component } from 'react';

class DetailsStatsData extends Component{

    static getStatsList(){
        return [
            {label:'Points', render: this.getPoints, extParam: 0},
            {label:'Goals', render: this.getGoals, extParam: 0},
            {label:'Asists', render: this.getAsists, extParam: 0},
            {label:'Missed Penalties', render: this.getMissedPenalties, extParam: 0},
            {label:'Clean Sheets', render: this.getCleanSheets, extParam: 0},
            {label:'Goals Conceded', render: this.getGoalsConceded, extParam: 0},
            {label:'Own Goals', render: this.getOwnGoals, extParam: 0},
            {label:'Saved Penalties', render: this.getSavedPenalties, extParam: 0},
            {label:'Saves', render: this.getSaves, extParam: 0},
            {label:'Bonus Points', render: this.getBonusPoints, extParam: 0},
            {label:'Yellow/Red Cards', render: this.getYellowRedCards, extParam: 0},
            {label:'Minutes Played', render: this.getMinutesPlayed, extParam: 0},
            {label:'Games Played', render: this.getGamesPlayed, extParam: 1},
            {label:'Points/Game', render: this.getPointsPerGame, extParam: 0},
            {label:'Played 1-59 minutes', render: this.get59MinutesPlayed, extParam: 1},
            {label:'Played >59 minutes', render: this.get60MinutesPlayed, extParam: 1},
            {label:'Avg. Minutes/Game', render: this.getMinutesPerGame, extParam: 1},
            {label:'Avg. Minutes/Event', render: this.getMinutesPerEvent, extParam: 1},
            {label:<span>ICT<a className={'link'} href={'https://www.premierleague.com/news/65567'} target={'blank'}>(?)</a></span>, render: this.getICT, extParam: 0},

        ]
    }

    static getPoints(player){
        return player.total_points
    }

    static getGoals(player){
        return player.goals_scored;
    }

    static getAsists(player){
        return player.assists;
    }

    static getMissedPenalties(player){
        return player.penalties_missed;
    }
    static getCleanSheets(player){
        return player.clean_sheets;
    }

    static getGoalsConceded(player){
        return player.goals_conceded;
    }
    static getOwnGoals(player){
        return player.own_goals;
    }
    static getSavedPenalties(player){
        return player.penalties_saved;
    }

    static getSaves(player){
        return player.saves;
    }

    static getBonusPoints(player){
        return player.bonus;
    }

    static getYellowRedCards(player){
        return `${player.yellow_cards}/${player.red_cards}`;
    }

    static getMinutesPlayed(player){
        return player.minutes;
    }

    static getPointsPerGame(player){
        return player.points_per_game;
    }

    static getGamesPlayed(extPlayer){
        let gamesPlayed = 0;
        extPlayer.history.map(event => {
            if(event.minutes > 0){
                gamesPlayed++
            }
            return event;
        });
        return gamesPlayed;
    }

    static getMinutesPerGame(extPlayer){
        let gamesPlayed = 0;
        let minutesPlayed = 0;
        extPlayer.history.map(event => {
            if(event.minutes > 0){
                gamesPlayed++;
                minutesPlayed  += event.minutes;
            }
            return event;

        });
        return (minutesPlayed/gamesPlayed).toFixed(1);
    }

    static getMinutesPerEvent(extPlayer){
        let minutesPlayed = 0;
        let eventsNumber = extPlayer.history.length;
        extPlayer.history.map(event => {
            minutesPlayed  += event.minutes;
            return event;
        });
        return (minutesPlayed/eventsNumber).toFixed(1);
    }

    static get59MinutesPlayed(extPlayer){
        let gamesPlayed = 0;
        extPlayer.history.map(event => {
            if(event.minutes > 0 && event.minutes < 60){
                gamesPlayed++;
            }
            return event;
        });
        return gamesPlayed;
    }

    static get60MinutesPlayed(extPlayer){
        let gamesPlayed = 0;
        extPlayer.history.map(event => {
            if(event.minutes >= 60){
                gamesPlayed++;
            }
            return event;
        });
        return gamesPlayed;
    }

    static getICT(player){
        return player.ict_index;
    }

}


export default DetailsStatsData;