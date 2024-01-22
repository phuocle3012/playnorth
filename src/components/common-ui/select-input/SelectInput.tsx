import React, {useState, useRef, useEffect} from "react";
import styles from '@/components/common-ui/select-input/select-input.module.sass';
import MdiIcon from "@/components/common-ui/icons/MdiIcon";
import classNames from "classnames";

type SelectInputProps = {
  label: string,
  items: SelectItem[],
  value: string | number,
  className?: string,
  onChange: (text: string | number) => void;
};

interface SelectItem {
  text: string | number,
  value: string | number,
}

const SelectInput: React.FC<SelectInputProps> = ({label, value, className, onChange, items}) => {
  const [active, setActive] = useState(false);
  const fieldsetRef = useRef(null);

  function toggleActive() {
    setActive(!active);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (fieldsetRef.current && !fieldsetRef.current.contains(event.target)) {
        setActive(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [fieldsetRef]);

  const optionElements = items && items.map(item => buildOptionElement(item, value, onChange));

  const fieldSetClass = classNames(
    styles['select-input-set'],
    !!value ? styles['select-input-active'] : '',
    styles[''],
    styles[''],
  );

  return (
    <div className={styles['select-input--container']}>
      <fieldset
        ref={fieldsetRef}
        className={fieldSetClass}
        onClick={() => toggleActive()}
      >

        <span className={styles['select-input-label']}>{label}</span>

        <div className={`${className ? className : ''} ${styles['select-input']}`}>
          <span className={styles['select-input-value']}>{value}</span>
        </div>

        {
          active && (<div className={styles['select-input--list-container']}>
            {optionElements}
          </div>)
        }

        {
          active ? <MdiIcon icon="mdi-chevron-up" className={styles['append-icon']}/> :
            <MdiIcon icon="mdi-chevron-down" className={styles['append-icon']}/>
        }
      </fieldset>
    </div>
  );
};

const buildOptionElement = (item, value, onChange) => {
  const optionClass = classNames(
    styles['select-option'],
    item.value === value ? styles['active'] : ''
  );

  return <div
    className={optionClass}
    key={item.value}
    onClick={() => onChange(item.value)}
  >
    {item.text}
  </div>
}

export default SelectInput;
