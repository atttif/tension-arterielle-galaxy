import { OvulationCalculator } from "@/components/OvulationCalculator";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Calculateur d'Ovulation
          </h1>
          <p className="text-lg text-gray-600">
            Estimez vos périodes fertiles et dates d'ovulation
          </p>
        </div>
        
        <OvulationCalculator />
      </div>
    </div>
  );
};

export default Index;