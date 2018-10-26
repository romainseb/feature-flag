import React from 'react'
import { HeaderBar } from './components/HeaderBar'
import { FeatureForm } from './components/FeatureForm'
import './app.css'

export default function App() {
  return (
    <div>
      <HeaderBar>Features</HeaderBar>
      <FeatureForm />
    </div>
  )
}
