
import { useRef, useEffect, useState } from 'react';

const useScroll = (threshold=0.05) => {
  const element = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let observer;

    if (element.current) {
      observer = new IntersectionObserver((entries) => {
        const entry = entries[0]
        setIsVisible(entry.isIntersecting)
      }, { threshold: threshold });
      observer.observe(element.current);
    }

    return () => observer && observer.disconnect();
  }, []);

  return {
    ref: element,
    inView: isVisible
  };
};

export default useScroll;
