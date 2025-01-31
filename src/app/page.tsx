'use client'
import { useState, useRef } from 'react'
import pagesStyle from './styles/page.module.css'
import styles from './styles/style.module.css'
import { CardButton, List } from './components'
import { DURATIONS } from './const'
import { TItem, Item } from './types'
import { Task } from './utils'
import { items as data } from './const'

export default function Home() {
  const [items, setItems] = useState<TItem[]>(data)
  const [list, setList] = useState<Record<Item, Set<TItem['name']>>>({
    [Item.Fruit]: new Set(),
    [Item.Vegetable]: new Set(),
  })

  const maps = useRef<Map<TItem['name'], Task>>(new Map())

  const takeToThatType = (item: TItem) => {
    setList((_list) => {
      _list[item.type].add(item.name)
      return _list
    })
    setItems((items) => items.filter((i) => i.name !== item.name))
    const task = new Task(DURATIONS, () => taskBack(item))
    maps.current.set(item.name, task)
    task.start()
  }

  const taskBack = (item: TItem) => {
    maps.current.get(item.name)?.kill()
    setList((_list) => {
      _list[item.type].delete(item.name)
      return _list
    })
    setItems((items) => [...items, item])
  }
  return (
    <div className={pagesStyle.page}>
      <main className={pagesStyle.main}>
        <div className={styles.sidebar}>
          {items.map((item, i) => (
            <CardButton
              onClick={() => takeToThatType(item)}
              key={i}
              item={item}
            />
          ))}
        </div>
        <div className={styles.content}>
          <List
            onClickItem={taskBack}
            type={Item.Fruit}
            name={list['Fruit']}
          ></List>
          <List
            onClickItem={taskBack}
            type={Item.Vegetable}
            name={list['Vegetable']}
          ></List>
        </div>
      </main>
    </div>
  )
}
