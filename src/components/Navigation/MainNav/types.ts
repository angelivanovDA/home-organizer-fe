export interface MainNavProps {
  isAuth: boolean;
  selectedKey: string;
  onOpenMobileNav: () => void;
  onMenuClick: ({ key }: { key: string }) => void;
}
