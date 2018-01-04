import React, { Component } from 'react';
import axios from 'axios';
import ViewHelper from "./ViewHelper";


class StatsRenderer extends Component{
    constructor(props){
        super(props);
        this.state = {
            player: {},
            extPlayer: {},
        }
    }


    componentWillMount(){
        this.getPlayer();
        this.getExtPlayer();
    }

    getPlayer(){
        this.setState({
            player: this.props.player,
        });
    }


    getExtPlayer(){
        axios.get(`Data/${this.props.player.id}.txt`)
            .then(response => {
                this.setState({extPlayer: response.data});
            })
            .catch(err =>console.log(err));
    }

    deleteSelection(e){
        this.props.changeSelection(this.state.player.id);
    }


    renderView(){
        let player = this.state.player;
        let extPlayer = this.state.extPlayer;
        let statsSet = ViewHelper.getViewSet(this.props.view);
        let counter =0;
        let stats = statsSet.map((stat, key) => {
            let oddEven = ++counter%2===0 ? 'odd' : 'even';
            if(stat.extParam){
                return <div key={key} className={`cell ${this.props.view} ${oddEven} ${stat.code}`}>{stat.render(extPlayer)}</div>
            }
            let compareClass = stat.render(player) === this.props.best[stat.code] ? 'best' : '';
            return <div key={key} className={`cell ${this.props.view} ${oddEven} ${stat.code} ${compareClass}`}>{stat.render(player)}</div>
        });

        return stats
    }

    render(){
        if(this.state.player.id && this.state.extPlayer.fixtures) {
            let player = this.state.player;
            let stats = this.renderView();
            return (
                <div>
                    <div className={"cell cell-header stats team"+player.team_code} key={player.id}>{player.web_name}
                    <br/> ({player.team.short_name})
                        <span className={'close click'} onClick={this.deleteSelection.bind(this)}><i className="fa fa-times" aria-hidden="true"></i></span></div>
                    {stats}
                </div>
            )
        }
        return (<div></div>)
    }



}


export default StatsRenderer;