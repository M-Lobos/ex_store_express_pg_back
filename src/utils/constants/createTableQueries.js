
export const createTableQueries = [
    {   /* tabla usuarios */
        queryText: `
        CREATE TABLE IF NOT EXISTS usuarios(
                id UUID PRIMARY KEY,
                nombre VARCHAR(225) NOT NULL,
                apellido_paterno VARCHAR(225) NOT NULL,
                apellido_materno VARCHAR(225) NOT NULL,
                email VARCHAR(225) NOT NULL UNIQUE,
                phone VARCHAR(12) NOT NULL,
                active BOOLEAN DEFAULT TRUE
            );
            `
        ,
        name: 'usuarios'
    },
    {   /* tabla direccion */
        queryText: `
        CREATE TABLE IF NOT EXISTS direccion(
                id UUID PRIMARY KEY,
                user_id UUID REFERENCES usuarios(id),
                calle VARCHAR(225) NOT NULL, 
                numero VARCHAR(6) NOT NULL,
                comuna VARCHAR(225) NOT NULL,
                region VARCHAR(225) NOT NULL,
                ciudad VARCHAR(225) NOT NULL, 
                zip_code VARCHAR(10) NOT NULL
            );`
        ,
        name: 'direccion'
    },
    {   /* tabla productos */
        queryText: `
        CREATE TABLE IF NOT EXISTS productos(
                id UUID PRIMARY KEY,
                nombre VARCHAR(225) NOT NULL, 
                descripcion TEXT NOT NULL, 
                price INTEGER NOT NULL, 
                stock INTEGER NOT NULL DEFAULT 0, 
                active BOOLEAN DEFAULT TRUE
            );`
        ,
        name: 'productos'
    },
    {   /* tabla ventas */
        queryText: `
        CREATE TABLE IF NOT EXISTS ventas(
                id UUID PRIMARY KEY,
                user_id UUID REFERENCES usuarios(id),
                total INTEGER NOT NULL, 
                date TIMESTAMP DEFAULT NOW()
            );`
        ,
        name: 'ventas'
    },
    {   /* tabla ventas_productos */
        queryText: `
        CREATE TABLE IF NOT EXISTS ventas_productos(
                id UUID PRIMARY KEY,
                ventas_id UUID REFERENCES ventas(id),
                productos_id UUID REFERENCES productos(id),
                cantidad INTEGER NOT NULL, 
                subtotal INTEGER NOT NULL
            );`
        ,
        name: 'ventas_productos'
    },
];
