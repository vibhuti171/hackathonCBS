'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { AlertTriangleIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

interface FinanceFormValues {
  // Personal Information
  firstname: string;
  lastname: string;
  email: string;
  age: number;
  riskProfile: string;
  monthlyIncome: number;
  
  // Financial Goals
  financialGoals: {
    goalType: string;
    targetAmount: number;
    timeframe: string;
    priority: string;
  }[];
  
  // Investment Preferences
  investmentPreferences: {
    assetClass: string;
    allocationPercentage: number;
  }[];
}

const FinanceEntryForm = ({ initialData }: { initialData?: any }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [previousStep, setPreviousStep] = useState(0);

  const defaultValues = {
    firstname: '',
    lastname: '',
    email: '',
    age: 0,
    riskProfile: '',
    monthlyIncome: 0,
    financialGoals: [
      {
        goalType: '',
        targetAmount: 0,
        timeframe: '',
        priority: ''
      }
    ],
    investmentPreferences: [
      {
        assetClass: '',
        allocationPercentage: 0
      }
    ]
  };

  const form = useForm<FinanceFormValues>({
    defaultValues,
    mode: 'onChange'
  });

  const { control } = form;

  const { fields: goalFields, append: appendGoal, remove: removeGoal } = useFieldArray({
    control,
    name: 'financialGoals'
  });

  const { fields: prefFields, append: appendPref, remove: removePref } = useFieldArray({
    control,
    name: 'investmentPreferences'
  });

  const steps = [
    {
      id: 'Step 1',
      name: 'Basic Information',
      fields: ['firstname', 'lastname', 'email', 'age', 'riskProfile', 'monthlyIncome']
    },
    {
      id: 'Step 2',
      name: 'Financial Goals',
      fields: goalFields.map((_, index) => [
        `financialGoals.${index}.goalType`,
        `financialGoals.${index}.targetAmount`,
        `financialGoals.${index}.timeframe`,
        `financialGoals.${index}.priority`
      ]).flat()
    },
    {
      id: 'Step 3',
      name: 'Investment Preferences',
      fields: prefFields.map((_, index) => [
        `investmentPreferences.${index}.assetClass`,
        `investmentPreferences.${index}.allocationPercentage`
      ]).flat()
    }
  ];

  const riskProfiles = [
    { id: '1', name: 'Conservative' },
    { id: '2', name: 'Moderate' },
    { id: '3', name: 'Aggressive' }
  ];

  const goalTypes = [
    { id: '1', name: 'Retirement' },
    { id: '2', name: 'Home Purchase' },
    { id: '3', name: 'Education' },
    { id: '4', name: 'Emergency Fund' }
  ];

  const assetClasses = [
    { id: '1', name: 'Stocks' },
    { id: '2', name: 'Bonds' },
    { id: '3', name: 'Real Estate' },
    { id: '4', name: 'Crypto' }
  ];

  const timeframes = [
    { id: '1', name: '0-2 years' },
    { id: '2', name: '2-5 years' },
    { id: '3', name: '5-10 years' },
    { id: '4', name: '10+ years' }
  ];

  const priorities = [
    { id: '1', name: 'High' },
    { id: '2', name: 'Medium' },
    { id: '3', name: 'Low' }
  ];

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await form.trigger(fields as any[], { shouldFocus: true });
    if (!output) return;

    if (currentStep < steps.length - 1) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  const onSubmit = async (data: FinanceFormValues) => {
    try {
      setLoading(true);
      // Handle form submission here
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Create Financial Profile"
          description="Set up your financial profile and investment preferences"
        />
      </div>
      <Separator />

      {/* Progress Steps */}
      <div className="mb-8">
        <ul className="flex gap-4">
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              <div className={cn(
                "group flex w-full flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4",
                currentStep === index 
                  ? "border-sky-600" 
                  : currentStep > index 
                    ? "border-green-600"
                    : "border-gray-200"
              )}>
                <span className={cn(
                  "text-sm font-medium",
                  currentStep === index 
                    ? "text-sky-600"
                    : currentStep > index
                      ? "text-green-600"
                      : "text-gray-500"
                )}>
                  {step.id}
                </span>
                <span className="text-sm font-medium">{step.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {currentStep === 0 && (
            <div className="grid grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="john@example.com" {...field} />
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
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" disabled={loading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="monthlyIncome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Income</FormLabel>
                    <FormControl>
                      <Input type="number" disabled={loading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="riskProfile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Risk Profile</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select risk profile" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {riskProfiles.map((profile) => (
                          <SelectItem key={profile.id} value={profile.id}>
                            {profile.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4">
              {goalFields.map((field, index) => (
                <Accordion
                  type="single"
                  collapsible
                  defaultValue="item-1"
                  key={field.id}
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-left">
                      Financial Goal {index + 1}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-2 gap-4 p-4">
                        <FormField
                          control={form.control}
                          name={`financialGoals.${index}.goalType`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Goal Type</FormLabel>
                              <Select
                                disabled={loading}
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select goal type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {goalTypes.map((type) => (
                                    <SelectItem key={type.id} value={type.id}>
                                      {type.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`financialGoals.${index}.targetAmount`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Target Amount</FormLabel>
                              <FormControl>
                                <Input type="number" disabled={loading} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`financialGoals.${index}.timeframe`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Timeframe</FormLabel>
                              <Select
                                disabled={loading}
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select timeframe" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {timeframes.map((timeframe) => (
                                    <SelectItem key={timeframe.id} value={timeframe.id}>
                                      {timeframe.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`financialGoals.${index}.priority`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Priority</FormLabel>
                              <Select
                                disabled={loading}
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select priority" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {priorities.map((priority) => (
                                    <SelectItem key={priority.id} value={priority.id}>
                                      {priority.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        className="mt-2"
                        onClick={() => removeGoal(index)}
                      >
                        Remove Goal
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
              <Button
                type="button"
                onClick={() => appendGoal({
                  goalType: '',
                  targetAmount: 0,
                  timeframe: '',
                  priority: ''
                })}
              >
                Add Financial Goal
              </Button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              {prefFields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-2 gap-4 p-4 border rounded">
                  <FormField
                    control={form.control}
                    name={`investmentPreferences.${index}.assetClass`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Asset Class</FormLabel>
                        <Select
                          disabled={loading}
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select asset class" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {assetClasses.map((asset) => (
                              <SelectItem key={asset.id} value={asset.id}>
                                {asset.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`investmentPreferences.${index}.allocationPercentage`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Allocation Percentage</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            disabled={loading} 
                            {...field}
                            min="0"
                            max="100"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removePref(index)}
                    className="col-span-2"
                  >
                    Remove Asset Class
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() => appendPref({
                  assetClass: '',
                  allocationPercentage: 0
                })}
              >
                Add Asset Class
              </Button>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-5">
            <Button
              type="button"
              onClick={prev}
              disabled={currentStep === 0}
              variant="outline"
              className="flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
              Previous
            </Button>

            {currentStep === steps.length - 1 ? (
              <Button 
                type="submit"
                disabled={loading}
                className="flex items-center gap-2"
              >
                Submit
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </Button>
            ) : (
              <Button
                type="button"
                onClick={next}
                disabled={currentStep === steps.length - 1}
                className="flex items-center gap-2"
              >
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </Button>
            )}
          </div>
        </form>
      </Form>
    </>
  );
};

export default FinanceEntryForm;