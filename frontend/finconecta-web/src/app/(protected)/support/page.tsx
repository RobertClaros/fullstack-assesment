export default function SupportPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Soporte</h1>
      <p className="mb-6">
        Bienvenido al centro de soporte de Finconecta. Aquí puedes encontrar
        ayuda y contactarnos si tienes algún problema con la plataforma.
      </p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Contacto</h2>
        <ul className="list-disc ml-6">
          <li>
            Email:{" "}
            <a href="mailto:soporte@finconecta.com" className="text-blue-600">
              soporte@finconecta.com
            </a>
          </li>
          <li>Teléfono: +1 555-123-4567</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">
          FAQ / Preguntas frecuentes
        </h2>
        <ul className="list-disc ml-6">
          <li>
            ¿Olvidé mi contraseña? Usa la opción de recuperación de contraseña
            en la página de login.
          </li>
          <li>
            ¿Problemas al crear un cliente? Asegúrate de completar todos los
            campos obligatorios.
          </li>
          <li>Para otros problemas, contáctanos por email o teléfono.</li>
        </ul>
      </section>
    </div>
  );
}
