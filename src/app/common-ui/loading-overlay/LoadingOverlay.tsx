'use client';
import {getLoadingStore} from "@/lib/loading-store";
import '@/app/common-ui/loading-overlay/loading-overlay.sass';
import {useAppSelector} from "@/lib/hook";

const LoadingOverlay = ({loadingProps}) => {
  const { loading } = useAppSelector(getLoadingStore);

  return (loading || loadingProps) && (
    <div id="loading-overlay">
      <div id="loading-icon-wrapper">
        <div id="loading-icon"/>
      </div>
    </div>
  );
};

export default LoadingOverlay;
