export interface ErrorHandlerProps {
  error: Error | null;
  onHandle: () => void;
}
