import React from 'react'
import { ReactComponent as CometIcon } from './icons/comet.svg'
import { IRegionData, IRegionPack } from './components/region-box'
import RegionBox from './components/region-box'
import './App.scss'
import axios, { CancelTokenSource } from 'axios'
import _ from 'lodash'
import DetailBox from './components/detail-box'
import { ISearchEntry } from './components/detail-box'
import EntityBox from './components/entity-box'
import { IInstanceEntity } from './components/entity-box'
const parsecsv = require('csv-parse/lib/sync')

interface IProps {}
interface ISearchData {
  entries: ISearchEntry[]
  count: number
  pageSize: number
  sort: 'score' | 'date' | '-date'
}
interface IState {
  query: string
  search: ISearchData
  metaText: string
  hoverEntry?: ISearchEntry
  focusEntity?: IInstanceEntity
}


export default class App extends React.Component<IProps, IState> {
  pageIndex: number = 0
  constructor(props: IProps) {
    super(props)
    this.state = {
      query: '',
      search: {
        entries: [],
        count: 0,
        pageSize: 10,
        sort: 'score'
      },
      metaText: ''
    }
  }

  private searchCancelSource: CancelTokenSource = axios.CancelToken.source()
  private entityCancelSource: CancelTokenSource = axios.CancelToken.source()
  private lastSearch: string = ''
  private lastEntitySearch: string = ''
  private searchQuery: string = ''
  onSearch = _.debounce(() => {
    if (this.searchQuery.length === 0 || this.searchQuery === this.lastSearch) return
    const updateEntity = !this.state.focusEntity || this.lastEntitySearch !== this.searchQuery
    this.lastSearch = this.searchQuery
    this.searchCancelSource.cancel()
    this.searchCancelSource = axios.CancelToken.source()
    this.setState({metaText: 'Searching...', hoverEntry: undefined, focusEntity: updateEntity ? undefined : this.state.focusEntity})
    const beginTime = new Date()
    axios.get(process.env.REACT_APP_API_URL + '/search', { params: {
        q: this.searchQuery,
        skip: this.state.search.pageSize * this.pageIndex,
        limit: this.state.search.pageSize,
        sort: this.state.search.sort
      }, cancelToken: this.searchCancelSource.token }).then(resp => {
      const timeCost = (new Date().getTime() - beginTime.getTime()) / 1000
      this.setState({
        search: {...this.state.search, entries: resp.data.data, count: resp.data.count},
        metaText: `${resp.data.count} documents retrieved in ${timeCost.toFixed(4)} seconds.`})
    }).catch(err => {
      if (!axios.isCancel(err)) {
        this.setState({metaText: `No documents found.`})
        console.error('search error', err)
      }
    })
    if (updateEntity) {
      this.lastEntitySearch = this.searchQuery
      this.entityCancelSource.cancel()
      this.entityCancelSource = axios.CancelToken.source()
      axios.get('https://api.xlore.org/query', { params: { instances: this.searchQuery }, cancelToken: this.entityCancelSource.token }).then(resp => {
        const entity = (resp.data.Instances as any[]).find(e => (e.Label as string).toLowerCase() === this.searchQuery.toLowerCase())
        if (!entity) return
        axios.get('https://api.xlore.org/query', { params: { uri: entity.Uri }, cancelToken: this.entityCancelSource!.token }).then(resp => {
          this.setState({ focusEntity: resp.data })
        })
        .catch(err => { if (!axios.isCancel(err)) console.error('entity search error', err) })
      }).catch(err => { if (!axios.isCancel(err)) console.error('entity search error', err) })
    }
  }, 250)

  reSearch() {
    this.lastSearch = ''
    this.onSearch()
  }

  onInputChange(query: string) {
    this.setState({query})
    this.searchQuery = query.trim()
    if (this.searchQuery.length > 0) {
      if (this.searchQuery !== this.lastSearch) this.pageIndex = 0
      window.scrollTo(0, 0)
      this.onSearch()
    }
    else {
      this.pageIndex = 0
      this.setState({search: {...this.state.search, entries: [], count: 0}})
    }
  }

