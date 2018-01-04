import React, { Component } from 'react';

class PlayerLi extends Component{
    constructor(props){
        super(props);
        this.state = {
            player: props.player,
            team: {},
        }
    }

    componentWillMount(){
        this.getTeam();
    }

    getTeam(){
        this.setState({team: this.props.teams.find((team) => {
            return team.code === this.state.player.team_code
        })});

    }

    selectPlayer(){
        this.props.selectPlayer(this.state.player);
    }


    render(){
        let trClass ='';
        if(this.props.selectedPlayers.find(selectedPlayer => {return selectedPlayer.id === this.state.player.id})){
            trClass = 'selected-player';
        }else{
            trClass = 'no-selected-player'
        }
        return(
            <tr className={trClass + ' click'} onClick={this.selectPlayer.bind(this)}>
                <td className={'list no'}>{this.props.counter}.</td>
                <td className={'list name'}>{`${this.state.player.web_name} (${this.state.team.short_name})`} </td>
                <td className={'list price'}> &#163;{(this.state.player.now_cost/10).toFixed(1)} </td>
                <td className={'list points'}> {this.state.player.total_points} </td>
                <td className={'list form'}> {this.state.player.form}</td>
            </tr>
        )
    }
}

export default PlayerLi;