'use client'

import { ReactNode } from 'react'

import { ClerkProvider, SignIn, useAuth } from '@clerk/nextjs'
import {
  AuthLoading,
  Authenticated,
  ConvexReactClient,
  Unauthenticated,
} from 'convex/react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'

import { FullscreenLoader } from './fullscreen-loader'

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      afterSignOutUrl="/"
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <Authenticated>{children}</Authenticated>

        <Unauthenticated>
          <div className="flex min-h-screen items-center justify-center">
            <SignIn routing="hash" />
          </div>
        </Unauthenticated>

        <AuthLoading>
          <FullscreenLoader label="Room loading..." />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}
