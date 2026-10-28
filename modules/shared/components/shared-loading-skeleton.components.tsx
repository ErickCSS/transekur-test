type SharedLoadingSkeletonProps = {
  rows?: number;
};

export function SharedLoadingSkeleton({ rows = 3 }: SharedLoadingSkeletonProps) {
  return (
    <div className="flex w-full flex-col gap-3" aria-label="Loading">
      {Array.from({ length: rows }, (_, rowIndex) => (
        <div key={rowIndex} className="h-20 animate-pulse rounded-2xl bg-ink/5" />
      ))}
    </div>
  );
}
