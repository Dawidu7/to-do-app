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
      <body className="grid h-screen place-items-center bg-gray-200">
        <TRPCReactProvider>
          <main className="rounded-xl bg-white p-4 shadow-xl">{children}</main>
        </TRPCReactProvider>
      </body>
    </html>
  )
}
