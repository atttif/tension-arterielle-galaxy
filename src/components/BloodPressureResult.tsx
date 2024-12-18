import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BloodPressureResultProps {
  systolic: number;
  diastolic: number;
  age: number;
  gender: string;
}

export const BloodPressureResult: React.FC<BloodPressureResultProps> = ({
  systolic,
  diastolic,
  age,
  gender,
}) => {
  const getCategory = () => {
    if (systolic < 90 || diastolic < 60) {
      return {
        category: "Tension artérielle basse",
        description: "Votre tension est inférieure aux valeurs normales.",
        color: "text-blue-600",
      };
    } else if (systolic < 120 && diastolic < 80) {
      return {
        category: "Tension artérielle optimale",
        description: "Votre tension est dans la plage optimale.",
        color: "text-green-600",
      };
    } else if (systolic < 130 && diastolic < 85) {
      return {
        category: "Tension artérielle normale",
        description: "Votre tension est dans la plage normale.",
        color: "text-green-500",
      };
    } else if (systolic < 140 && diastolic < 90) {
      return {
        category: "Tension artérielle normale haute",
        description: "Votre tension est légèrement élevée mais reste acceptable.",
        color: "text-yellow-600",
      };
    } else {
      return {
        category: "Tension artérielle élevée",
        description: "Votre tension est au-dessus des valeurs normales. Consultez un professionnel de santé.",
        color: "text-red-600",
      };
    }
  };

  const result = getCategory();

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className={result.color}>{result.category}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{result.description}</p>
        <div className="space-y-2 text-sm text-gray-600">
          <p>Tension systolique : {systolic} mmHg</p>
          <p>Tension diastolique : {diastolic} mmHg</p>
          <p>Âge : {age} ans</p>
          <p>Genre : {gender === 'male' ? 'Homme' : 'Femme'}</p>
        </div>
        <p className="mt-4 text-sm text-gray-500 italic">
          Note : Ces résultats sont donnés à titre indicatif. Consultez toujours un professionnel de santé pour une évaluation précise.
        </p>
      </CardContent>
    </Card>
  );
};