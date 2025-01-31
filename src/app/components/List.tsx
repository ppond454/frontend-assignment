import { TItem } from '../types'
import { CardButton } from './CardButton'
import styles from '../styles/style.module.css'

function List(props: {
  name: Set<TItem['name']>
  type: TItem['type']
  onClickItem: (item: TItem) => void
}) {
  return (
    <div className={styles['list-box']}>
      <div className={styles['list-box-header']}>
        <h3>{props.type}</h3>
      </div>
      <div className={styles['list-box-grid']}>
        {Array.from(props.name).map((item, idx) => (
          <CardButton
            key={idx}
            onClick={() => props.onClickItem({ type: props.type, name: item })}
            item={{ type: props.type, name: item }}
          ></CardButton>
        ))}
      </div>
    </div>
  )
}

export { List }
