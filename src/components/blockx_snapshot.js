import React, { useEffect } from 'react';

const SnapshotFrame = () => {
  useEffect(() => {
    const timestamp = new Date().getTime();
    const iframe = document.getElementById('snapshotFrame');
    iframe.src = `https://snapshots.256x25.tech/blockx.html?cache_bust=${timestamp}`;
  }, []);

  return <iframe id="snapshotFrame" frameBorder="0" width="100%" height="250px" />;
};

export default SnapshotFrame;
