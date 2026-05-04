'use client';

import { useEffect } from 'react';
import { captureUTMs } from '@/lib/utm-capture';

export function UTMCaptureClient() {
  useEffect(() => {
    captureUTMs();
  }, []);

  return null;
}
