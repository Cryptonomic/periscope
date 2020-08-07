import React from 'react';
import {chartGenerator} from '../../utils/chartGenerator';
import {constants} from '../../utils/constants';
import * as d3 from 'd3';
import { debounce } from 'throttle-debounce';

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
}

interface States {
    limit: number
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
        }
    }

    componentDidMount() {
       this.generateChart();
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.data.length != this.props.data.length) {
          this.generateChart();
        }
    }

    generateChart() {
        const {_ref, data, xTooltip, yTooltip, height , xKey, yKey, color ,spacing} = this.props
        const svg = d3.select(_ref.current);

        const width = this.graphContainer.current ? this.graphContainer.current.offsetWidth-200 : 0

        chartGenerator.graphGenerator(height, width, svg, data, xKey, yKey, color ,spacing);
        const self = this;
        const xTooltipFn = function(d: any, i: number) {
            return xTooltip(d, i);
        }
    
        const yTooltipFn = function(d: any, i: number) {
            return yTooltip(d, i);
        }

        chartGenerator.barGraphFloatingTooltipGenerator(svg, xTooltipFn, yTooltipFn);
    }


    updateLimit = (limit: number) => {
        limit = limit ? limit : 15;
        if(limit <= 1000) {
            this.props.onLimitChange(limit);
        } else {
            this.setState({limit: 1000});
        }
        
    }

    render() {
        const { height, _ref } = this.props;
        const width = this.graphContainer.current ? this.graphContainer.current.offsetWidth-200 : 0
        const { limit } = this.state;
        const svgLength = `0,0,${width},${height}`;

        return (
            <div className="mapHolder">
                {
                    <React.Fragment>
                        <div className="pos-abs">
                            <p>
                                <span>View Top</span>
                                <input type="number" value={limit} onChange={(e)=> {this.setState({ limit: parseInt(e.target.value) });this.updateLimitDebounce(e.target.value)}}/>
                                <span>Accounts</span>
                            </p>
                        </div>
                        <div className="graph-holder" ref={this.graphContainer}>
                            <svg viewBox={svgLength} className="account-graph" ref={_ref}></svg>
                        </div>
                    </React.Fragment>
                }
            </div>
        )

    }

}