import React from 'react'
import './region-box.scss'
import dateformat from 'dateformat'
import Chart from 'chart.js'
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
    private chart?: Chart

    initChart() {
      if (!this.chartCtx) {
        setTimeout(() => this.initChart(), 250)
        return
      }
      this.chart = new Chart(this.chartCtx, {
        type: 'bar',
        data: {
          labels: [],
          datasets: [{
            label: 'Remain',
            backgroundColor: "#008d93",
            data: []
          }, {
            label: 'Deceased',
            backgroundColor: "#3b5c7a",
            data: []
          }, {
            label: 'Recovered',
            backgroundColor: "#45c490",
            data: []
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

    updateChartData() {
      if (!this.chart) {
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
      this.chart.data.labels = dates
      this.chart!.data.datasets![0].data = barData.map(p => p.Remain)
      this.chart!.data.datasets![1].data = barData.map(p => p.Deceased)
      this.chart!.data.datasets![2].data = barData.map(p => p.Recovered)
      this.chart.update()
    }

    componentDidMount() {
      this.initChart()
    }

    private lastRegionData?: IRegionData

    render() {
      const regionData = this.props.regionData
      if (regionData !== this.lastRegionData) {
        this.lastRegionData = regionData
        this.updateChartData()
      }
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