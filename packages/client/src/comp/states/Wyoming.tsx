import React from 'react'

import { WyomingInfo } from '../../common'
import { Base } from './Base'


export const Wyoming = () => {
  return <Base<WyomingInfo>
    enrichValues={(info) => ({...info, state: 'Wyoming'})}
  />
}