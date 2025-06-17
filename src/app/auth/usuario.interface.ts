export interface Usuario {
	nombre: string;
	apellido: string;
	correo: string;
	clave: string;
	rol: 'admin' | 'user';
}