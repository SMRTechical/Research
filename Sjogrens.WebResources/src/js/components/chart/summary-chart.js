

import React,{Component} from 'react';
import ReactDOM from 'react-dom';

import {Chart} from 'react-d3-core';
import {LineChart} from 'react-d3-basic';
import {chartData} from './data';


class SummaryChart extends React.Component{
    constructor(props) {
        super(props); 
        
        this.state = {
            width : 700,
            height : 300,
            margins : {left: 100, right: 100, top: 50, bottom: 50},
            title : "User sample",
            // chart series,
            // field: is what field your data want to be selected
            // name: the name of the field that display in legend
            // color: what color is the line
            chartSeries : [
              {
                field: 'BMI',
                name: 'BMI',
                color: '#ff7f0e'
              }
            ],
        };
        
        this.accessorFunction = this.accessorFunction.bind(this);
    }

   
   
    accessorFunction(d) {
      return d.index;
    }



    render (){
        return(
            <Chart
      title={this.state.title}
      width={this.state.width}
      height={this.state.height}
      margins= {this.state.margins}
      >
      <LineChart
        showXGrid= {false}
        showYGrid= {false}
        margins= {this.state.margins}
        title={this.state.title}
        data={this.state.chartData}
        width={this.state.width}
        height={this.state.height}
        chartSeries={this.state.chartSeries}
        x={this.accessorFunction}
      />
    </Chart>
        );
    }
}

export default SummaryChart;