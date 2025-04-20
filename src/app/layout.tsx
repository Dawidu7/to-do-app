import { type Metadata } from "next"
import "~/styles/globals.css"
import { TRPCReactProvider } from "~/trpc/react"

export const metadata: Metadata = {
  title: "To Do App",
  description: "Just your simple to do app with some auth.",
}

export default function RootLayout({ children }: Children) {
  return (
    <html lang="en">
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  )
}
