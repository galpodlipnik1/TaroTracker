import TopBar from '../components/TopBar';

export default function LeaderboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TopBar>{children}</TopBar>;
}
