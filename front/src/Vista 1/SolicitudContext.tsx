// en SolicitudContext.tsx
import React, { createContext, useReducer,ReactNode } from 'react';

export type Book = {
  _id: number;
  tipo: string;
  titulo: string;
  autor: string;
  editorial: string;
  anio: string;
  edicion: string;
  categoria: string;
  ubicacion: string;
  imagen: string;
  fecha_registro: Date;
};

type ActionType = {
  type: 'add';
  payload: Book;
};

function solicitudesReducer(state: Book[], action: ActionType) {
  switch (action.type) {
    case 'add':
      return [...state, action.payload];
    default:
      return state;
  }
}

// Añadimos la definición de SolicitudContextType
export type SolicitudContextType = {
  solicitudes: Book[];
  dispatch: React.Dispatch<ActionType>;
};

export const SolicitudContext = createContext<SolicitudContextType | undefined>(undefined);

// Aquí definimos una interfaz para las propiedades del componente
interface SolicitudProviderProps {
  children: ReactNode;
}

// Aquí especificamos que SolicitudProvider acepta las propiedades definidas en SolicitudProviderProps
export const SolicitudProvider: React.FC<SolicitudProviderProps> = ({ children }) => {
  const [solicitudes, dispatch] = useReducer(solicitudesReducer, []);

  return (
    <SolicitudContext.Provider value={{ solicitudes, dispatch }}>
      {children}
    </SolicitudContext.Provider>
  );
};