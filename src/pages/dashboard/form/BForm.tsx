import React, { ReactNode } from 'react';
import { FormProvider, useForm, FieldValues } from 'react-hook-form';

interface BFormProps<T extends FieldValues> {
  children: ReactNode;
  onSubmit: (data: T) => any;
  defaultValues?: any;
  resolver?: any;
}

const BForm = <T extends FieldValues>({
  children,
  onSubmit,
  defaultValues,
  resolver,
}: BFormProps<T>) => {
  const FormConfig: any = {};
  if (defaultValues) {
    FormConfig['defaultValues'] = defaultValues;
  }

  if (resolver) {
    FormConfig['resolver'] = resolver;
  }

  const methods = useForm<T>(FormConfig);
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default BForm;
