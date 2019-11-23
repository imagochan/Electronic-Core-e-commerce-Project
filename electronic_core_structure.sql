create table usuario(
    id_usuario serial,
    username text not null,
    password text not null,
    constraint pk_usuario primary key (id_usuario));
)

create table admin(
    nombre varchar(100) not null,
    apellido varchar(100) not null,
    telefono varchar(9) not null,
    correo_institucional text not null,
    constraint pk_admin primary key (id_usuario)
) INHERITS (usuario)

create table cliente(
    nombre varchar(100) not null,
    apellido varchar(100) not null,
    email text,
    genero char(1),
    direccion text not null,
    tarjeta_credito varchar(20),
    constraint pk_cliente primary key (id_usuario)
) INHERITS (usuario)

create table producto(
    id_producto serial, 
    nombre text not null,
    descripcion text not null,
    precio money not null,
    cantidad integer not null,
    imagen_url url varchar(150),
    constraint pk_producto primary key (id_producto)
)

create table recibo(
    id_recibo serial,
    id_producto integer unique not null,
    id_usuario integer unique not null,
    fecha_compra date not null,
    constraint pk_recibo primary key (id_recibo)
    constraint fk_cliente foreign key (id_usuario) references usuario(id_usuario)
    constraint fk_producto foreign key (id_producto) references producto(id_producto)
)

create table transportista(
    DUI	char(10) unique not null,
    NIT char(17) unique not null,
    vehiculo_asignado text,
    constraint pk_transportista primary key (DUI)
)