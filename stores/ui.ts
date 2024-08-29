// Импортируем функцию defineStore из библиотеки pinia для создания хранилища
import { defineStore } from 'pinia'

type ConfirmationModalDataType = {
  text: string,
  action: () => any
}

export enum ModalViewType {
  FileUploadModalView = 'FileUploadModalView'
}

// Определяем тип состояния для хранилища ui
type uiState = {
  modalStatus: boolean;
  modalView: ModalViewType | undefined; 
  modalData: any; 
  confirmationModalStatus: boolean;
  confirmationModalData: ConfirmationModalDataType | undefined; 
};

// Начальное состояние хранилища
const defaultState: uiState = {
  modalStatus: false,
  modalView: undefined,
  modalData: undefined,
  confirmationModalStatus: false,
  confirmationModalData: undefined,
};

// Экспортируем хранилище uiStore
export const uiStore = defineStore({
  id: 'ui', // Идентификатор хранилища
  state: () => defaultState, // Начальное состояние хранилища
  getters: {},
  actions: {
    // Открываем modal и передаем данные в state
    openModal(view: ModalViewType, data?: any) {
      this.modalView = view;
      this.modalData = data;
      this.modalStatus = true;
    },
    // Закрываем modal и cбрасываем данные
    closeModal() {
      this.modalData = undefined;
      this.modalStatus = false;
    },
    // Открываем confirmation modal и передаем данные в state
    openConfirmationModal(text: string, action: () => any) {
      this.confirmationModalData = {
        text, 
        action
      };
      this.confirmationModalStatus = true;
    },
    // Закрываем confirmation modal и cбрасываем данные
    closeConfirmationModal() {
      this.confirmationModalData = undefined;
      this.confirmationModalStatus = false;
    },
  },
  persist: true, // Флаг для сохранения состояния хранилища между перезагрузками страницы
});
