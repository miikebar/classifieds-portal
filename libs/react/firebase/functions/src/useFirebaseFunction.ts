import { useCallback } from 'react';

export const useFirebaseFunction = <
  RequestData = unknown,
  ResponseData = unknown
>(
  functionName: string
) => {
  return useCallback(
    async (data: RequestData) => {
      const [firebaseFunctions, httpsCallable] = await Promise.all([
        import('@listic/core/firebase/functions').then(
          (m) => m.firebaseFunctions
        ),
        import('firebase/functions').then((m) => m.httpsCallable),
      ]);

      const fn = httpsCallable<RequestData, ResponseData>(
        firebaseFunctions,
        functionName
      );
      return fn(data);
    },
    [functionName]
  );
};
