import { useState } from 'react';
import type { InputHTMLAttributes } from 'react';

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  showToggle?: boolean;
}

export default function AuthInput({
  id,
  label,
  error,
  showToggle = false,
  type,
  className,
  ...props
}: AuthInputProps) {
  const [visible, setVisible] = useState(false);
  const inputType = showToggle ? (visible ? 'text' : 'password') : type;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-[#0F172A]">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={inputType}
          className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-[#0F172A] placeholder-slate-400 bg-white
            transition-colors outline-none
            focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]
            ${error ? 'border-red-400 focus:ring-red-400 focus:border-red-400' : 'border-slate-300 hover:border-slate-400'}
            ${className ?? ''}`}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
          {...props}
        />
        {showToggle && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors text-xs font-medium"
            aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {visible ? 'Ocultar' : 'Mostrar'}
          </button>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
