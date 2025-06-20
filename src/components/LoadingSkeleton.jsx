import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function LoadingSkeleton({ width, height, shape = 'rect', count = 1 }) {
  const customStyle = {
    background: 'linear-gradient(90deg, #f86, #f6a)',
    borderRadius: shape === 'circle' ? '100%' : '4px',
    margin: '-15px 0',
  };

  return (
    <div>
      {[...Array(count)].map((_, index) => (
        <Skeleton
          key={index}
          height={height}
          width={width}
          circle={shape === 'circle'}
          style={customStyle}
        />
      ))}
    </div>
  );
}
