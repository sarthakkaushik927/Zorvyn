import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function useCountUp(target, duration = 1.5, prefix = '', suffix = '') {
  const ref = useRef(null);
  const prevTarget = useRef(0);

  useEffect(() => {
    if (!ref.current || target === undefined) return;
    const el = ref.current;
    const obj = { val: prevTarget.current };

    gsap.to(obj, {
      val: target,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = `${prefix}${Math.round(obj.val).toLocaleString('en-IN')}${suffix}`;
      },
      onComplete: () => {
        prevTarget.current = target;
      },
    });
  }, [target, duration, prefix, suffix]);

  return ref;
}
