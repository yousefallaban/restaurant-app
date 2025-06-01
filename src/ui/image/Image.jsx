import { useInView } from 'react-intersection-observer';

import styles from './Image.module.scss';

const Image = ({ src, alt, className = '', ...props }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px',
  });

  return (
    <div
      ref={ref}
      className={`${styles.imageWrapper} ${className}`}
    >
      {inView && (
        <img
          src={src}
          alt={alt}
          className={styles.image}
          loading="lazy"
          {...props}
        />
      )}
    </div>
  );
};
export default Image
