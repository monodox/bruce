import { AppLayout } from '@/components/app'

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AppLayout>{children}</AppLayout>
}
