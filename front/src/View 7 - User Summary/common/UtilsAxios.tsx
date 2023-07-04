import axios from 'axios';

//helping with:
// - Axios beginings https://www.perplexity.ai/search/5f513401-c73d-42cb-9e69-69b4fec0e7db?s=u
// - async & useEffect https://www.perplexity.ai/search/9e151b54-75e9-4d4d-9a6c-1049bb434732?s=u
// - types dates & opctionals https://www.perplexity.ai/search/7c4d7b75-1b45-45af-98e2-f9c55c90b19a?s=u
// - comunication between components https://www.perplexity.ai/search/b4252431-5e58-4e8b-8c37-d1b2f24e0246?s=u

export interface Loan {
    _id: string;
    idUsuario: string;
    idEjemplar: string;
    tipoPrestamo: string;
    estado: string;
    fechaSolicitud: string | Date;
    fechaPrestamo?: string | Date;
    fechaDevolucion?: string | Date;
    fechaDevolucionReal?: string | Date;
    [key: string]: any;
};

const SkeletonLoan = {
    _id: "000000",
    idUsuario: "000000",
    idEjemplar: "000000",
    tipoPrestamo: "No disponible",
    estado: "No disponible",
    fechaSolicitud: new Date(),
    fechaPrestamo: undefined,
    fechaDevolucion: undefined,
    fechaDevolucionReal: undefined,
    isSkeleton: true,
};

export interface User {
    _id: string;
    rut: string;
    nombre: string;
    apellido: string;
    direccion: string;
    email: string;
    telefono: string;
    activo: boolean;
    fecha_registro: Date
    [key: string]: any; //otros
};

export const SkeletonUser = {
    _id: "000000",
    rut: "00.000.000-0",
    nombre: "Nombre",
    apellido: "Apellido",
    direccion: "Dirección",
    email: "Nombre1@example.com",
    telefono: "+00 0000 0000",
    userImage: `https://placehold.co/150?text=${"Nombre"}`,
    activo: false,
    fecha_registro: new Date(),
    isSkeleton: true,
};

export interface Ejemplar {
    _id: string,
    idDocumento: string,
    estado: string, // Tomado | Disponible
    ubicación: string,
    fecha_registro: Date,
    [key: string]: any; //otros
};

export const SkeletonEjemplar = {
    _id: "0000",
    idDocumento: "0000",
    estado: "Tomado",
    ubicación: "No disponible",
    fecha_registro: new Date(),
    isSkeleton: true,
};

export interface Document {
    _id: string;
    tipo: string;
    titulo: string;
    autor: string;
    editorial: string;
    anio: string;
    edicion: string;
    categoria: string;
    tipoMedio: string;
    fecha_registro: Date;
    imagen: string;
    [key: string]: any; //otros
};

export const SkeletonDocumento = {
    _id: "0000",
    tipo: "No disponible",
    titulo: "No disponible",
    autor: "No disponible",
    editorial: "No disponible",
    anio: "1900",
    edicion: "1",
    categoria: "No disponible",
    tipoMedio: "No disponible",
    imagen: `https://placehold.co/150x200?text=No disponible?`,
    fecha_registro: new Date(),
    isSkeleton: true,
};

//Loans
export async function postBackLoans(idPrestamo: string, tipo: string): Promise<boolean> {
    const data = {
        idPrestamo: idPrestamo,
        tipoActualizacion: tipo,
      };
      
    const config = {
        method: 'patch',
        url: 'http://localhost:3001/Loans/update',
        headers: { },
        data: data,
    };

    console.log(data);
      
    const response = await axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          return true;
        })
        .catch(function (error) {
          console.log(error);
          return false;
        });

    return response;
}

export async function getBackLoans(subQuery: string): Promise<Loan[]> {
    const config = {
      method: 'get',
      url: `http://localhost:3001/Loans/${subQuery}`,
      headers: {}
    };

    let loans : Loan[] = [];

    try {
        const response = await axios(config);
        loans = response.data.content;

    } catch (error:any) {
        // Handle the error
        //console.log(error.message);          
    }

    // Handle empty loans history - Después manejado como skeleton en render
    if (loans?.length === 0) {    
        loans.push(SkeletonLoan)
    }

    //Atributos de utilidad futura local
    for (let i = 0; i < loans.length; i++) {
        loans[i].isSkeleton = loans[i].isSkeleton === undefined ? false: true;
        loans[i].fechaSolicitud = new Date(loans[i].fechaSolicitud);
        loans[i].fechaPrestamo = loans[i].fechaPrestamo ? new Date(loans[i].fechaSolicitud as string) : undefined;
        loans[i].fechaDevolucion = loans[i].fechaDevolucion ? new Date(loans[i].fechaDevolucion as string) : undefined;
        loans[i].fechaDevolucionReal = loans[i].fechaDevolucionReal ? new Date(loans[i].fechaDevolucionReal as string) : undefined;

        //temporal - agregar en back o realizar query extra a back
        if (loans[i].isSkeleton) {
            loans[i].imageUrl = "https://via.placeholder.com/150x200";
            loans[i].nombre = "Documento de ejemplo";
        }else{
            console.log(loans[i].idEjemplar);
            const ejemplarData = await getBackEjemplar(loans[i].idEjemplar);
            console.log("ejemplarData");console.log(ejemplarData);
            const documentoData = await getBackDocumento(ejemplarData.idDocumento);
            console.log("documentoData");console.log(documentoData);
            loans[i].nombre = documentoData.titulo;
            loans[i].imagen = documentoData.imagen? documentoData.imagen: `https://placehold.co/150x200?text=Imagen no disponible`; //temporal o cuando no existe imagen
        }
        
    }

    console.log(loans);
    return loans
}

//User data
export async function getBackUser(userId: string): Promise<User> {
    const config = {
        method: 'get',
        url: `http://localhost:3001/get/user/${userId}`,
        headers: {}
      };

    try {
        const response = await axios(config);
        const user : User = response.data.message;
        user.userImage = `https://placehold.co/150?text=${"Nombre"}`; //temporal, not in back
        return user

    } catch (error:any) {
        // Handle the error
        //console.log(error.message);
        return SkeletonUser;         
    }
}

//Ejemplar estado
export async function getBackEjemplar(idEjemplar: string): Promise<Ejemplar> {
    const config = {
        method: 'get',
        url: `http://localhost:3001/ejemplares/buscar_ejemplar/${idEjemplar}`,
        headers: {}
      };

    try {
        const response = await axios(config);
        const ejemplar : Ejemplar = response.data;
        return ejemplar;

    } catch (error:any) {
        // Handle the error
        //console.log(error.message);
        return SkeletonEjemplar;         
    }
}

// actualizar ejemplar
export async function postBackEjemplar(idEjemplar: string, tipo: string): Promise<boolean> {
    const data = {
        estado: tipo //'Tomado' | 'Disponible'
      };
      
    const config = {
        method: 'put',
        url: `http://localhost:3001/ejemplares/${idEjemplar}`,
        headers: { },
        data: data,
    };
      
    const response = await axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          return true;
        })
        .catch(function (error) {
          //console.log(error);
          return false;
        });

    return response;
}

//Documento data, desde ejemplar
export async function getBackDocumento(idDocumento: string): Promise<Document> {
    const config = {
        method: 'get',
        url: `http://localhost:3001/documents/${idDocumento}`,
        headers: {}
      };

    try {
        const response = await axios(config);
        const ejemplar : Document = response.data;
        return ejemplar;

    } catch (error:any) {
        // Handle the error
        //console.log(error.message);
        return SkeletonDocumento;         
    }
}