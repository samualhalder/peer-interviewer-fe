'use client';

import { useEffect, useRef, useState } from 'react';

const RouteChangeGuard = ({ showGaurd = true }: { showGaurd: boolean }) => {
  const [showModal, setShowModal] = useState(false);
  const initializedRef = useRef(false); // prevent multiple pushState

  useEffect(() => {
    if (!showGaurd) return;

    if (!initializedRef.current) {
      history.pushState({ guarded: true }, '', location.href);
      initializedRef.current = true;
    }

    const handlePopState = (e: PopStateEvent) => {
      if (!showGaurd) return;

      setShowModal(true);
      history.pushState({ guarded: true }, '', location.href); // push only once, blocks back
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [showGaurd]);

  const handleCancel = () => setShowModal(false);

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Want to leave this meeting?</h2>
            <p className="mb-6">If you want to leave this meeting, please click on End Meeting.</p>
            <div className="flex justify-end gap-4">
              <button onClick={handleCancel} className="px-4 py-2 bg-gray-300 rounded">
                Ok
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RouteChangeGuard;
