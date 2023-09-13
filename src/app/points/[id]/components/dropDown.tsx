import ReactSelect from 'react-select';

interface SelectProps {
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  disabled?: boolean;
  placeholder?: string;
}

const DropDown: React.FC<SelectProps> = ({
  required,
  value,
  onChange,
  options,
  disabled,
  placeholder,
}) => {
  return (
    <div className="z-[100]">
      <div className="mt-2">
        <ReactSelect
          required={required}
          isDisabled={disabled}
          value={value}
          onChange={(selectedOption: any) => onChange(selectedOption)}
          placeholder={placeholder}
          options={
            options.map((option) => ({
              value: option.replace(/\s/g, ''),
              label: option,
            })) as any
          }
          menuPortalTarget={document?.body}
          styles={{
            menuPortal: (base) => ({
              ...base,
              zIndex: 9999,
            }),
          }}
          classNames={{
            control: () => 'text-sm',
          }}
        />
      </div>
    </div>
  );
};

export default DropDown;
