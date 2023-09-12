import TopBar from '../components/TopBar';

export default function NewGameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TopBar>{children}</TopBar>;
}
