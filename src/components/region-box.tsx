import React from 'react'
import './region-box.scss'
import dateformat from 'dateformat'
import { Chart } from 'chart.js'
Chart.defaults.global.defaultFontColor = '#dddddd'

export interface IRegionData {
  enname: string
  zhname: string
  epidemic: {
    begin: string
    data: (number|null)[][]
  }
}

export interface IRegionPack {
  id: string
  enname: string
  zhname: string
}

interface IProps {
  regionData: IRegionData
  relatedRegions: IRegionPack[]
  onSearch: (query: string) => void
}

export default class RegionBox extends React.Component<IProps> {

    private chartCtx: HTMLCanvasElement | null = null

    updateChartData() {
      if (!this.chartCtx) {
        setTimeout(() => this.updateChartData(), 250)
        return
      }
      const regionData = this.props.regionData
      const begin = new Date(regionData.epidemic.begin)
      const barData = regionData.epidemic.data.map((row, idx) => {
        let date = new Date(begin)
        date.setDate(begin.getDate() + idx)
        let [Confirmed, suspected, Recovered, Deceased, severe, risk] = row
        Recovered = Recovered || 0
        Deceased = Deceased || 0
        const Remain = Math.max(0,(Confirmed || 0) - Recovered - Deceased)
        return {Remain, Recovered, Deceased, Date: dateformat(date, 'yyyy-mm-dd')}
      })
      const dates = barData.map(p => p.Date)
      const chart = new Chart(this.chartCtx, {
        type: 'bar',
        data: {
          labels: dates,
          datasets: [{
            label: 'Remain',
            backgroundColor: "#45c490",
            data: barData.map(p => p.Remain)
          }, {
            label: 'Deceased',
            backgroundColor: "#caf270",
            data: barData.map(p => p.Deceased)
          }, {
            label: 'Recovered',
            backgroundColor: "#008d93",
            data: barData.map(p => p.Recovered)
          }]
        },
        options: {
          tooltips: {
            displayColors: true,
          },
          scales: {
            xAxes: [{
              stacked: true,
              gridLines: {
                display: false,
              },
              ticks: {
                display: false,
              },
            }],
            yAxes: [{
              stacked: true,
              ticks: {
                beginAtZero: true,
              },
              type: 'linear',
            }]
          },
          responsive: true,
          maintainAspectRatio: false,
          legend: { position: 'bottom' },
        }
      })
    }

    componentDidMount() {
      this.updateChartData()
    }

    render() {
      const regionData = this.props.regionData
      const [confirmed, suspected, cured, dead, severe, risk] = regionData.epidemic.data[regionData.epidemic.data.length - 1]
      return <div className="region-info-box">
        <div className="name">
          <div className="primary">{regionData.enname}</div>
          <div className="secondary">{regionData.zhname}</div>
        </div>
        <div className="epidemic-info">
          {confirmed !== null && <div>Confirmed: {confirmed}</div>}
          {cured !== null && <div>Recovered: {cured} ({(cured / confirmed! * 100).toFixed(2)}%)</div>}
          {dead !== null && <div>Deceased: {dead} ({(dead / confirmed! * 100).toFixed(2)}%)</div>}
        </div>
        <div className="trend-chart-container">
          <canvas ref={(e) => { this.chartCtx = e }}/>
        </div>
        {this.props.relatedRegions.length > 0 && <div className="related-areas">
          Related Areas: {this.props.relatedRegions.map((r, idx) => <span key={idx}>{idx === 0 ? '' : ', '}
            <span className="link" onClick={() => {this.props.onSearch(r.id.replace(/\|/g, ', '))}}>{r.enname}</span>
          </span>)}
        </div>}
      </div>
    }
}