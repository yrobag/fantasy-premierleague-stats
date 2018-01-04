import { Component } from 'react';
import BasicStatsData from "./BasicStatsData";
import DetailsStatsData from "./DetailsStatsData";
import LastMatchesStatsData from "./LastMatchesStatsData";

class ViewHelper extends Component{

    static getViewSet(view){
        switch (view){
            case 'basic':
                return BasicStatsData.getStatsList();
            case 'details':
                return DetailsStatsData.getStatsList();
            case 'last':
                return LastMatchesStatsData.getStatsList();
            case 'chart-points':
                return false;
            case 'chart-selected':
                return false;
            case 'chart-value':
                return false;
            default:
                return BasicStatsData.getStatsList();
        }
    }

    static viewTypes = [
        {code: 'basic', label: 'Basic Stats'},
        {code: 'details', label: 'Details'},
        {code: 'last', label: 'Last 3 Matches'},
        {code: 'chart-points', label: 'Points (chart)'},
        {code: 'chart-value', label: 'Value (chart)'},
        {code: 'chart-selected', label: 'Selected by (chart)'},
    ];


}


export default ViewHelper;