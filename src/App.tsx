import React from 'react'
import { ReactComponent as CometIcon } from './icons/comet.svg'
import './App.scss'
import axios from 'axios'
import _ from 'lodash'

interface ISearchEntry {
  title: string
  content: string
  time: string
  urls: string[]
  source: string
}
interface IProps {}
interface ISearchData {
  entries: ISearchEntry[]
  count: number
  pageSize: number
  sort: 'score' | 'date' | '-date'
}
interface IState {
  query: string
  loading: boolean
  search: ISearchData
  metaText: string
}

export default class App extends React.Component<IProps, IState> {
  pageIndex: number = 0
  constructor(props: IProps) {
    super(props)
    this.state = {
      query: '',
      loading: false,
      search: {
        entries: [],
        count: 0,
        pageSize: 10,
        sort: 'score'
      },
      metaText: ''
    }
  }

  private lastSearch: string = ''
  private searchQuery: string = ''
  onSearch = _.debounce(() => {
    if (this.searchQuery.length === 0 || this.searchQuery === this.lastSearch) return
    this.lastSearch = this.searchQuery
    this.setState({loading: true, metaText: 'Searching...'})
    const beginTime = new Date()
    axios.get(process.env.REACT_APP_API_URL + '/search', { params: {
        q: this.searchQuery,
        skip: this.state.search.pageSize * this.pageIndex,
        limit: this.state.search.pageSize,
        sort: this.state.search.sort
      } }).then(resp => {
      const timeCost = (new Date().getTime() - beginTime.getTime()) / 1000
      this.setState({
        search: {...this.state.search, entries: resp.data.data, count: resp.data.count},
        loading: false, metaText: `${resp.data.count} documents retrieved in ${timeCost.toFixed(4)} seconds.`})
    }).catch(err => {
      this.setState({loading: false, metaText: `No documents found.`})
      console.error('search error', err)
    })
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

  render() {
    const searching = this.state.search.entries.length > 0
    return <div className="App">
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
        </div>
      </div>}
      {searching && <div className="search-entries-container">
        <div className="meta">{this.state.metaText}</div>
        {this.state.search.entries.map((entry, idx) => {
          return <div className="search-entries" key={idx}>
            <div className="entry-title">{entry.urls.length > 0 ? <a href={entry.urls[0]} target="_blank">{entry.title}</a> : entry.title}</div>
            <div className="entry-content">{entry.content}</div>
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
  }
}
