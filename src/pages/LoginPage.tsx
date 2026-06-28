import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import AuthCard from '../components/auth/AuthCard';
import AuthInput from '../components/auth/AuthInput';
import { useAuth } from '../context/AuthContext';

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

function validate(email: string, password: string): FormErrors {
  const errors: FormErrors = {};
  if (!email.trim()) {
    errors.email = 'El correo electrónico es requerido.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Ingresa un correo electrónico válido.';
  }
  if (!password) {
    errors.password = 'La contraseña es requerida.';
  } else if (password.length < 6) {
    errors.password = 'La contraseña debe tener al menos 6 caracteres.';
  }
  return errors;
}

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validation = validate(email, password);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    try {
      await login({ email: email.trim(), password });
      navigate('/');
    } catch (err) {
      setErrors({
        general: err instanceof Error ? err.message : 'Error al iniciar sesión.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout>
      <AuthCard>
        {/* Encabezado */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#0F172A]">Iniciar sesión</h1>
          <p className="text-sm text-slate-600 mt-1">
            Accede al panel de monitoreo de CrowdSense AI.
          </p>
        </div>

        {/* Error general */}
        {errors.general && (
          <div
            role="alert"
            className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700"
          >
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <AuthInput
            id="email"
            label="Correo electrónico"
            type="email"
            autoComplete="email"
            placeholder="tu@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            disabled={isSubmitting}
          />

          <AuthInput
            id="password"
            label="Contraseña"
            type="password"
            showToggle
            autoComplete="current-password"
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            disabled={isSubmitting}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          ¿No tienes cuenta?{' '}
          <Link
            to="/register"
            className="text-[#2563EB] font-medium hover:text-blue-800 transition-colors"
          >
            Regístrate
          </Link>
        </p>

        {/* Nota de cuentas demo para desarrollo */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">
            Cuentas de prueba (mock)
          </p>
          <div className="flex flex-col gap-1.5 text-xs text-slate-500">
            <span>
              <span className="font-medium text-slate-600">Vigilante:</span>{' '}
              vigilante@crowdsense.ai / 123456
            </span>
            <span>
              <span className="font-medium text-slate-600">Administrador:</span>{' '}
              admin@crowdsense.ai / admin123
            </span>
          </div>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
