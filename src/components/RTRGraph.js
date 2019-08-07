import React, { Component } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import ReactEcharts from 'echarts-for-react'

/*
    RTRGraph - Realtime Rates Graph
    Shows a graph with the realtime trades of BTC in Euro.
*/

class RTRGraph extends Component {


  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.wsClient = this.initialize_websocket()
  }

  timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    // var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours() < 10 ? '0'+a.getHours(): a.getHours();
    var min = a.getMinutes() < 10? '0'+a.getMinutes(): a.getMinutes();
    var sec = a.getSeconds() < 10? '0'+a.getSeconds(): a.getSeconds();
    var time = date + ' ' + month + '\n' + hour + ':' + min + ':' + sec ;
    
    return time;
  }

  getInitialState = () => ({option: this.getOption([])})

  initialize_websocket = () => { 

    var socket = new WebSocket("wss://ws.kraken.com")
    var self = this

    socket.onopen = () => {
      var payload = {
        event: "subscribe",
        pair: [self.props.pair],
        subscription: {
          name: "ohlc",
          interval: parseInt(self.props.interval)
        }
      }
      socket.send(JSON.stringify(payload))
    }

    socket.onmessage = (msg) => {
      var data = JSON.parse(msg.data);
      if (Array.isArray(data) && data[2] === "ohlc-"+self.props.interval) {
        var newOhlcData = {
          type: "ohlc-1",
          begintime: this.timeConverter(data[1][0]),
          endtime: this.timeConverter(data[1][1]),
          open: data[1][2],
          high: data[1][3],
          low: data[1][4],
          close: data[1][5],
        }
        this.setState({option: this.getOption(newOhlcData)})
      }
    }
  
  }
  getOption(data) {

    return {
      title: { text: (() => {
        if (data === undefined || data.length === 0 || this.state.option.xAxis.data.length === 0)
        { 
          return '[type: ohlc-'+this.props.interval+'] [diff: 0]'
        }
        else {
          const diff = Number((Math.max.apply(null, [...this.state.option.series[0].data, data.close]) - Math.min.apply(null, [...this.state.option.series[0].data, data.close])).toFixed(2))
          return "[type: "+data.type+"] [diff: "+diff+"]"; 
        }
        })()
      },
      tooltip: {},
      legend: {
        data:['BTC in Euro']
      },
      xAxis: {
        splitline: {
          show: false
        },
        data: ((data) => {
          return (data === undefined || data.length === 0)? []: [...this.state.option.xAxis.data, data.begintime]
        })(data)
      },
      yAxis: {
        type: 'value',
        scale: true,
        name: 'Euro'
      },
      series: [
        {
          name: "BTC in Euro", 
          type: "line",
          label: {
            rotate: 90
          } ,
          data: ((data) => {
            return (data === undefined || data.length === 0)? [] : [...this.state.option.series[0].data, data.close]
            }
          )(data)
        }
      ]
    }    
  }
  render() {

    var clsName = classNames({
      'dashboard-item': true,
    })

    return (
      <div className={clsName}>
        <p>
          
        </p>
        <ReactEcharts
          option={this.state.option}
          style={{height: '500px', width: '100%'}}
          className='react_for_echarts'
        />          

      </div>
    )
  }

}

export default connect()(RTRGraph);