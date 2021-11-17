import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// style
import classes from "./sideMenu.module.css";
interface IProps {
  routes: {
    path: string;
    name: string;
    query: string;
    length?: number;
  }[];
}
export default function SideMenu({ routes }: IProps) {
  const router = useRouter();

  return (
    <div className={classes.container}>
      {routes.map((r) => (
        <li
          key={r.path}
          className={`${classes.navitem} ${
            router.query["pid"] === r.query && classes.activeNavitem
          }`}
        >
          <Link href={r.path} shallow={true}>
            <a className={classes.navlink}>
              {r.name}
              {r.length || r.length === 0 ? (
                <span className={classes.count}>{r.length}</span>
              ) : null}
            </a>
          </Link>
        </li>
      ))}
    </div>
  );
}
