import React, { Component } from 'react'
import styled from 'styled-components'

const Form = styled.form`
  padding: 0 20px;
`

const Label = styled.span`
  font-size: 16px;
  margin: 0 10px;
`

export class FeatureForm extends Component {
  state = { features: {}, newFeatureName: '' }

  componentDidMount() {
    fetch('/api/v1/features')
      .then(res => res.json())
      .then(features => this.setState({ features }))
  }

  changeNewFeatureName = (event) => {
    this.setState({ newFeatureName: event.target.value })
  }

  onSubmit = (event) => {
    const { features, newFeatureName } = this.state
    this.onInputChange(features, newFeatureName)()
    this.setState({ newFeatureName: '' })
    event.preventDefault()
  }

  onInputChange = (features, name) => () => {
    const headers = new Headers({
      'Content-Type': 'application/json'
    })
    fetch('/api/v1/features', {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ [name]: !features[name] })
    })
      .then(res => res.json())
      .then(newFeats => this.setState({ features: newFeats }))
  }

  deleteAttr = name => () => {
    const headers = new Headers({
      'Content-Type': 'application/json'
    })
    fetch(`/api/v1/features/${name}`, {
      method: 'DELETE',
      headers
    })
      .then(res => res.json())
      .then(newFeats => this.setState({ features: newFeats }))
  }

  render() {
    const { features, newFeatureName } = this.state
    return (
      <React.Fragment>
        <Form onSubmit={this.onSubmit}>
          <h2>Feature to add : </h2>
          <input type="text" value={newFeatureName} onChange={this.changeNewFeatureName} />
        </Form>

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
              <input type="button" value="delete" onClick={this.deleteAttr(name)} />
            </div>
          ))}
        </Form>
      </React.Fragment>
    )
  }
}
