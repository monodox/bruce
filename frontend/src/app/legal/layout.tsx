import { AppLayout } from '@/components/app-layout'

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AppLayout>{children}</AppLayout>
}
