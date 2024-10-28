import { useEffect } from "react";

const useIntersectionObserver = (
  ref: React.RefObject<Element>,
  onIntersect: () => void,
  options?: IntersectionObserverInit
) => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        onIntersect();
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, onIntersect, options]);
};

export default useIntersectionObserver;
