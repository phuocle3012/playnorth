import '@/app/common-ui/anchored-text/anchored-text.sass';

type AnchoredTextProps = {
  label: string | number,
  color?: string | undefined,
  size?: string,
  weight?: string,
  underline?: boolean,
  className?: string,
}

const AnchoredText: React.FC<AnchoredTextProps> = ({label, className, color = 'darkGrey', size = 'medium', weight = 'normal', underline = false}) => {
  const classes = `${className ? className : ''} anchored-text color-${color} size-${size} weight-${weight} ${underline ? 'underline' : ''}`;
  return <span className={classes}>{label}</span>
};


export default AnchoredText;