  setSearchSort(sort: 'score' | 'date' | '-date') {
    if (sort !== this.state.search.sort) {
      this.pageIndex = 0
      this.setState({search: {...this.state.search, sort}})
      if (this.state.search.entries) this.reSearch()
    }
  }

  setSearchPageSize(pageSize: number) {
    if (pageSize !== this.state.search.pageSize) {
      this.pageIndex = 0
      this.setState({search: {...this.state.search, pageSize}})
      if (this.state.search.entries) this.reSearch()
    }
  }

  setPage(page: number) {
    page = Math.max(0, Math.min(page, Math.ceil(this.state.search.count / this.state.search.pageSize) - 1))
    if (page !== this.pageIndex) {
      this.pageIndex = page
      this.reSearch()
    }
  }

  private regionData: {[id: string]: IRegionData} = {}
  private searchKeyToRegionID: {[id: string]: string} = {}
  private regionIDToSubIDs: {[id: string]: string[]} = {}
  componentDidMount() {
    Promise.all([
      axios.get(process.env.REACT_APP_API_URL + '/dist/epidemic.json', { headers: {'Cache-Control': 'no-cache' }}),
      axios.get(process.env.REACT_APP_API_URL + '/dist/regions-info.csv', { headers: {'Cache-Control': 'no-cache' }})
    ]).then(resps => {
      const epdata = resps[0].data
      const csvdata = (parsecsv(resps[1].data) as any[][]).filter(pack => epdata[pack[0]] !== undefined)
      const searchKeyToID: {[key: string]: string} = {}
      const dupSearchKey: {[key: string]: boolean} = {}
      const idToSubIDs: {[id: string]: string[]} = {}
      csvdata.forEach(row => {
        const [id, zhname, enname] = row as [string, string, string]
        if (!epdata[id]) return
        const idseg = id.split('|')
        const enwords = enname.split(' ')
        if (idseg.length < 3) {
          const sks = _.uniq([
            ..._.range(1, zhname.length+1).map(end => zhname.slice(0, end)),
            ..._.range(1, enwords.length+1).map(end => enwords.slice(0, end).join(' ')),
            ..._.range(0, enwords.length).map(start => enwords.slice(start).join(' '))
          ])
          sks.forEach(sk => {
            if (dupSearchKey[sk]) return
            if (!searchKeyToID[sk]) searchKeyToID[sk] = id
            else {
              dupSearchKey[sk] = true
              delete searchKeyToID[sk]
            }
          })
        }
        if (idseg.length > 1) {
          const parentID = idseg.slice(0, idseg.length-1).join('|')
          if (epdata[parentID]) {
            if (!idToSubIDs[parentID]) idToSubIDs[parentID] = [id]
            else idToSubIDs[parentID].push(id)
          }
        }
        this.regionData[id] = {zhname: zhname, enname: enname, epidemic: epdata[id]}
      })
      this.searchKeyToRegionID = searchKeyToID
      this.regionIDToSubIDs = idToSubIDs
    })
  }

  getRegion(): [string, IRegionData] | [undefined, undefined] {
    const q = this.state.query
    const testID = q.replace(/, /g, '|')
    if (this.regionData[testID]) return [testID, this.regionData[testID]]
    for (let len = q.length; len >= 1; --len) {
      for (let start = 0; start <= q.length - len; ++start) {
        const sk = q.slice(start, start + len)
        if (this.searchKeyToRegionID[sk]) return [this.searchKeyToRegionID[sk], this.regionData[this.searchKeyToRegionID[sk]]]
      }
    }
    return [undefined, undefined]
  }

  getRelatedRegion(id: string): IRegionPack[] {
    let res: IRegionPack[] = []
    if (id.indexOf('|') >= 0) {
      const parentID = id.slice(0,id.lastIndexOf('|'))
      const parentRegion = this.regionData[parentID]
      if (parentRegion) res.push({id: parentID, enname: parentRegion.enname, zhname: parentRegion.zhname})
    }
    (this.regionIDToSubIDs[id] || []).forEach(subID => {
      const subRegion = this.regionData[subID]
      if (subRegion) res.push({id: subID, enname: subRegion.enname, zhname: subRegion.zhname})
    })
    return res
  }

