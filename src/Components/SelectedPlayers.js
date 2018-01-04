import React, { Component } from 'react';
import StatsRenderer from "./StatsRenderer";
import ViewHelper from "./ViewHelper";
import ChartRenderer from "./ChartRenderer";

class SelectedPlayers extends Component{


    constructor(props){
        super(props);
        this.state = {
            view: 'basic'
        };
    }


    handleRemoveSelectedPlayer(removedPlayerId){
        this.props.changeSelection(removedPlayerId);
    }

    getBest(){
        let statsSet = ViewHelper.getViewSet(this.state.view);
        let players = this.props.players;
        let result = {};
        statsSet.map(stat => {
            if(stat.extParam === 1){
                return false;
            }
            let max = false;
            players.map(player=> {
                let newValue = stat.render(player);
                console.log(newValue)
                if(max === false){
                    max= newValue
                    return true;
                }
                max = stat.compare(newValue,max);
                return true;
            });
            result[stat.code] = max;
        });
        console.log(result);
        return result;

    }


    render(){
        let viewButtons =ViewHelper.viewTypes.map(type => {
            if(this.state.view === type.code){
                return <button className={'view-mode selected'} key={type.code} onClick={()=>{this.setState({view: type.code})}}>{type.label}</button>
            }
            return <button className={'view-mode click'} key={type.code} onClick={()=>{this.setState({view: type.code})}}>{type.label}</button>
        });


        if(this.props.players.length === 0) {
            return(<div className={'full-blank'}><div className={'full-blank full-blank-inside'}>SELECT PLAYERS <br/> TO COMPARE
                <i className="fa fa-arrow-circle-right icon" aria-hidden="true"></i>
                </div></div>);
        }
        if (!ViewHelper.getViewSet(this.state.view)) {
            return (<div>
                {viewButtons}
                <ChartRenderer code={this.state.view} players={this.props.players}
                               currentEvent={this.props['currentEvent']}
                               changeSelection={this.handleRemoveSelectedPlayer.bind(this)}/>
            </div>)
        }
        let statsLabels = ViewHelper.getViewSet(this.state.view);
        let header = <div className={'cell cell-header'}>Stats</div>;
        let counter =0;
        let labels = statsLabels.map((stat, key) => {
            let oddEven = ++counter%2===0 ? 'odd' : 'even';
            return <div key={key} className={`cell stat-label ${this.state.view} ${oddEven}`}>{stat.label}</div>
        });
        let best = this.getBest();
        let currentView = this.props.players.map( player => {
            return <div key={player.id} className={'column'}><StatsRenderer key={player.id} player={player} changeSelection={this.handleRemoveSelectedPlayer.bind(this)}
                                                                            best={best} view={this.state.view}/></div>
        });
        let blankColumn = [];
        for(let i = 0; i < 5 - this.props.players.length; i++){
            blankColumn.push(<div key={i} className={'column column-blank '+this.state.view}><div className={'column-blank column-blank-inside '+this.state.view}>COMPARE ANOTHER <br/>PLAYER
            </div></div>);
        }
        return(
            <div>
                <div>{viewButtons}</div>
                <div className={'selected-container'}>
                    <div className={'column'}>
                        {header}
                        {labels}
                    </div>
                    {currentView}
                    {blankColumn}
                </div>
                <div className={"clearer"}></div>
            </div>
        )
    }
}

export default SelectedPlayers;