import React, { Component } from 'react'
import SearchHeader from '@components/SearchHeader'
import { getItem } from '@utils/storage'

export default class FindHouse extends Component {
  render() {
    const { label } = getItem('jjzf')
    return (
      <div>
        <SearchHeader cityInfo={label} />
      </div>
    )
  }
}
