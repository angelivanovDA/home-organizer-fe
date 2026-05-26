export interface MobileNavProps {
  open: boolean;
  isAuth: boolean;
  selectedKey: string;
  onClose: () => void;
  onMenuClick: ({ key }: { key: string }) => void;
}
