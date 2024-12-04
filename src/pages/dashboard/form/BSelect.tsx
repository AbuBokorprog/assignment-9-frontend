import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';

type BSelectProps = {
  label: string;
  name: string;
  require: boolean;
  defaultValue: any;
  variant: 'outlined' | 'filled' | 'standard' | undefined;
  size: 'medium' | 'small';
  options: any;
};

const PSelect: React.FC<BSelectProps> = ({
  label,
  name,
  require,
  defaultValue = [],
  variant = 'outlined',
  size = 'medium',
  options,
}) => {
  const {
    register,
    formState: { errors },
    setValue, // To manually set form value
    watch, // To watch field values
  } = useFormContext();

  const formValue = watch(name); // Get current value from form

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(name, event.target.value); // Set form value when selection changes
  };

  return (
    <FormControl variant="filled" fullWidth error={!!errors[name]}>
      <InputLabel id={name}>{label}</InputLabel>
      <Select
        name={name}
        required={require}
        value={formValue || defaultValue}
        onChange={handleChange}
        {...register(name, { required: require })}
        variant={variant}
        size={size}
        className="w-full"
      >
        <MenuItem value="">
          <em>{defaultValue}</em>
        </MenuItem>
        {options?.map((option: any, index: number) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {errors[name] && (
        <FormHelperText>{errors[name]?.message as string}</FormHelperText>
      )}
    </FormControl>
  );
};

export default PSelect;
