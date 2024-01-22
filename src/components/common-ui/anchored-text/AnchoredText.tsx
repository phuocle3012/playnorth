import styles from '@/components/common-ui/anchored-text/anchored-text.module.sass';
import classNames from "classnames";

type AnchoredTextProps = {
  label: string | number,
  color?: string | undefined,
  size?: string,
  weight?: string,
  underline?: boolean,
  className?: string,
}

const AnchoredText: React.FC<AnchoredTextProps> = ({label, className, color = 'darkGrey', size = 'medium', weight = 'normal', underline = false}) => {
  const classes = classNames(
    className && className,
    styles['anchored-text'],
    styles[`color-${color}`],
    styles[`size-${size}`],
    styles[`weight-${weight}`],
    underline && styles['underline']
  );

  return <span className={classes}>{label}</span>
};


export default AnchoredText;
