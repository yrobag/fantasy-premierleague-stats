import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import axios from 'axios';



class ChartRenderer extends Component{

    constructor(props){
        super(props);
        this.state = {
            players: [],
            extPlayers: [],
            event: 0,
            chartData: null
        };
        this.chartColors = ['rgb(255,99,132)','rgb(54,162,235)', 'rgb(255,206,86)', 'rgb(75,192,192)', 'rgb(153,102,255)'];
    }

    componentWillMount(){
        this.getCurrentEvent();
        this.getPlayers();
    }
    componentWillReceiveProps(){
        this.getCurrentEvent();
        this.getPlayers();
    }

    getPlayers(){
        this.setState({
            players: this.props.players,
        }, this.getExtPlayers);
    }


    getExtPlayers(){
        let extPlayers = [];
        for(let i=0; i<this.props.players.length; i++){
            axios.get(`Data/${this.props.players[i].id}.txt`)
                .then(response => {
                    response.data.name =this.props.players[i].web_name;
                    extPlayers.push(response.data);
                    this.setState({extPlayers: extPlayers},this.generateDataSet);
                })
                .catch(err =>console.log(err));
        }
    }

    getCurrentEvent(){
        this.setState({
            event: this.props.currentEvent
        });
    }

    generateDataSet(){
        let labels = [];
        let dataSets = [];
        for(let i = 1; i<=this.state.event; i++){
            labels.push(`Game ${i}`);
        }
        let statToRender=this.getStatToRender();
        let devider = statToRender === 'value' ? 10 : 1;
        for(let i = 0; i<this.state.extPlayers.length; i++){
            let dataSet = {
                fill: false,
                label: this.state.extPlayers[i].name,
                borderColor: this.chartColors[i]
            };
            let data = this.state.extPlayers[i].history.map(event =>{
                return {x: `Game ${event.round}`, y: event[statToRender]/devider}
            });
            dataSet.data = data;
            dataSets.push(dataSet);
        }
        this.setState({
            chartData: {
                labels: labels,
                datasets: dataSets,
                responsive: true
            },
        });
    }

    getStatToRender(){
        switch (this.props.code){
            case 'chart-points':
                return 'total_points';
            case 'chart-selected':
                return 'selected';
            case 'chart-value':
                return 'value';
            default:
                return 'total_points';
        }
    }

    deleteSelection(playerId){
        this.props.changeSelection(playerId);
    }

    render(){
        if(this.state.players.length === 0 && this.state.extPlayers.length === 0){
            return(<div></div>);
        }
        if(!this.state.chartData){
            return(<div></div>);
        }

        let counter = 0;
        let playersLabels = this.props.players.map(player => {
            let colour = this.chartColors[counter++];
            let style = {borderColor: colour};
            return <div key={player.id} style={style} className={'chart-label click'} onClick={this.deleteSelection.bind(this, player.id)}>{player.web_name} &times;</div>
        });

        return (
            <div className={'chart'}>
                <div className={'labels-container'}>
                    {playersLabels}
                    <div className={'clearer'}></div>
                </div>
                <Line data={this.state.chartData} height={500} options={{maintainAspectRatio: false,  legend: {display: false}}}/>
            </div>
        )
    }
}

export default ChartRenderer;