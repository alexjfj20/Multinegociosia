import React from 'react';
import { ChatBubbleLeftEllipsisIcon, SparklesIcon } from '../icons'; // Reusing icons

const AdminMessagingPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <header className="pb-6 border-b border-neutral-200">
        <h1 className="text-3xl font-bold text-neutral-800">Mensajería para Administradores</h1>
        <p className="mt-1 text-sm text-neutral-600">
          Envía mensajes personalizados a administradores individuales o múltiples.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Compose Message Section */}
        <div className="lg:col-span-2 bg-white p-6 shadow-lg rounded-xl border border-neutral-200">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Redactar Mensaje</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="recipients" className="block text-sm font-medium text-neutral-700">Destinatarios</label>
              <input type="text" name="recipients" id="recipients" placeholder="Ej: admin1@example.com, admin_group" className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm sm:text-sm" />
              <p className="text-xs text-neutral-500 mt-1">Seleccionar individualmente, por grupo o todos.</p>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-neutral-700">Asunto</label>
              <input type="text" name="subject" id="subject" className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm sm:text-sm" />
            </div>
            <div>
              <label htmlFor="messageBody" className="block text-sm font-medium text-neutral-700">Cuerpo del Mensaje</label>
              <textarea name="messageBody" id="messageBody" rows={6} className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm sm:text-sm"></textarea>
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-neutral-700">Categoría</label>
              <select name="category" id="category" className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm sm:text-sm bg-white">
                <option>Informativo</option>
                <option>Alerta</option>
                <option>Aviso de Pago</option>
                <option>Felicitación</option>
              </select>
            </div>
            <button type="submit" className="px-4 py-2 bg-primary text-white font-medium rounded-lg shadow-md hover:bg-blue-700">Enviar Mensaje</button>
          </form>
          <div className="text-center py-6 mt-4 border-t border-neutral-200">
            <ChatBubbleLeftEllipsisIcon className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
            <p className="text-neutral-500 text-sm">
                La funcionalidad completa de envío y selección de destinatarios está pendiente.
            </p>
        </div>
        </div>

        {/* Message History Section */}
        <div className="lg:col-span-1 bg-white p-6 shadow-lg rounded-xl border border-neutral-200">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Historial de Mensajes</h2>
          <div className="text-center py-10">
            <SparklesIcon className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
            <p className="text-neutral-500">
              Aquí se mostrará el historial de mensajes enviados.
              (Funcionalidad pendiente de implementación)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMessagingPage;