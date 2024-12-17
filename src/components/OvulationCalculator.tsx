import React, { useState } from 'react';
import { Calendar } from './Calendar';
import { Results } from './Results';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export const OvulationCalculator = () => {
  const [lastPeriodDate, setLastPeriodDate] = useState<Date | null>(null);
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [showResults, setShowResults] = useState(false);

  const handleDateChange = (date: Date | null) => {
    setLastPeriodDate(date);
    setShowResults(false);
  };

  const handleCalculate = () => {
    if (lastPeriodDate) {
      setShowResults(true);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-8 animate-fadeIn">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Date des dernières règles
          </label>
          <Calendar selected={lastPeriodDate} onSelect={handleDateChange} />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Durée du cycle (jours)
          </label>
          <Input
            type="number"
            min="21"
            max="35"
            value={cycleLength}
            onChange={(e) => setCycleLength(parseInt(e.target.value) || 28)}
            className="w-full"
          />
        </div>

        <Button
          onClick={handleCalculate}
          className="w-full bg-primary hover:bg-primary-dark transition-colors"
          disabled={!lastPeriodDate}
        >
          Calculer
        </Button>
      </div>

      {showResults && lastPeriodDate && (
        <Results lastPeriodDate={lastPeriodDate} cycleLength={cycleLength} />
      )}
    </div>
  );
};