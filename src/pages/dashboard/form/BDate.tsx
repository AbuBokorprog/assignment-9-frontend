import { TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
type BTextareaProps = {
  label: string;
  name: string;
  require: boolean;
  variant: 'outlined' | 'filled' | 'standard' | undefined;
  size: 'medium' | 'small';
  defaultValue: any;
};
const BDate: React.FC<BTextareaProps> = ({
  label,
  name,
  require,
  variant = 'outlined',
  size = 'medium',
  defaultValue = '',
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <label
        htmlFor={name}
        className="mb-2 block text-sm text-left font-medium text-gray-700"
      >
        {label}
      </label>
      <TextField
        id={name}
        type="date"
        variant={variant}
        size={size}
        required={require}
        defaultValue={defaultValue} // default value for the date
        {...register(name, { required: require })}
        error={!!errors[name]}
        helperText={errors[name]?.message}
        InputLabelProps={{
          shrink: true, // to ensure the label stays above
        }}
        className="w-full"
      />
    </>
  );
};

export default BDate;
