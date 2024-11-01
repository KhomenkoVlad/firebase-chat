import { MutableRefObject, useEffect, useRef, useState } from "react";

export const useLoadScroll = () => {
  const ref = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (ref.current) {
      const option = {
        root: null,
        rootMargin: "5px",
        threshold: 1,
      };
      const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
        setIsIntersecting(entries[0].isIntersecting);
      }, option);

      observer.observe(ref.current);

      return () => {
        if (ref.current) observer.unobserve(ref.current);
      };
    }
  }, [ref.current]);

  const result: [MutableRefObject<null>, boolean] = [ref, isIntersecting];

  return result;
};
