import { AppLayout } from '@/components/app-layout'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AppLayout>{children}</AppLayout>
}
