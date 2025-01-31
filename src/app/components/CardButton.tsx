import { TCallback, TItem } from '../types'
import styles from '../styles/style.module.css'

function CardButton(props: { item: TItem; onClick?: TCallback }) {
  return (
    <button onClick={props?.onClick} className={styles.card}>
      {props.item.name}
    </button>
  )
}

export { CardButton }
