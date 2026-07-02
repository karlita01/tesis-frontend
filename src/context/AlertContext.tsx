import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import type { AlertaSSEEvent } from '../types/api';
import {
  atenderAlerta as atenderAlertaService,
  streamAlertas,
} from '../services/alertaService';
import { useAuth } from './AuthContext';

function playAlertSound() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.35, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.7);
    setTimeout(() => { ctx.close().catch(() => null); }, 800);
  } catch { /* AudioContext no disponible */ }
}

interface AlertContextValue {
  pendingAlerts: AlertaSSEEvent[];
  dismissAlert: (id: number) => void;
  atenderAlerta: (id: number) => Promise<void>;
}

const AlertContext = createContext<AlertContextValue | null>(null);

export function AlertProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [pendingAlerts, setPendingAlerts] = useState<AlertaSSEEvent[]>([]);
  const cancelRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      cancelRef.current?.();
      cancelRef.current = null;
      setPendingAlerts([]);
      return;
    }

    const cancel = streamAlertas((ev) => {
      setPendingAlerts((prev) => [...prev, ev]);
      playAlertSound();
    });

    cancelRef.current = cancel;
    return () => cancel();
  }, [isAuthenticated]);

  const dismissAlert = useCallback((id: number) => {
    setPendingAlerts((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const atenderAlerta = useCallback(
    async (id: number) => {
      await atenderAlertaService(id);
      dismissAlert(id);
    },
    [dismissAlert],
  );

  return (
    <AlertContext.Provider value={{ pendingAlerts, dismissAlert, atenderAlerta }}>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlerts(): AlertContextValue {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error('useAlerts debe usarse dentro de <AlertProvider>');
  return ctx;
}
