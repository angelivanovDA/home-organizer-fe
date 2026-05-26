export interface FilePickerProps {
  id: string;
  label: string;
  valid?: boolean;
  touched?: boolean;
  onChange: (id: string, value: string, files?: FileList | null) => void;
  dragger?: boolean;
}
