import React, {useState, useRef, useEffect} from "react";
import '@/app/common-ui/select-input/select-input.sass';
import MdiIcon from "@/app/common-ui/icons/MdiIcon";

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

  const optionElement = (item) => (<div
    className={`select-option ${item.value === value ? 'active' : ''}`}
    key={item.value}
    onClick={() => onChange(item.value)}
  >
    {item.text}
  </div>);

  const optionElements = items && items.map(item => optionElement(item));

  return (
    <div className="select-input--container">
      <fieldset
        ref={fieldsetRef}
        className={`select-input-set ${!!value ? 'select-input-active' : ''}`}
        onClick={() => toggleActive()}
      >

        <span className="select-input-label">{label}</span>

        <div className={`${className ? className : ''} select-input`}>
          <span className="select-input-value">{value}</span>
        </div>

        {
          active && (<div className="select-input--list-container">
            {optionElements}
          </div>)
        }

        {
          active ? <MdiIcon icon="mdi-chevron-up" className="append-icon"/> :
            <MdiIcon icon="mdi-chevron-down" className="append-icon"/>
        }
      </fieldset>
    </div>
  );
};

export default SelectInput;
