import { Loader2, LucideProps } from 'lucide-react';

export const Spinner = (props: LucideProps) => (
  <Loader2 className="animate-spin" color="#20f6d8" {...props} />
);
