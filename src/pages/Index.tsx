import { SOSButton } from "@/components/SOSButton";
import { SafeZoneMap } from "@/components/SafeZoneMap";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-primary text-white py-4 px-6 shadow-md">
        <h1 className="text-2xl font-bold">SafeSphere</h1>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Emergency Assistance</h2>
            <p className="text-gray-600 mb-8">Press the SOS button for immediate help</p>
            <SOSButton />
          </div>

          <div className="w-full max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Nearby Safe Zones</h2>
            <SafeZoneMap />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;