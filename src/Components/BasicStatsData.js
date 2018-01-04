import React, { Component } from 'react';

class BasicStatsData extends Component{

    static getStatsList(){
        return [
            {code:'points_total', label:'Points', render: this.getPoints, extParam: 0, compare: this.standard},
            {code:'avg_points_per_game', label:'Avg. points per played game', render: this.getAvgPoints, extParam: 1, compare: this.noCompare},
            {code:'avg_points_last_games',label:'Avg. points last 3 games', render: this.getForm, extParam: 0, compare: this.standard},
            {code:'price_now',label:'Price', render: this.getPrice, extParam: 0, compare: this.noCompare},
            {code:'goals_assists_clean',label: 'Goals + Assists + Clean Sheets', render: this.getGAC, extParam:0, compare: this.standard},
            {code:'season_price_change',label:'Season Price Change', render: this.getSeasonPriceChange, extParam: 0, compare: this.standard},
            {code:'week_price_change',label:'Week Price Change', render: this.getWeekPriceChange, extParam: 0, compare: this.standard},
            {code:'next_matches',label:'Next Matches', render: this.getNextMatches, extParam: 1, compare: this.noCompare},
            {code:'news',label:'News', render: this.getNews, extParam: 0, compare: this.noCompare}
        ]
    }

    static getPoints(player){
        return player.total_points
    }


    static getAvgPoints(playerExt){
        let gamesPlayed = 0;
        let points = 0;
        playerExt.history.map(event => {
            if(event.minutes > 0){
                points += event.total_points;
                gamesPlayed++
            }
            return event;
        });
        return (points/gamesPlayed).toFixed(1);
    }

    static getForm(player){
        return player.form;
    }

    static getPrice(player){
        return <span>&#163;{player.now_cost/10}</span>;
    }

    static getGAC(player){
        return player.goals_scored + player.assists + player.clean_sheets
    }

    static getSeasonPriceChange(player){
        return player.cost_change_start/10;
    }
    static getWeekPriceChange(player){
        return player.cost_change_event/10;
    }
    static getNextMatches(playerExt){
        let result = playerExt.fixtures_summary.map(function (event, key) {
            let homeOrAway = (event.is_home) ? 'H' : 'A';
            let eventHover = (e) =>{
                let info = document.createElement('div');
                info.textContent += `${event.kickoff_time_formatted}: ${event.opponent_name} ${homeOrAway} (${event.difficulty})`;
                info.className += `extended-event-info difficulty-${event.difficulty}`;
                info.id += `${event.code}`;
                let position = e.target.getBoundingClientRect();
                info.setAttribute("style", `border: 1px solid black; position: fixed; top: ${position.bottom+3}px; left: ${position.left}px; border-radius: 5px;`);
                document.body.appendChild(info);
            };

            let exitEventHover = (e) =>{
                let info = document.getElementById(`${event.code}`);
                if(info){
                    info.outerHTML = "";
                }
            };

            return <span onMouseEnter={eventHover} onMouseLeave={exitEventHover} key={key} className={`difficulty-${event.difficulty} difficulty-cell`}
            data-kickoff={event.kickoff_time_formatted} data-oponent={event.opponent_name}>
                {event.opponent_short_name} <br/> ({homeOrAway})
            </span>
        });
        return result;
    }

    static getChanceOfPlayingNextWeek(player){
        if(!player.chance_of_playing_next_round){
            return 'N/D'
        }
        return <span>{player.chance_of_playing_next_round}%</span>;
    }
    static getNews(player){
        return player.news;
    }


    static standard(a,b){
        return (parseFloat(a) >= parseFloat(b) ? a : b);
    }

    static noCompare(a,b){
        return false
    }

}


export default BasicStatsData;