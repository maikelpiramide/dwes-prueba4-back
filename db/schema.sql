CREATE TABLE IF NOT EXISTS public.usuarios
(
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    password character varying(100) COLLATE pg_catalog."default" NOT NULL,
    saldo numeric(4,2) DEFAULT 0,
    CONSTRAINT usuarios_pkey PRIMARY KEY (email)
)

CREATE TABLE IF NOT EXISTS public.conserjes
(
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    password character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT conserjes_pkey PRIMARY KEY (email)
)

CREATE TABLE IF NOT EXISTS public.transacciones
(
    id serial,
    concepto character varying(255) COLLATE pg_catalog."default",
    "timestamp" timestamp without time zone,
    importe numeric(4,2),
    usuario character varying(100) COLLATE pg_catalog."default",
    conserje character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT transacciones_pkey PRIMARY KEY (id),
    CONSTRAINT transacciones_conserje_fkey FOREIGN KEY (conserje)
        REFERENCES public.conserjes (email) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT transacciones_usuario_fkey FOREIGN KEY (usuario)
        REFERENCES public.usuarios (email) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)