import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function LoadingSkeleton({ width, height, shape = 'rect', count = 1 }) {
  return (
    <div>
      {[...Array(count)].map((_, index) => (
        <Skeleton
          key={index}
          height={height}
          width={width}
          circle={shape === 'circle'}
          // style={{ marginBottom: '1rem' }}
        />
      ))}
    </div>
  );
}
