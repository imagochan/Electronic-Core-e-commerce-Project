CREATE OR REPLACE FUNCTION usuario_no_en_otra_subclase() RETURNS trigger AS $$
DECLARE
    prueba_cliente RECORD;
    prueba_admin RECORD;
BEGIN
    IF TG_RELNAME = 'cliente' THEN
        SELECT INTO prueba_admin * FROM admin 
        WHERE id_usuario=NEW.id_usuario;

        IF (
            prueba_admin.id_usuario IS NOT NULL
        ) THEN
            RAISE EXCEPTION 'El usuario % ya es un admin', NEW.id_usuario;
        END IF;
    ELSE -- comprobacion de admin
        SELECT INTO prueba_cliente * FROM cliente 
        WHERE id_usuario=NEW.id_usuario

        IF (
            prueba_cliente.id_usuario IS NOT NULL
        ) THEN
            RAISE EXCEPTION 'El usuario % ya es un cliente', NEW.id_usuario;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

create trigger cliente_no_admin BEFORE INSERT OR UPDATE ON cliente FOR EACH ROW EXECUTE PROCEDURE usuario_no_en_otra_subclase();
create trigger admin_no_cliente BEFORE INSERT OR UPDATE ON admin FOR EACH ROW EXECUTE PROCEDURE usuario_no_en_otra_subclase();