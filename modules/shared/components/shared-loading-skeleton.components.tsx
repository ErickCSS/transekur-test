import { Skeleton } from "./ui/skeleton";

type SharedLoadingSkeletonProps = {
  rows?: number;
};

export function SharedLoadingSkeleton({ rows = 3 }: SharedLoadingSkeletonProps) {
  return (
    <div className="flex w-full flex-col gap-3" aria-label="Loading">
      {Array.from({ length: rows }, (_, rowIndex) => (
        <Skeleton key={rowIndex} className="h-20" />
      ))}
    </div>
  );
}
