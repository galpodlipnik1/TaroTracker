import TopBar from '../components/TopBar';

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TopBar>{children}</TopBar>;
}
