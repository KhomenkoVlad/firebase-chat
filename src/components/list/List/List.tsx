import styles from "./List.module.scss";
import { ReactNode } from "react";

type Props<T> = {
  data?: T[];
  render: (arg: T) => ReactNode;
};

export const List = <T,>({ data, render }: Props<T>) => {
  return <ul className={styles.list}>{data && data.map(render)}</ul>;
};
