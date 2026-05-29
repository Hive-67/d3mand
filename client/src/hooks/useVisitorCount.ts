import { useEffect, useState } from "react";

const NAMESPACE = "d3mandhub";
const KEY = "visitors";

export function useVisitorCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/${KEY}/up`)
      .then((r) => r.json())
      .then((d) => { if (typeof d?.count === "number") setCount(d.count); })
      .catch(() => {});
  }, []);

  return count;
}
