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
    idEjemplar: "",
    tipoPrestamo: "",
    estado: "",
    fechaSolicitud: new Date(),
    fechaPrestamo: undefined,
    fechaDevolucion: undefined,
    fechaDevolucionReal: undefined,
    isSkeleton: true,
};

export async function postBackLoans(idPrestamo: string, tipo: string): Promise<boolean> {
    const data = {
        idPrestamo: idPrestamo,
        tipoActualizacion: tipo,
      };
      
    const config = {
        method: 'patch',
        url: 'http://localhost:3000/Loans/update',
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
      url: `http://localhost:3000/Loans/${subQuery}`,
      headers: {}
    };

    let loans : Loan[] = [];

    try {
        const response = await axios(config);
        loans = response.data.content;

    } catch (error:any) {
        // Handle the error
        console.log(error.message);            
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
            loans[i].nombre = "Nombre Documento";
        }else{
            loans[i].nombre = "Query nombre";
            loans[i].imageUrl = `https://placehold.co/150x200?text=${loans[i].nombre}`; //temporal o cuando no existe imagen
        }
        
    }

    console.log(loans);
    return loans
}