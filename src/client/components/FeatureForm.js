import React, { Component } from 'react'
import {
  FormGroup, Input, Switch, FormCheckLabel, FormCheck, Button
} from '@smooth-ui/core-sc'
import styled from 'styled-components'

const MyButton = styled(Button)`
  margin-left: 10px;
`

const MySwitch = styled(Switch)`
  margin-right: 10px;
  input {
    cursor: pointer !important;
  }
  input:checked + .sui-switch-wrapper {
    background-color: #e6f2d9;
  }
  input:checked + .sui-switch-wrapper .sui-switch-ball {
    background-color: #82bd41;
  }
`

const MyFormContainer = styled.div`
  margin-left: 20px;
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
    if (Object.prototype.hasOwnProperty.call(features, newFeatureName)) {
      alert('Feature already present')
    } else {
      this.onInputChange(features, newFeatureName)()
      this.setState({ newFeatureName: '' })
    }

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

  deleteAttr = name => (event) => {
    if (name === '') {
      alert('the name should not be empty')
    }
    const headers = new Headers({
      'Content-Type': 'application/json'
    })
    fetch(`/api/v1/features/${name}`, {
      method: 'DELETE',
      headers
    })
      .then(res => res.json())
      .then(newFeats => this.setState({ features: newFeats }))
    event.preventDefault()
  }

  render() {
    const { features, newFeatureName } = this.state
    return (
      <MyFormContainer>
        <FormGroup>
          <form onSubmit={this.onSubmit}>
            <h2>Feature to add : </h2>
            <Input type="text" value={newFeatureName} onChange={this.changeNewFeatureName} />
          </form>
        </FormGroup>

        <form>
          <h2>Features available</h2>
          {Object.keys(features)
            .sort()
            .map(name => (
              <FormCheck key={name} lineHeight={3}>
                <MySwitch
                  id={`${name}-field`}
                  checked={features[name]}
                  onChange={this.onInputChange(features, name)}
                />
                <FormCheckLabel htmlFor={`${name}-field`}>{name}</FormCheckLabel>
                <MyButton onClick={this.deleteAttr(name)} size="sm">
                  Delete
                </MyButton>
              </FormCheck>
            ))}
        </form>
      </MyFormContainer>
    )
  }
}
