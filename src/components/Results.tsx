import React from 'react';
import { addDays, format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ResultsProps {
  lastPeriodDate: Date;
  cycleLength: number;
}

export const Results: React.FC<ResultsProps> = ({ lastPeriodDate, cycleLength }) => {
  const ovulationDate = addDays(lastPeriodDate, cycleLength - 14);
  const fertileStart = addDays(ovulationDate, -5);
  const fertileEnd = addDays(ovulationDate, 1);
  const nextPeriod = addDays(lastPeriodDate, cycleLength);

  const formatDate = (date: Date) => {
    return format(date, 'dd MMMM yyyy', { locale: fr });
  };

  return (
    <div className="space-y-6 animate-fadeIn bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="space-y-4">
        <div className="bg-primary-light rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-2">Date d'ovulation estimée</h3>
          <p className="text-lg text-primary-dark">{formatDate(ovulationDate)}</p>
        </div>

        <div className="bg-secondary-light rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-2">Période fertile</h3>
          <p className="text-secondary-dark">
            Du {formatDate(fertileStart)} au {formatDate(fertileEnd)}
          </p>
        </div>

        <div className="bg-accent rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-2">Prochaines règles estimées</h3>
          <p className="text-accent-foreground">{formatDate(nextPeriod)}</p>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-4">
        Ces dates sont des estimations basées sur un cycle régulier. Consultez un professionnel de santé pour un suivi personnalisé.
      </p>
    </div>
  );
};