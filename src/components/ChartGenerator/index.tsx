import React from 'react';
import {chartGenerator} from '../../utils/chartGenerator';
import { constants } from '../../utils/constants';
import * as d3 from 'd3';
import { debounce } from 'throttle-debounce';
import moment from 'moment';

interface Props {
    data: Array<any>,
    color: string,
    height: number,
    xKey: string,
    yKey: string,
    spacing: number,
    onLimitChange: Function,  
    xTooltip: Function,
    yTooltip: Function,
    _ref: any,
    isDateFilter: boolean,
    isLimitAvailable: boolean,
    text: any, 
    hoverColor: string
}

interface States {
    limit: number,
    selectedDateFilter: string,
    xLabel: any
}

export default class ChartWrapper extends React.Component<Props, States> {
    updateLimitDebounce: Function;
    graphContainer: any = null;

    constructor(props: Props) {
        super(props);
        
        this.graphContainer = React.createRef();
        this.updateLimitDebounce = debounce(1000, false, this.updateLimit);
        this.state = {
            limit: 15,
            selectedDateFilter: 'one_day_in_milliseconds',
            xLabel: props.text ? props.text : '',
        }
    }

    componentDidMount() {
       this.generateChart();
    }

    componentDidUpdate(prevProps: Props) {
        if (JSON.stringify(prevProps.data) !== JSON.stringify(this.props.data)) {
          this.generateChart();
        }
    }

    generateChart() {
        const {_ref, data, xTooltip, yTooltip, height , xKey, yKey, color ,spacing, hoverColor} = this.props
        const svg = d3.select(_ref.current);

        const width = this.graphContainer.current ? this.graphContainer.current.offsetWidth-200 : 532

        chartGenerator.graphGenerator(height, width, svg, data, xKey, yKey, color ,spacing);
        
        const xTooltipFn = function(d: any, i: number) {
            return xTooltip(d, i);
        }
    
        const yTooltipFn = function(d: any, i: number) {
            return yTooltip(d, i);
        }

        chartGenerator.barGraphFloatingTooltipGenerator(svg, xTooltipFn, yTooltipFn, color, hoverColor);
    }


    updateLimit = (limit: number) => {
        limit = limit ? limit : 15;
        if(limit > 1000) {
            this.setState({limit: 1000});
        } 
        if(this.props.isDateFilter) {
            this.filterResult(this.state.selectedDateFilter);
        } else {
            this.props.onLimitChange(limit);
        }
    }

    filterResult(filter: string) {
        this.setState({selectedDateFilter: filter});
        let timestamp = 0;
        // calculate timestamp for conseiljs query builder
        if(filter === constants.all_time_filter) {
            timestamp = constants.all_time_date
        } else {
            timestamp = new Date().getTime() - constants[filter];
        }
        if(this.state.xLabel) {
            this.changeLabelText(timestamp);
        }
        this.props.onLimitChange(this.state.limit, timestamp);
    }

    changeLabelText(timestamp: number) {
        const text = `${moment(timestamp).format("YYYY MMMM Do")} - ${moment().format("YYYY MMMM Do")}`
        this.setState({xLabel: text});
    }

    render() {
        const { height, _ref, isDateFilter, isLimitAvailable } = this.props;
        const width = this.graphContainer.current ? this.graphContainer.current.offsetWidth-200 : 1295
        const { limit, selectedDateFilter, xLabel } = this.state;
        const svgLength = `0,0,${width},${height}`;

        return (
            <div className="mapHolder">
                {
                    <React.Fragment>
                        {
                            isLimitAvailable && 
                            <div className="pos-abs">
                                <p>
                                    <span>View Top</span>
                                    <input type="number" value={limit} onChange={(e)=> {this.setState({ limit: parseInt(e.target.value) });this.updateLimitDebounce(e.target.value)}}/>
                                    <span>Accounts</span>
                                </p>
                            </div>
                        }
                        
                        {
                            isDateFilter && 
                            <div className="pos-abs-right">
                                <span onClick={e=> this.filterResult(constants.one_day_filter)} className={selectedDateFilter=== constants.one_day_filter ? 'selected': ' '} >Day</span>
                                <span onClick={e=> this.filterResult(constants.one_week_filter)} className={selectedDateFilter=== constants.one_week_filter ? 'selected': ' '}>Week</span>
                                <span onClick={e=> this.filterResult(constants.one_month_filter)} className={selectedDateFilter=== constants.one_month_filter ? 'selected': ' '}>Month</span>
                                {/* <span onClick={e=> this.filterResult(constants.one_year_filter)} className={selectedDateFilter=== constants.one_year_filter ? 'selected': ' '}>Year</span>
                                <span onClick={e=> this.filterResult(constants.all_time_filter)} className={selectedDateFilter=== constants.all_time_filter ? 'selected': ' '}>All Time</span> */}
                            </div>
                        }
                        
                        <div className="graph-holder" ref={this.graphContainer}>
                            <svg viewBox={svgLength} className="account-graph" ref={_ref}></svg>
                        </div>
                        <p className="year-text">{xLabel}</p>
                    </React.Fragment>
                }
            </div>
        )

    }

}