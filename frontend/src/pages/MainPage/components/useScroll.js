
import { useRef, useEffect, useState } from 'react';

const useScroll = (threshold=0.05) => {
  const element = useRef();
  const [isShown, setIsShown] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    let observer;

    if (element.current) {
      observer = new IntersectionObserver((entries) => {
        const entry = entries[0]
        // console.log(entry.target.className)
        setInView(entry.isIntersecting)
        if (entry.isIntersecting) {
          setIsShown(true)
        }
      }, { threshold: threshold });
      observer.observe(element.current);
    }

    return () => observer && observer.disconnect();
  }, []);

  return {
    ref: element,
    inView: inView,
    isShown: isShown,
  };
};

export default useScroll;
