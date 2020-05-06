import React from 'react'
import './entity-box.scss'

export interface IInstanceEntity {
    label: { label: string }
    abstracts: {
        enwiki?: string
        zhwiki?: string
    }
}

interface IProps {
    entity: IInstanceEntity
    onSearch: (query: string) => void
    // onClose: () => void
}

export default class EntityBox extends React.Component<IProps> {

    getAbstract(): JSX.Element[] {
        let raw = this.props.entity.abstracts.enwiki || this.props.entity.abstracts.zhwiki || ''
        const paras = raw.replace(/<span>|<\/span>/g, '').replace(/<a href=[^>]+>(.+?)<\/a>/g, '###$1###').split('<br/>')
        const els: JSX.Element[] = []
        paras.forEach(para => {
            const children = para.split('###').map((text, idx) => {
                return idx % 2 === 0 ?
                    <span key={idx} className="n" dangerouslySetInnerHTML={{__html: text}}/> :
                    <span key={idx} className="h" dangerouslySetInnerHTML={{__html: text}} onClick={() => this.props.onSearch(text)}/>
            })
            els.push(<p key={els.length}>{children}</p>)
        })
        return els
    }

    render() {
        const labels = this.props.entity.label.label.replace(/]/g, '').split('[')
        return <div className="entity-box">
            <div className="name">
                <div className="primary">{labels[0]}</div>
                {labels.length > 0 && <div className="secondary">{labels[1]}</div>}
            </div>
            <div className="abstract">{this.getAbstract()}</div>
        </div>
    }
}