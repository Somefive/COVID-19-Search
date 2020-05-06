import React from 'react'
import './detail-box.scss'

export interface ISearchEntry {
    title: string
    content: string
    time: string
    urls: string[]
    source: string
    related_events: {id: string, score: number, title: string, time: string, urls: string[]}[]
}

interface IProps {
    entry: ISearchEntry
    onClose: () => void;
}

export default class DetailBox extends React.Component<IProps> {
    render() {
        return <div className="detail-box">
            <div className="header">Related Events</div>
            <div className="close-btn" onClick={this.props.onClose}><i className="far fa-times-circle"/></div>
            {this.props.entry.related_events.map((event, idx) =>
                <div className="related-events" key={idx}>
                    <span className="date">{event.time.split(' ')[0].replace(/\//g, '-')}</span>
                    <span><a href={event.urls.length > 0 ? event.urls[0] : ""} target="_blank" rel="noopener noreferrer">{event.title}</a></span>
                </div>
            )}
        </div>
    }
}