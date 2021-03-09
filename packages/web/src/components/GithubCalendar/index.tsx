// Modified version of https://github.com/haripo/react-github-contribution-calendar/blob/master/src/index.tsx

import React, { ReactElement } from 'react'
// TODO remove dayjs
import dayjs from 'dayjs'
import Measure, { BoundingRect } from 'react-measure'

interface Props {
  weekNames?: string[]
  monthNames?: string[]
  panelColors?: string[]
  values: { [date: string]: number }
  until?: string
  dateFormat?: string
  monthLabelHeight?: number
  weekLabelWidth?: number
  panelSize?: number
  panelMargin?: number
}

interface State {
  columns: number
  maxWidth: number
}

export class GitHubCalendar extends React.Component<Props, State> {

  constructor(props: any) {
    super(props)

 

    this.state = {
      columns: 53,
      maxWidth: 53,
    }
  }

  getPanelPosition(row: number, col: number) {
    const bounds = this.props.panelSize + this.props.panelMargin
    return {
      x: this.props.weekLabelWidth + bounds * row,
      y: this.props.monthLabelHeight + bounds * col,
    }
  }

  makeCalendarData(history: { [k: string]: number }, lastDay: string, columns: number) {
    const d = dayjs(lastDay, { format: this.props.dateFormat })
    const lastWeekend = d.endOf('week')
    const endDate = d.endOf('day')

    var result: ({ value: number; month: number } | null)[][] = []
    for (var i = 0; i < columns; i++) {
      result[i] = []
      for (var j = 0; j < 7; j++) {
        var date = lastWeekend.subtract((columns - i - 1) * 7 + (6 - j), 'day')
        if (date <= endDate) {
          result[i][j] = {
            value: history[date.format(this.props.dateFormat)] || 0,
            month: date.month(),
          }
        } else {
          result[i][j] = null
        }
      }
    }

    return result
  }

  render() {
    const columns = this.state.columns
    const values = this.props.values
    const until = this.props.until

    var contributions = this.makeCalendarData(values, until, columns)
    var innerDom: ReactElement[] = []

    // panels
    for (var i = 0; i < columns; i++) {
      for (var j = 0; j < 7; j++) {
        var contribution = contributions[i][j]
        if (contribution === null) continue
        const pos = this.getPanelPosition(i, j)
        const color = this.props.panelColors[contribution.value]
        // TODO add hoverability to see which tasks are done that day
        const dom = (
          <rect
            key={'panel_key_' + i + '_' + j}
            x={pos.x}
            y={pos.y}
            width={this.props.panelSize}
            height={this.props.panelSize}
            fill={color}
          />
        )
        innerDom.push(dom)
      }
    }

    // week texts
    for (var i = 0; i < this.props.weekNames.length; i++) {
      const textBasePos = this.getPanelPosition(0, i)
      const dom = (
        <text
          key={'week_key_' + i}
          style={{
            fontSize: 12,
            alignmentBaseline: 'central',
            fill: '#AAA',
          }}
          x={textBasePos.x - this.props.panelSize / 2 - 2}
          y={textBasePos.y + this.props.panelSize / 2}
          textAnchor={'middle'}
        >
          {this.props.weekNames[i]}
        </text>
      )
      innerDom.push(dom)
    }

    // month texts
    var prevMonth = -1
    for (var i = 0; i < columns; i++) {
      const c = contributions[i][0]
      if (c === null) continue
      if (c.month != prevMonth) {
        var textBasePos = this.getPanelPosition(i, 0)
        innerDom.push(
          <text
            key={'month_key_' + i}
            style={{
              fontSize: 12,
              alignmentBaseline: 'central',
              fill: '#AAA',
            }}
            x={textBasePos.x + this.props.panelSize / 2}
            y={textBasePos.y - this.props.panelSize / 2 - 2}
            textAnchor={'middle'}
          >
            {this.props.monthNames[c.month]}
          </text>
        )
      }
      prevMonth = c.month
    }

    return (
      <Measure bounds onResize={(rect) => this.updateSize(rect.bounds)}>
        {({ measureRef }: any) => (
          <div ref={measureRef} >
            <svg
              style={{
                fontFamily: 'Helvetica, arial, nimbussansl, liberationsans, freesans, clean, sans-serif',
              }}
              //viewBox={`0 0 100 100`}
              height={(this.props.panelSize + this.props.panelMargin) * 10}
              width={(this.props.panelSize + this.props.panelMargin) * this.state.columns}
            >
              {innerDom}
            </svg>
          </div>
        )}
      </Measure>
    )
  }

  updateSize(size?: BoundingRect) {
    if (!size) return

    const visibleWeeks = Math.floor((size.width - this.props.weekLabelWidth) / 13)
    this.setState({
      columns: Math.min(visibleWeeks, this.state.maxWidth),
    })
  }
}

// @ts-ignore
GitHubCalendar.defaultProps = {
  weekNames: ['', 'M', '', 'W', '', 'F', ''],
  monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  panelColors: ['#EEE', '#DDD', '#AAA', '#444'],
  dateFormat: 'YYYY-MM-DD',
  monthLabelHeight: 20,
  weekLabelWidth: 20,
  panelSize: 18,
  panelMargin: 2,
}
