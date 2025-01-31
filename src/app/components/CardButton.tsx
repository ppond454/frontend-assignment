import { TItem } from '../types'
import styles from '../styles/style.module.css'

function CardButton(props: { item: TItem; onClick?: (...arg: any[]) => any }) {
  return (
    <button onClick={props?.onClick} className={styles.card}>
      {props.item.name}
    </button>
  )
}

export { CardButton }
