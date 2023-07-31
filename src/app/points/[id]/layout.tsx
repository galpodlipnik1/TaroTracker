import TopBar from '../../components/TopBar';

export default function PointsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TopBar>{children}</TopBar>;
}
