CREATE OR REPLACE FUNCTION usuario_no_en_otra_subclase() RETURNS trigger AS $$
DECLARE
    prueba_cliente RECORD;
    prueba_admin RECORD;
BEGIN
    IF TG_RELNAME = 'cliente' THEN
        SELECT INTO prueba_admin * FROM admin 
        WHERE correo_institucional=NEW.correo_institucional;

        IF (
            prueba_admin.correo_institucional IS NOT NULL
        ) THEN
            RAISE EXCEPTION 'El usuario con correo % ya es un admin', NEW.correo_institucional;
        END IF;
    ELSE -- comprobacion de admin
        SELECT INTO prueba_cliente * FROM cliente 
        WHERE email=NEW.email

        IF (
            prueba_cliente.email IS NOT NULL
        ) THEN
            RAISE EXCEPTION 'El usuario con correo % ya es un cliente', NEW.email;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

create trigger cliente_no_admin BEFORE INSERT OR UPDATE ON cliente FOR EACH ROW EXECUTE PROCEDURE usuario_no_en_otra_subclase();
create trigger admin_no_cliente BEFORE INSERT OR UPDATE ON admin FOR EACH ROW EXECUTE PROCEDURE usuario_no_en_otra_subclase();