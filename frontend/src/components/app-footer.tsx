export function AppFooter() {
  return (
    <footer className="border-t bg-background px-6 py-4">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>&copy; {new Date().getFullYear()} Bruce</span>
        <span>All rights reserved.</span>
      </div>
    </footer>
  )
}
