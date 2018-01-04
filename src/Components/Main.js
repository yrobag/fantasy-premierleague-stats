import React, { Component } from 'react';
import PlayerLi from './PlayerLi';
import Filters from './Filters';
import SelectedPlayers from './SelectedPlayers';
import ViewHelper from "./ViewHelper";
import axios from 'axios';



class Main extends Component{

    constructor(){
        super();
        this.state = {
            bootstrap: [],
            filters: {
                club_code: 0,
                position_code: 0,
                max_price: 0,
                sort: 'total_points'
            },
            selectedPlayers: []
        }
    }

    componentWillMount(){
        this.getBootstrap();
    }

    getBootstrap(){
        axios.get('Data/bootstrap-static.txt')
            .then(response => {
                this.setState({bootstrap: response.data});
            })
            .catch(err =>console.log(err));
    }

    handleChangeTeam(state){
        this.setState({
            filters: {
                club_code: state.team_code,
                position_code: state.position_code,
                max_price: state.max_price,
                sort: state.sort
            }
        });
    }

    handleAddSelectedPlayer(player){
        if(this.state.selectedPlayers.indexOf(player) === -1){
            player.team = this.state.bootstrap.teams.find(team => {
                return team.code === player.team_code
            });
            if(this.state.selectedPlayers.length <5) {
                this.setState({selectPlayer: this.state.selectedPlayers.push(player)})
            }
        }else{
            this.setState({selectedPlayers:this.state.selectedPlayers.filter(playerInArray => {
                return parseInt(player.id,10) !== parseInt(playerInArray.id,10);
            })
            })
        }
    }
    handleRemoveSelectedPlayer(playerId){
        this.setState({selectedPlayers:this.state.selectedPlayers.filter(player => {
                return parseInt(playerId,10) !== parseInt(player.id,10);
            })
        })
    }


    filterList(player){
        if(parseInt(this.state.filters.club_code,10) !==0 &&
            (parseInt(player.team_code, 10) !== parseInt(this.state.filters.club_code, 10))){
            return false;
        }
        if(parseInt(this.state.filters.position_code,10) !==0 &&
            (parseInt(player.element_type, 10) !== parseInt(this.state.filters.position_code, 10))){
            return false;
        }

        if(parseInt(this.state.filters.max_price,10) !==0 &&
            (player.now_cost/10 > this.state.filters.max_price)){
            return false;
        }

        return true;
    }






    render(){
        if(!this.state.bootstrap.elements) {
            return(<div></div>);
        }
        let counter = 1;
        let playersUl = this.state.bootstrap.elements
            .filter(player => {return this.filterList(player)})
            .sort((a, b)=> b[this.state.filters.sort]-a[this.state.filters.sort])
            .map((player) => {
                return( <PlayerLi key={player.id} player={player} selectedPlayers={this.state.selectedPlayers} counter={counter++}
                                      teams={this.state.bootstrap.teams} selectPlayer={this.handleAddSelectedPlayer.bind(this)}/>)
            });

        return(
            <div className={'wrapper'}>
                <div className={'compare-area'}>
                    <SelectedPlayers players={this.state.selectedPlayers} changeSelection={this.handleRemoveSelectedPlayer.bind(this)} currentEvent={this.state.bootstrap['current-event']}/>
                </div>
                <div className={'search-area'}>
                    <div className={'search-area-header'}>
                        <Filters teams={this.state.bootstrap.teams} changeFilters={this.handleChangeTeam.bind(this)}/>
                    </div>
                    <div className={'players-list'}>
                        <table>
                            <thead>
                                <tr>
                                    <td className={'list no'}>No</td>
                                    <td className={'list name'}>Name</td>
                                    <td className={'list price'}>Price</td>
                                    <td className={'list points'}>Points</td>
                                    <td className={'list form'}>Form</td>
                                </tr>
                            </thead>
                            <tbody className={'players-list-scroll'}>
                                    {playersUl}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={'clearer'}></div>
            </div>
        )
    }
}

export default Main;