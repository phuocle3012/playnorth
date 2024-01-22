'use client';
import {getLoadingStore} from "@/lib/loading-store";
import styles from '@/components/common-ui/loading-overlay/loading-overlay.module.sass';
import {useAppSelector} from "@/lib/hook";

const LoadingOverlay = ({loadingProp}) => {
  const { loading } = useAppSelector(getLoadingStore);

  return (loading || loadingProp) && (
    <div className={styles['loading-overlay']}>
      <div className={styles['loading-icon-wrapper']}>
        <div className={styles['loading-icon']}/>
      </div>
    </div>
  );
};

export default LoadingOverlay;
