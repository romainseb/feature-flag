import React, { Component } from 'react'
import styled from 'styled-components'

const Form = styled.form`
  padding: 0 20px;
`

const Label = styled.span`
  font-size: 16px;
  margin-left: 10px;
`

export class FeatureForm extends Component {
  state = { features: {} }

  componentDidMount() {
    fetch('/api/v1/features')
      .then(res => res.json())
      .then(features => this.setState({ features }))
  }

  onInputChange = (features, name) => () => {
    console.log({ [name]: !features[name] }, name)
    fetch('/api/v1/features', {
      method: 'PATCH',
      body: JSON.stringify({ [name]: !features[name] })
    }).then(console.log)
    // .then(features => this.setState({ features }))
  }

  render() {
    const { features } = this.state
    return (
      <Form>
        <h2>Features available</h2>
        {Object.keys(features).map((name, index) => (
          <div key={index}>
            <label htmlFor={`${name}-field`}>
              <input
                id={`${name}-field`}
                type="checkbox"
                checked={features[name]}
                onChange={this.onInputChange(features, name)}
              />
              <Label>{name}</Label>
            </label>
          </div>
        ))}
      </Form>
    )
  }
}
