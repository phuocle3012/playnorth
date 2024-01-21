import React, {useState, useRef, useEffect} from "react";
import '@/app/common-ui/text-input/text-input.sass';
import MdiIcon from "@/app/common-ui/icons/MdiIcon";
import AnchoredText from "@/app/common-ui/anchored-text/AnchoredText";

type TextInputProps = {
  label: string,
  value: string | number,
  className?: string,
  onChange: (text: string) => void;
  appendIcon?: string,
  textColor?: string,
};

const TextInput: React.FC<TextInputProps> = ({label, value, className, appendIcon, onChange}) => {
  const [active, setActive] = useState(false);
  const fieldsetRef = useRef(null);

  function toggleActive(isActiveVal) {
    if (!value && !isActiveVal) {
      return;
    }

    setActive(isActiveVal);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (fieldsetRef.current && !fieldsetRef.current.contains(event.target)) {
        toggleActive(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [fieldsetRef]);

  return (
    <div className="text-field--container">
      <fieldset
        ref={fieldsetRef}
        className={`text-field-set ${active ? 'text-field-active' : ''}`}
        onClick={() => toggleActive(true)}
      >
        <AnchoredText className="text-field-label" label={label}/>

        <input
          className={`${className ? className : ''} text-field`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        {
          appendIcon &&
          (<MdiIcon icon={appendIcon} className="append-icon"/>)
        }
      </fieldset>
    </div>
  );
};

export default TextInput;
