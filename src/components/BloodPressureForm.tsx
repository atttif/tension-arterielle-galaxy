import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { BloodPressureResult } from "./BloodPressureResult";

const formSchema = z.object({
  systolic: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) < 300, {
    message: "La tension systolique doit être un nombre entre 0 et 300",
  }),
  diastolic: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) < 200, {
    message: "La tension diastolique doit être un nombre entre 0 et 200",
  }),
  age: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) < 120, {
    message: "L'âge doit être un nombre entre 0 et 120",
  }),
  gender: z.enum(["male", "female"], {
    required_error: "Veuillez sélectionner votre genre",
  }),
});

export const BloodPressureForm = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      systolic: "",
      diastolic: "",
      age: "",
      gender: "male",
    },
  });

  const [result, setResult] = React.useState<{
    systolic: number;
    diastolic: number;
    age: number;
    gender: string;
  } | null>(null);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted with values:", values);
    setResult({
      systolic: Number(values.systolic),
      diastolic: Number(values.diastolic),
      age: Number(values.age),
      gender: values.gender,
    });
    toast({
      title: "Formulaire soumis",
      description: "Vos données ont été analysées avec succès.",
    });
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Évaluation de la Tension Artérielle</CardTitle>
          <CardDescription>
            Cette application est uniquement informative et ne remplace pas l'avis d'un professionnel de santé.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="systolic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tension systolique (mmHg)</FormLabel>
                    <FormControl>
                      <Input placeholder="120" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="diastolic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tension diastolique (mmHg)</FormLabel>
                    <FormControl>
                      <Input placeholder="80" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Âge</FormLabel>
                    <FormControl>
                      <Input placeholder="25" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="male" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Homme
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="female" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Femme
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Évaluer
              </Button>
            </form>
          </Form>

          {result && <BloodPressureResult {...result} />}
        </CardContent>
      </Card>
    </div>
  );
};