import React, {useState, useRef, useEffect} from "react";
import styles from '@/components/common-ui/text-input/text-input.module.sass';
import MdiIcon from "@/components/common-ui/icons/MdiIcon";
import AnchoredText from "@/components/common-ui/anchored-text/AnchoredText";
import classNames from "classnames";

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

  const fieldSetClasses = classNames(
    styles['text-field-set'],
    active && styles['text-field-active'],
  );

  const inputClasses = classNames(
    styles['text-field'],
    className && className
  );

  return (
    <div className={styles['text-field--container']}>
      <fieldset
        ref={fieldsetRef}
        className={fieldSetClasses}
        onClick={() => toggleActive(true)}
      >
        <AnchoredText className={styles['text-field-label']} label={label}/>

        <input
          className={inputClasses}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        {
          appendIcon &&
          (<MdiIcon icon={appendIcon} className={styles['append-icon']}/>)
        }
      </fieldset>
    </div>
  );
};

export default TextInput;
