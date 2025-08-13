import React, { useState, useEffect } from 'react';
import { AdminAccount, AdminAccountStatus } from '../../types';
import * as adminAccountService from '../../services/adminAccountService';
import { LoadingSpinnerIcon, UserCircleIcon, PlusCircleIcon, PencilIcon, TrashIcon, CheckCircleIcon, MinusCircleIcon, ExclamationCircleIcon } from '../icons';
import { Modal } from '../Modal'; // Assuming Modal component exists and is suitable

const AdminAccountManagementPage: React.FC = () => {
  const [adminAccounts, setAdminAccounts] = useState<AdminAccount[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // States for modal and editing/creating
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<AdminAccount | null>(null);
  const [accountToDelete, setAccountToDelete] = useState<AdminAccount | null>(null);

  useEffect(() => {
    fetchAdminAccounts();
  }, []);

  const fetchAdminAccounts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const accounts = await adminAccountService.getAdminAccounts();
      setAdminAccounts(accounts);
    } catch (err) {
      console.error("Error fetching admin accounts:", err);
      setError(err instanceof Error ? err.message : "Error al cargar cuentas.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAccount = () => {
    setEditingAccount(null); // Clear any previous editing state
    // For now, just log, actual form will be in modal
    console.log("Placeholder: Open create account form modal");
    // TODO: Open a modal with a form to create a new account
    alert("Funcionalidad de crear cuenta pendiente (se abriría un modal).");
  };

  const handleEditAccount = (account: AdminAccount) => {
    setEditingAccount(account);
    console.log("Placeholder: Open edit account form modal for", account.name);
    // TODO: Open a modal with a form pre-filled with account data
    alert(`Funcionalidad de editar cuenta pendiente para ${account.name} (se abriría un modal).`);
  };

  const handleDeleteRequest = (account: AdminAccount) => {
    setAccountToDelete(account);
  };
  
  const confirmDeleteAccount = async () => {
    if (!accountToDelete) return;
    try {
      await adminAccountService.deleteAdminAccount(accountToDelete.id);
      fetchAdminAccounts(); // Refresh list
    } catch (err) {
      console.error("Error deleting account:", err);
      setError(err instanceof Error ? err.message : "Error al eliminar cuenta.");
    } finally {
      setAccountToDelete(null);
    }
  };
  
  const handleToggleAccountStatus = async (account: AdminAccount) => {
    const newStatus = account.status === AdminAccountStatus.Active ? AdminAccountStatus.Inactive : AdminAccountStatus.Active;
    try {
      await adminAccountService.updateAdminAccount({ ...account, status: newStatus });
      fetchAdminAccounts(); // Refresh list
    } catch (err) {
      console.error("Error toggling account status:", err);
      setError(err instanceof Error ? err.message : "Error al cambiar estado.");
    }
  };

  const getStatusBadge = (status: AdminAccountStatus) => {
    switch (status) {
      case AdminAccountStatus.Active:
        return <span className="px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"><CheckCircleIcon className="w-3 h-3 mr-1 inline"/>Activo</span>;
      case AdminAccountStatus.Inactive:
        return <span className="px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-neutral-200 text-neutral-800"><MinusCircleIcon className="w-3 h-3 mr-1 inline"/>Inactivo</span>;
      case AdminAccountStatus.Suspended:
        return <span className="px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"><ExclamationCircleIcon className="w-3 h-3 mr-1 inline"/>Suspendido</span>;
      default:
        return <span className="px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-neutral-100 text-neutral-600">Desconocido</span>;
    }
  };


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinnerIcon className="w-12 h-12 text-primary" />
        <p className="ml-3 text-neutral-600">Cargando cuentas de administrador...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 bg-red-50 p-4 rounded-md">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <header className="pb-6 border-b border-neutral-200 flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold text-neutral-800">Gestión de Cuentas de Administrador</h1>
            <p className="mt-1 text-sm text-neutral-600">
            Crea, edita y gestiona las cuentas de los administradores del sistema.
            </p>
        </div>
        <button
            onClick={handleCreateAccount}
            className="flex items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
            <PlusCircleIcon className="w-5 h-5 mr-2"/>
            Crear Nueva Cuenta
        </button>
      </header>
      
      {adminAccounts.length === 0 ? (
        <div className="text-center py-10 bg-white p-6 shadow-md rounded-lg border border-neutral-200">
          <UserCircleIcon className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <p className="text-neutral-500">No hay cuentas de administrador registradas.</p>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-xl border border-neutral-200 overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Nombre</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Estado</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Plan</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Creado</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {adminAccounts.map((account) => (
                <tr key={account.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">{account.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">{account.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{getStatusBadge(account.status)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">{account.planId || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {new Date(account.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button 
                        onClick={() => handleToggleAccountStatus(account)} 
                        className="p-1.5 text-neutral-500 hover:text-primary rounded-md hover:bg-primary/10" 
                        title={account.status === AdminAccountStatus.Active ? 'Desactivar' : 'Activar'}
                    >
                        {account.status === AdminAccountStatus.Active ? <MinusCircleIcon className="w-5 h-5"/> : <CheckCircleIcon className="w-5 h-5"/>}
                    </button>
                    <button onClick={() => handleEditAccount(account)} className="p-1.5 text-neutral-500 hover:text-yellow-600 rounded-md hover:bg-yellow-500/10" title="Editar">
                        <PencilIcon className="w-5 h-5"/>
                    </button>
                    <button onClick={() => handleDeleteRequest(account)} className="p-1.5 text-neutral-500 hover:text-red-600 rounded-md hover:bg-red-500/10" title="Eliminar">
                        <TrashIcon className="w-5 h-5"/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    {accountToDelete && (
        <Modal
            isOpen={!!accountToDelete}
            onClose={() => setAccountToDelete(null)}
            title="Confirmar Eliminación"
            onConfirm={confirmDeleteAccount}
            confirmText="Eliminar Cuenta"
            cancelText="Cancelar"
            confirmButtonClass="bg-red-600 hover:bg-red-700 focus:ring-red-500"
        >
            <p>¿Estás seguro de que quieres eliminar la cuenta de administrador de <strong className="font-semibold">{accountToDelete.name} ({accountToDelete.email})</strong>?</p>
            <p className="mt-2 text-xs text-neutral-500">Esta acción no se puede deshacer y eliminará permanentemente la cuenta.</p>
        </Modal>
    )}

    </div>
  );
};

export default AdminAccountManagementPage;