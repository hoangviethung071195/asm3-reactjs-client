import { Fancybox } from '@fancyapps/ui';
import { uniq } from 'lodash';
import { PropsWithChildren, useEffect, useState } from 'react';
import { getFileUrl, getRelativeImageSrc } from 'utils/helpers/file';

export default function ImageLoader(props: PropsWithChildren<{
  fileId?: string;
  fileIds?: string[];
  className?: string;
  containerClassName?: string;
}>) {
  const { fileId, fileIds, className, containerClassName } = props;
  const [src, setSrc] = useState(getRelativeImageSrc('loadimg.webp'));

  useEffect(() => {
    if (!fileId) {
      const noPhotoSrc = getRelativeImageSrc('no-photo-icon-5.jpg');
      setSrc(noPhotoSrc);
      return;
    }
    const url = getFileUrl(fileId);
    const img = new Image();

    img.setAttribute('src', src);
    img.onload = () => {
      setSrc(url);
    };
    img.onerror = () => {
      const errSrc = getRelativeImageSrc('errorimg.png');
      setSrc(errSrc);
    };
  });

  function clickImageHandler() {
    let imgIds = [fileId];

    if (fileIds?.length) {
      imgIds = uniq(imgIds.concat(fileIds));
    }

    Fancybox.show(
      imgIds.map(id => ({
        src: getFileUrl(id),
      })),
      {
        hideScrollbar: false,
      }
    );
  }

  return (
    <div className={'hover-effect-overlay ' + containerClassName} onClick={clickImageHandler}>
      <img src={src} alt="" className={className} />
    </div>
  );
}