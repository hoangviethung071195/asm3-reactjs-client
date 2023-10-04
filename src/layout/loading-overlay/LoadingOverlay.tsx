import { Component, PropsWithChildren } from "react";
import Overlay, { LoadingOverlayProps } from 'react-loading-overlay';
import { BounceLoader } from 'react-spinners';

export default function LoadingOverlay(props: PropsWithChildren<LoadingOverlayProps & { loading: boolean; }>) {
  const { children, loading } = props;

  const LoadingOverlayCustom = Overlay as typeof Component<PropsWithChildren<LoadingOverlayProps>>;

  return (
    // <LoadingOverlayCustom
    //   active={loading}
    //   text={
    //     <div className={s['loading-img']}></div>
    //   }
    // >
    //   {!loading && children}
    // </LoadingOverlayCustom>
    <LoadingOverlayCustom
      active={loading}
      spinner={<BounceLoader />}
    >
      {children}
    </LoadingOverlayCustom>
  );
}
