// React Imports
import React, {FC} from 'react'

// Package Imports
import {FlashList} from '@shopify/flash-list'

interface ListItem {
  id: number
  title: string
  content: string
  completed: boolean
}

interface ListProps {
  data: ListItem[]
  renderItem: ({item}: {item: ListItem}) => JSX.Element
  keyExtractor: (item: ListItem, index: number) => string
}

export const List: FC<ListProps> = ({data, renderItem, keyExtractor}) => {
  return (
    <FlashList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      estimatedItemSize={100}
    />
  )
}
