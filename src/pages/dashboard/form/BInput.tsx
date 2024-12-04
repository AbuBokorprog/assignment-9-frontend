import { TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';

type BInputProps = {
  label: string;
  name: string;
  require: boolean;
  placeHolder: string;
  type: string;
  defaultValue: any;
};

const BInput: React.FC<BInputProps> = ({
  label = '',
  name,
  require,
  type = 'text',
  placeHolder,
  defaultValue = '',
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="w-full">
      {/* Outside Label */}
      <label
        htmlFor={name}
        className="mb-2 block text-sm text-left font-medium text-gray-700"
      >
        {label}
      </label>

      <TextField
        id={name}
        name={name}
        required={require}
        type={type}
        defaultValue={defaultValue}
        variant="outlined"
        placeholder={placeHolder}
        size="medium"
        {...register(name)}
        className="w-full"
      />
      {errors.name && errors.name.type === 'required' && (
        <span>This is required</span>
      )}
    </div>
  );
};

export default BInput;
