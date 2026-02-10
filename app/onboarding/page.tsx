import { OnboardingWizard } from "@/components/onboarding/onboarding-wizard"

export default function OnboardingPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-12 gradient-warm">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(75,46,57,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(75,46,57,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-champagne/30 blur-[120px]" />
      <div className="absolute right-1/3 bottom-1/4 h-[300px] w-[300px] rounded-full bg-marble/30 blur-[100px]" />

      <OnboardingWizard />
    </div>
  )
}
