import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

type OffCanvasContextData = ReturnType<typeof useProvideOffCanvas>;

const OffCanvasContext = createContext<OffCanvasContextData>(
  {} as OffCanvasContextData
);

export const OffCanvasProvider: React.FC = ({ children }) => {
  const { isOpen, open, close } = useProvideOffCanvas();
  const value = useMemo(() => ({ isOpen, open, close }), [close, isOpen, open]);

  return (
    <OffCanvasContext.Provider value={value}>
      {children}
    </OffCanvasContext.Provider>
  );
};

const useProvideOffCanvas = () => {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);
  return { isOpen, open, close };
};

export const useOffCanvas = () => {
  const ctx = useContext(OffCanvasContext);
  if (!ctx) {
    throw new Error('useOffCanvas was called outside of OffCanvasContext');
  }
  return ctx;
};