  highlightedText(text: string): JSX.Element[] {
    const words = this.state.query.split(' ').map(w => w.toLowerCase()).filter(w => w.length > 0)
    let begin = 0
    const spans: JSX.Element[] = []
    while (true) {
      const places = words.map(w => { return [text.toLowerCase().indexOf(w, begin), w.length] }).filter(x => x[0] >= 0)
      if (places.length === 0) break
      places.sort((a, b) => a[0] - b[0])
      const ws = places[0][0], we = places[0][0] + places[0][1]
      spans.push(<span className="n" key={spans.length}>{text.slice(begin, ws)}</span>)
      spans.push(<span className="h" key={spans.length}>{text.slice(ws, we)}</span>)
      begin = we
    }
    spans.push(<span className="n" key={spans.length}>{text.slice(begin, text.length)}</span>)
    return spans
  }

  render() {
    const [regionID, regionData] = this.getRegion()
    const searching = this.state.search.entries.length > 0 || regionData
    return <div className="App">
      {searching && <div className="search-header-background"/>}
      <div className="app-container">
      <div className={`search-component ${searching ? 'search' : ''}`}>
        <div className="app-title">COVID-19 Search</div>
        <div className="search-box">
          <input value={this.state.query} onChange={(e) => this.onInputChange(e.target.value)} />
          <div className="config-control">
            <CometIcon/>
            <div className="controls">
              <div className="control">
                <div className="control-name block">Sort By</div>
                <div className="options">
                  <div className={`option block ${this.state.search.sort === 'score' ? 'selected' : ''}`} onClick={() => this.setSearchSort('score')}>Relevance</div>
                  <div className={`option block ${this.state.search.sort === '-date' ? 'selected' : ''}`} onClick={() => this.setSearchSort('-date')}>Recency</div>
                </div>
              </div>
              <div className="control">
                <div className="control-name block">Page Size</div>
                <div className="options">
                  <div className={`option block ${this.state.search.pageSize === 10 ? 'selected' : ''}`} onClick={() => this.setSearchPageSize(10)}>10</div>
                  <div className={`option block ${this.state.search.pageSize === 20 ? 'selected' : ''}`} onClick={() => this.setSearchPageSize(20)}>20</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {searching && <div className="info-box">
        <div className="info-container">
          {regionData && !this.state.hoverEntry && <RegionBox regionData={regionData} relatedRegions={this.getRelatedRegion(regionID!)} onSearch={(query) => this.onInputChange(query)}/>}
          {!regionData && !this.state.hoverEntry && this.state.focusEntity && <EntityBox entity={this.state.focusEntity} onSearch={(query) => this.onInputChange(query)}/>}
          {this.state.hoverEntry && <DetailBox entry={this.state.hoverEntry} onClose={() => this.setState({hoverEntry: undefined})}/>}
        </div>
      </div>}
      {searching && <div className="search-entries-container">
        <div className="meta">{this.state.metaText}</div>
        {this.state.search.entries.map((entry, idx) => {
          return <div className="search-entries" key={idx} onMouseEnter={() => this.setState({hoverEntry: entry})}>
            <div className="entry-title"><a href={entry.urls.length > 0 ? entry.urls[0] : '#'} target="_blank" rel="noopener noreferrer">{this.highlightedText(entry.title)}</a></div>
            <div className="entry-content">{this.highlightedText(entry.content)}</div>
            <div className="entry-meta">
              <span>Date: { entry.time.split(' ')[0].replace(/\//g, '-')}</span>
              {entry.source && <span>Source: {entry.source}</span>}
            </div>
          </div>
        })}
        <div className="paging">
          <i onClick={() => this.setPage(0)} className="fas fa-angle-double-left"/>
          <i onClick={() => this.setPage(this.pageIndex-1)} className="fas fa-angle-left"/>
          <input value={this.pageIndex+1} onChange={(e) => {
            if (e.target.value === '') e.target.value = '1'
            let page = parseInt(e.target.value)
            if (isNaN(page)) return
            this.setPage(page-1)
          }}/>
          <i onClick={() => this.setPage(this.pageIndex+1)} className="fas fa-angle-right"/>
          <i onClick={() => this.setPage(this.state.search.count / this.state.search.pageSize + 1)} className="fas fa-angle-double-right"/>
        </div>
      </div>}
      </div>
    </div>
  }
}
