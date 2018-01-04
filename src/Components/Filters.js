import React, { Component } from 'react';

class Filters extends Component{


    constructor(props){
        super(props);
        this.state = {
            team_code: 0,
            position_code: 0,
            max_price: 0,
            sort: 'total_points'
        };
    }


    handleChange(e){
        this.setState({
            team_code: this.refs.team_code.value,
            position_code: this.refs.position_code.value,
            max_price: this.refs.max_price.value,
            sort: this.refs.sort.value
        }, function () {
            this.props.changeFilters(this.state);
        });
    }

    static getPositionsMap(){
        let positionsMap = [];
        positionsMap[1] = 'Goalkeeper';
        positionsMap[2] = 'Defender';
        positionsMap[3] = 'Midfielder';
        positionsMap[4] = 'Forward';

        return positionsMap;
    };

    static getPriceSteps(){
        let priceSteps = [];
        for(let i=4.5; i<=12; i= i+0.5){
            priceSteps.push(i);
        }
        return priceSteps
    }

    static getSorOptions(){
        let options =[];
        options.push(<option key={"total_points"} value={"total_points"}>Points</option>);
        options.push(<option key={"form"} value={"form"}>Form</option>);
        options.push(<option key={"now_cost"} value={"now_cost"}>Price</option>);
        return options
    };


    render(){
        let teamsOptions = [];
        if(this.props.teams){
            teamsOptions = this.props.teams.map(team => {
                return <option key={team.code} value={team.code}>{team.name}</option>
            });
        }
        teamsOptions.unshift(<option key={0} value={0}>Select Team</option>);


        let positionOptions = Filters.getPositionsMap().map((positionName, positionCode) => {
            return <option key={positionCode} value={positionCode}>{positionName}</option>
        });
        positionOptions.unshift(<option key={0} value={0}>Select Position</option>);

        let priceSteps = Filters.getPriceSteps().map((step) => {
            return <option key={step} value={step}>&#163;{step}</option>
        });
        priceSteps.unshift(<option key={0} value={0}>Unlimited</option>);

        let sortOptions = Filters.getSorOptions();
        return(
            <div>
                <form>
                    <div>
                        <label className={'filter-label'} htmlFor={'team_code'}>Team: </label>
                        <select className={'filter-input'} name={'team_code'} ref={'team_code'} onChange={this.handleChange.bind(this)}>
                            {teamsOptions}
                        </select>
                        <label className={'filter-label'} htmlFor={'position_code'}>Position: </label>
                        <select className={'filter-input'} name={'position_code'} ref={'position_code'} onChange={this.handleChange.bind(this)}>
                            {positionOptions}
                        </select>
                        <label className={'filter-label'} htmlFor={'max_price'}>Max&nbsp;Price: </label>
                        <select className={'filter-input'} name={'max_price'} ref={'max_price'} onChange={this.handleChange.bind(this)}>
                            {priceSteps}
                        </select>
                        <label className={'filter-label'} htmlFor={'sort'}>Sort: </label>
                        <select className={'filter-input'} name={'sort'} ref={'sort'} onChange={this.handleChange.bind(this)}>
                            {sortOptions}
                        </select>
                    </div>
                </form>
            </div>
        )
    }
}

export default Filters;