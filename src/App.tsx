import React, { FC } from 'react'
import './App.css'

interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  // в задании не описан интерфейс Color
  //colors: Color[]
}

interface Props {
  params: Param[];
  model: Model;
}

type State = Record<string, ParamValue['value']>

type ParamsMap = Record<string, Pick<Param, 'name' | 'type'>>

export class ParamEditor extends React.Component<Props, State> {
  paramsMap: ParamsMap = {}

  constructor(props: Props) {
    super(props)

    this.paramsMap = props.params.reduce((res, next) => {
      res[next.id] = { name: next.name, type: next.type }
      return res
    }, {} as ParamsMap)

    this.state = props.model.paramValues.reduce((res, next) => {
      res[next.paramId] = next.value
      return res
    }, {} as State)
  }

  public getModel(): Model {
    return {
      paramValues: Object.entries(this.state).map(([id, value]) => ({ paramId: +id, value })),
    }
  }

  onValueChange = (id: number, value: ParamValue['value']) => {
    this.setState({ [id]: value })
  }

  render() {
    return (
      <form>
        {this.props.model.paramValues.map(v => <div key={v.paramId} style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '5px',
        }}>
          <div style={{ width: '150px' }}>{this.paramsMap[v.paramId].name}</div>
          <ParamValueInput paramId={v.paramId}
                           value={this.state[v.paramId]}
                           type={this.paramsMap[v.paramId].type}
                           onChange={this.onValueChange} />
        </div>)}
      </form>
    )
  }
}

type InputProps = ParamValue & {
  onChange: (id: number, value: ParamValue['value']) => void
  type: Param['type']
}

const ParamValueInput: FC<InputProps> = ({ onChange, paramId, value, type }) => {
  switch (type) {
    case 'string':
      return (
        <input onChange={(e) => {
          onChange(paramId, e.target.value)
        }} type='text' value={value} />
      )
  }
}


