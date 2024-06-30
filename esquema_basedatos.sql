--CREATE DATABASE tallerdb;


USE tallerdb;


-- Crear la tabla SUCURSALES sin la restricci�n de clave for�nea
CREATE TABLE SUCURSALES (
    RIFSuc VARCHAR(12) NOT NULL PRIMARY KEY,
    NombreSuc VARCHAR(50) NOT NULL,
    Ciudad VARCHAR(70) NOT NULL,
    Encargado VARCHAR(8),
    FechaInEnc DATE
);

-- Crear la tabla TRABAJADORES con la restricci�n de clave for�nea
CREATE TABLE TRABAJADORES (
    Cedula VARCHAR(8) NOT NULL PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    Direccion VARCHAR(100) NOT NULL,
    Salario DECIMAL(10, 2) NOT NULL CHECK (Salario > 0),
    Telefono VARCHAR(12),
    RIFSuc VARCHAR(12),
    FOREIGN KEY (RIFSuc) REFERENCES SUCURSALES(RIFSuc) ON UPDATE NO ACTION ON DELETE NO ACTION
);

-- Agregar la restricci�n de clave for�nea a la tabla SUCURSALES
ALTER TABLE SUCURSALES
ADD FOREIGN KEY (Encargado) REFERENCES TRABAJADORES(Cedula) ON UPDATE NO ACTION ON DELETE NO ACTION;


-- Tabla RESPONSABLES
CREATE TABLE RESPONSABLES (
    CIResponsable VARCHAR(8) NOT NULL PRIMARY KEY,
    NombreResponsable VARCHAR(30) NOT NULL
);

-- Tabla FACTURAS_PROVEEDORES
CREATE TABLE FACTURAS_PROVEEDORES (
    NumFact INT NOT NULL PRIMARY KEY,
    Monto DECIMAL(10, 2) NOT NULL CHECK (Monto > 0),
    Fecha DATE NOT NULL
);

-- Tabla MARCAS_VEHICULOS
CREATE TABLE MARCAS_VEHICULOS (
    CodMarcaVeh INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    Nombre VARCHAR(50) NOT NULL
);

-- Tabla TIPOS_VEHICULOS
CREATE TABLE TIPOS_VEHICULOS (
    CodTipoV INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    Descripcion VARCHAR(50) NOT NULL
);

-- Tabla LINEAS
CREATE TABLE LINEAS (
    CodLineas INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    Descripcion VARCHAR(50) NOT NULL
);

-- Tabla PROVEEDORES
CREATE TABLE PROVEEDORES (
    Rif VARCHAR(12) NOT NULL PRIMARY KEY,
    RazonSocial VARCHAR(25) NOT NULL,
    Direccion VARCHAR(50) NOT NULL,
    TelefonoL VARCHAR(10) NOT NULL,
    TelefonoC VARCHAR(11) NOT NULL,
    PersonaCont VARCHAR(25) NOT NULL
);

-- Tabla MODELOS_VEHICULOS
CREATE TABLE MODELOS_VEHICULOS (
    CodMarcaV INT NOT NULL,
    CodConsec INT NOT NULL IDENTITY(1,1),
    Descripcion VARCHAR(50) NOT NULL,
    CantPuestos INT NOT NULL,
    Peso DECIMAL(10, 2) NOT NULL,
    TipoAceite VARCHAR(25) NOT NULL,
    AceiteCaja VARCHAR(25) NOT NULL,
    TipoRefri VARCHAR(25) NOT NULL,
    Octanaje INT NOT NULL CHECK (Octanaje IN (91, 95)),
    TipoMant VARCHAR(30) NOT NULL,
    TiempoUsoMant INT NOT NULL,
    KilometrajeMant DECIMAL(10, 2) NOT NULL,
    CodTipoV INT NOT NULL,
    PRIMARY KEY (CodMarcaV, CodConsec),
    FOREIGN KEY (CodTipoV) REFERENCES TIPOS_VEHICULOS(CodTipoV) ON UPDATE CASCADE ON DELETE NO ACTION,
    FOREIGN KEY (CodMarcaV) REFERENCES MARCAS_VEHICULOS(CodMarcaVeh) ON UPDATE CASCADE ON DELETE NO ACTION
);

-- Tabla VEHICULOS
CREATE TABLE VEHICULOS (
    CodVehiculo INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    Placa VARCHAR(6) NOT NULL,
    TipoAceite VARCHAR(15) NOT NULL,
    FechaAdq DATETIME NOT NULL,
    CiResp VARCHAR(8) NOT NULL,
    CodMarca INT NOT NULL,
    NumModelo INT NOT NULL,
    FOREIGN KEY (CiResp) REFERENCES RESPONSABLES(CIResponsable) ON UPDATE CASCADE ON DELETE NO ACTION,
    FOREIGN KEY (CodMarca, NumModelo) REFERENCES MODELOS_VEHICULOS(CodMarcaV, CodConsec) ON UPDATE CASCADE ON DELETE NO ACTION
);

-- Tabla FACTURAS_SERVICIOS
CREATE TABLE FACTURAS_SERVICIOS (
    CodF INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    Fecha DATE NOT NULL,
    Monto DECIMAL(10, 2) NOT NULL CHECK (Monto > 0),
    Descuento DECIMAL(14) NOT NULL
);


-- Tabla AUTORIZADOS
CREATE TABLE AUTORIZADOS (
    CIAutorizado VARCHAR(8) NOT NULL PRIMARY KEY,
    NombreAutorizado VARCHAR(30) NOT NULL
);
-- Tabla ORDENES_SERVICIOS
CREATE TABLE ORDENES_SERVICIOS (
    Nro INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    Nombre VARCHAR(50) NOT NULL,
    FechaHoraE DATE NOT NULL,
    FechaHoraSEstimada DATE NOT NULL,
    CIAutorizado VARCHAR(8),
    NumFacturaServ INT NOT NULL,
    CodVehiculo INT NOT NULL,
    CIEmpleado VARCHAR(8) NOT NULL,
    FOREIGN KEY (CIAutorizado) REFERENCES AUTORIZADOS(CIAutorizado) ON UPDATE CASCADE ON DELETE NO ACTION,
    FOREIGN KEY (NumFacturaServ) REFERENCES FACTURAS_SERVICIOS(CodF) ON UPDATE CASCADE ON DELETE NO ACTION,
    FOREIGN KEY (CodVehiculo) REFERENCES VEHICULOS(CodVehiculo) ON UPDATE CASCADE ON DELETE NO ACTION,
    FOREIGN KEY (CIEmpleado) REFERENCES TRABAJADORES(Cedula) ON UPDATE CASCADE ON DELETE NO ACTION
);

-- Tabla SERVICIOS
CREATE TABLE SERVICIOS (
    CodigoServ INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    Descripcion VARCHAR(100) NOT NULL,
    CI_Coord VARCHAR(8) NOT NULL,
    FOREIGN KEY (CI_Coord) REFERENCES TRABAJADORES(Cedula) ON UPDATE CASCADE ON DELETE NO ACTION
);

-- Tabla PRODUCTOS
CREATE TABLE PRODUCTOS (
    CodProd INT NOT NULL PRIMARY KEY,
    NombreP VARCHAR(50) NOT NULL,
    Descripcion VARCHAR(100) NOT NULL,
    Precio DECIMAL(10, 2) NOT NULL CHECK (Precio > 0),
    Ecologico CHAR(1) NOT NULL CHECK (Ecologico IN ('S', 'N')),
    Existencia INT NOT NULL CHECK (Existencia >= 0),
    Fabricante VARCHAR(50) NOT NULL,
    Maximo INT NOT NULL CHECK (Maximo > 0),
    Minimo INT NOT NULL CHECK (Minimo > 0),
	CHECK (Minimo<=Maximo),
    TipoPro VARCHAR(10) NOT NULL CHECK (TipoPro IN ('Servicio', 'Tienda')),
    CodLinea INT NOT NULL,
    FOREIGN KEY (CodLinea) REFERENCES LINEAS(CodLineas) ON UPDATE CASCADE ON DELETE NO ACTION
);

-- Tabla PRODUCTOS_SERVICIOS
CREATE TABLE PRODUCTOS_SERVICIOS (
    CodProd INT NOT NULL PRIMARY KEY,
    FOREIGN KEY (CodProd) REFERENCES PRODUCTOS(CodProd) ON UPDATE CASCADE ON DELETE NO ACTION
);

-- Tabla PRODUCTOS_TIENDA
CREATE TABLE PRODUCTOS_TIENDA (
    CodProd INT NOT NULL PRIMARY KEY,
    FOREIGN KEY (CodProd) REFERENCES PRODUCTOS(CodProd) ON UPDATE CASCADE ON DELETE NO ACTION
);

-- Tabla REQUISICIONES_COMPRA
CREATE TABLE REQUISICIONES_COMPRA (
    IdReq INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    Fecha DATE NOT NULL,
    CantProd INT NOT NULL CHECK (CantProd > 0),
    CodProd INT NOT NULL,
    FOREIGN KEY (CodProd) REFERENCES PRODUCTOS(CodProd) ON UPDATE CASCADE ON DELETE NO ACTION
);



-- Tabla PAGOS
CREATE TABLE PAGOS (
    CodPago INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    Fecha DATE NOT NULL,
    Monto DECIMAL(10, 2) NOT NULL CHECK (Monto > 0),
    TipoPago CHAR(1) NOT NULL CHECK (TipoPago IN ('E', 'P', 'T')), -- E: Efectivo, P: Pago Movil, T: Tarjeta
    TipoEfectivo CHAR(1) CHECK (TipoEfectivo IN ('D', 'B')), -- D: Divisa, B: Bolivares
    Referencia INT,
    NroTelf VARCHAR(11),
    TipoTarjeta VARCHAR(7) CHECK (TipoTarjeta IN ('Debito', 'Credito')),
    Banco VARCHAR(20),
    NumTarjeta VARCHAR(20) CHECK (LEN(NumTarjeta) > 15),
    NumFacturaServicio INT,
    NumR INT,
    FOREIGN KEY (NumFacturaServicio) REFERENCES FACTURAS_SERVICIOS(CodF) ON UPDATE CASCADE ON DELETE NO ACTION,
    FOREIGN KEY (NumR) REFERENCES RESERVAS(NroR) ON UPDATE CASCADE ON DELETE NO ACTION
);

-- Tabla RESERVAS
CREATE TABLE RESERVAS (
    NroR INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    FechaR DATETIME NOT NULL,
    Abono DECIMAL(10, 2) NOT NULL CHECK (Abono > 0),
    CodVehiculo INT NOT NULL,
    FOREIGN KEY (CodVehiculo) REFERENCES VEHICULOS(CodVehiculo) ON UPDATE CASCADE ON DELETE NO ACTION
);




-- Tabla ORDENES_COMPRAS
CREATE TABLE ORDENES_COMPRAS (
    CodOrden INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    NumFactProv INT NOT NULL,
    RIFProv VARCHAR(12) NOT NULL,
    CodRequiCom INT NOT NULL,
    Precio DECIMAL(10, 2) NOT NULL CHECK (Precio > 0),
    CantidadProd INT NOT NULL CHECK (CantidadProd > 0),
    RIFSuc VARCHAR(12) NOT NULL,
    FOREIGN KEY (NumFactProv) REFERENCES FACTURAS_PROVEEDORES(NumFact) ON UPDATE CASCADE ON DELETE NO ACTION,
    FOREIGN KEY (RIFProv) REFERENCES PROVEEDORES(Rif) ON UPDATE CASCADE ON DELETE NO ACTION,
    FOREIGN KEY (CodRequiCom) REFERENCES REQUISICIONES_COMPRA(IdReq) ON UPDATE CASCADE ON DELETE NO ACTION,
    FOREIGN KEY (RIFSuc) REFERENCES SUCURSALES(RIFSuc) ON UPDATE CASCADE ON DELETE NO ACTION
);






-- Tabla FACTURAS_TIENDAS
CREATE TABLE FACTURAS_TIENDAS (
    CodF INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
    Fecha DATE NOT NULL,
    Monto DECIMAL(10, 2) NOT NULL CHECK (Monto > 0),
    Descuento DECIMAL(4,4) NOT NULL,
    CodPago INT NOT NULL,
    FOREIGN KEY (CodPago) REFERENCES PAGOS(CodPago) ON UPDATE CASCADE ON DELETE NO ACTION
);


-- Tabla DESCUENTOS
CREATE TABLE DESCUENTOS (
    RIFSuc VARCHAR(12) NOT NULL,
    NroDesc INT NOT NULL IDENTITY(1,1),
    LimiteInfe INT NOT NULL CHECK (LimiteInfe > 0),
    LimiteSup INT NOT NULL,
    PorcentajeDesc DECIMAL(4,4) NOT NULL CHECK (PorcentajeDesc > 0),
    UNIQUE(LimiteInfe,LimiteSup),
	CHECK (LimiteSup >= LimiteInfe),
    PRIMARY KEY (RIFSuc, NroDesc),
    FOREIGN KEY (RIFSuc) REFERENCES SUCURSALES(RIFSuc) ON UPDATE CASCADE ON DELETE NO ACTION
);


-- Tabla INVENTARIOS
CREATE TABLE INVENTARIOS (
    RIFSuc VARCHAR(12) NOT NULL,
    NumInventario INT NOT NULL IDENTITY(1,1),
    FechaRealiz DATE NOT NULL,
    CodProducto INT NOT NULL,
    FechaHoraAjust DATETIME NOT NULL,
    TipoAjuste VARCHAR(25) NOT NULL,
    ExistAjustada INT NOT NULL,
    ExistReal INT NOT NULL,
    ExistTeorica INT NOT NULL,
    PRIMARY KEY (RIFSuc, NumInventario),
    FOREIGN KEY (RIFSuc) REFERENCES SUCURSALES(RIFSuc) ON UPDATE CASCADE ON DELETE NO ACTION,
    FOREIGN KEY (CodProducto) REFERENCES PRODUCTOS(CodProd) ON UPDATE CASCADE ON DELETE NO ACTION
);

-- Tabla ACTIVIDADES
CREATE TABLE ACTIVIDADES (
    CodServicio INT NOT NULL,
    NroActividad INT NOT NULL IDENTITY(1,1),
    Descripcion VARCHAR(50) NOT NULL,
    Monto DECIMAL(10, 2) NOT NULL,
    AntelacionReserva INT NOT NULL,
	rifSucursal VARCHAR(12),
    capacidad INT,
    PRIMARY KEY (CodServicio, NroActividad),
    FOREIGN KEY (CodServicio) REFERENCES SERVICIOS(CodigoServ) ON UPDATE CASCADE ON DELETE NO ACTION,
	FOREIGN KEY (rifSucursal) REFERENCES SUCURSALES(RIFSuc) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Tabla DISTRIBUYEN
CREATE TABLE DISTRIBUYEN (
    RIFProveedor VARCHAR(12) NOT NULL,
    CodLinea INT NOT NULL,
    PRIMARY KEY (RIFProveedor, CodLinea),
    FOREIGN KEY (RIFProveedor) REFERENCES PROVEEDORES(Rif) ON UPDATE CASCADE ON DELETE NO ACTION,
    FOREIGN KEY (CodLinea) REFERENCES LINEAS(CodLineas) ON UPDATE CASCADE ON DELETE NO ACTION
);

-- Tabla REGISTRAN_FACT_PROD
CREATE TABLE REGISTRAN_FACT_PROD (
    NumFactTienda INT NOT NULL,
    CodProdTienda INT NOT NULL,
	CantComprada INT NOT NULL,
    PRIMARY KEY (NumFactTienda, CodProdTienda),
    FOREIGN KEY (NumFactTienda) REFERENCES FACTURAS_TIENDAS(CodF) ON UPDATE CASCADE ON DELETE NO ACTION,
    FOREIGN KEY (CodProdTienda) REFERENCES PRODUCTOS_TIENDA(CodProd) ON UPDATE CASCADE ON DELETE NO ACTION
);

-- Tabla RECIBEN_SUC_TIPOV
CREATE TABLE RECIBEN_SUC_TIPOV (
    RIFSucursal VARCHAR(12) NOT NULL,
    CodTipoV INT NOT NULL,
    PRIMARY KEY (RIFSucursal, CodTipoV),
    FOREIGN KEY (RIFSucursal) REFERENCES SUCURSALES(RIFSuc) ON UPDATE CASCADE ON DELETE NO ACTION,
    FOREIGN KEY (CodTipoV) REFERENCES TIPOS_VEHICULOS(CodTipoV) ON UPDATE CASCADE ON DELETE NO ACTION
);

-- Tabla APARTAN_RES_ACT
CREATE TABLE APARTAN_RES_ACT (
    NroReserva INT NOT NULL,
    CodServicio INT NOT NULL,
    NroActividad INT NOT NULL,
    FechaEjecucion DATETIME NOT NULL,
    PRIMARY KEY (NroReserva, CodServicio, NroActividad),
    FOREIGN KEY (NroReserva) REFERENCES RESERVAS(NroR) ON UPDATE CASCADE ON DELETE NO ACTION,
    FOREIGN KEY (CodServicio, NroActividad) REFERENCES ACTIVIDADES(CodServicio, NroActividad) ON UPDATE CASCADE ON DELETE NO ACTION
);


-- Tabla TELEFONOS_DUENOS
CREATE TABLE TELEFONOS_DUENOS (
    CodVehiculo INT NOT NULL,
    NroTelefono VARCHAR(11) NOT NULL,
    PRIMARY KEY (CodVehiculo, NroTelefono),
    FOREIGN KEY (CodVehiculo) REFERENCES VEHICULOS(CodVehiculo) ON UPDATE CASCADE ON DELETE NO ACTION
);

-- Tabla MANTENIMIENTO_VEHICULO
CREATE TABLE MANTENIMIENTO_VEHICULO (
    CodVehiculo INT NOT NULL,
    FechaMant DATE NOT NULL,
    Descripcion VARCHAR(50) NOT NULL,
    PRIMARY KEY (CodVehiculo, FechaMant, Descripcion),
    FOREIGN KEY (CodVehiculo) REFERENCES VEHICULOS(CodVehiculo) ON UPDATE CASCADE ON DELETE NO ACTION
);

-- Tabla CONTRATAN_ACT_ORDENS_PROD_SERV
CREATE TABLE CONTRATAN_ACT_ORDENS_PROD_SERV (
    CodServicio INT NOT NULL,
    NroActividad INT NOT NULL,
    NroOrenServ INT NOT NULL,
    CodProductoServ INT NOT NULL,
    CantProd INT NOT NULL,
    Precio DECIMAL(10, 2) NOT NULL,
    CantHoras INT NOT NULL,
    PRIMARY KEY (CodServicio, NroActividad, NroOrenServ, CodProductoServ),
    FOREIGN KEY (CodServicio, NroActividad) REFERENCES ACTIVIDADES(CodServicio, NroActividad) ON UPDATE NO ACTION ON DELETE NO ACTION,
    FOREIGN KEY (NroOrenServ) REFERENCES ORDENES_SERVICIOS(Nro) ON UPDATE NO ACTION ON DELETE NO ACTION,
    FOREIGN KEY (CodProductoServ) REFERENCES PRODUCTOS_SERVICIOS(CodProd) ON UPDATE NO ACTION ON DELETE NO ACTION
);



-- ********************************* TRIGGERS *******************************

--***************************Karim *********************************
--**** Trigger para validar la inserción en la tabla TELEFONOS_DUENOS ****
GO
CREATE TRIGGER trg_MaxDosTelefonos_Ins
ON TELEFONOS_DUENOS
AFTER INSERT
AS
BEGIN
    -- Contar la cantidad de teléfonos existentes para cada vehículo afectado por la inserción
    IF EXISTS (
        SELECT CodVehiculo
        FROM TELEFONOS_DUENOS
        WHERE CodVehiculo IN (SELECT CodVehiculo FROM inserted)
        GROUP BY CodVehiculo
        HAVING COUNT(NroTelefono) > 2
    )
    BEGIN
        -- Si ya hay 2 teléfonos, no permitir la inserción
        RAISERROR ('No se puede insertar más de dos teléfonos para un vehículo.', 16, 1);
        ROLLBACK TRANSACTION;
    END
END;
GO

--**** Trigger para validar la actualización en la tabla TELEFONOS_DUENOS ****
GO
CREATE TRIGGER trg_MaxDosTelefonos_Upd
ON TELEFONOS_DUENOS
AFTER UPDATE
AS
BEGIN
    -- Contar la cantidad de teléfonos existentes para cada vehículo afectado por la actualización
    IF EXISTS (
        SELECT CodVehiculo
        FROM TELEFONOS_DUENOS
        WHERE CodVehiculo IN (SELECT CodVehiculo FROM inserted)
        GROUP BY CodVehiculo
        HAVING COUNT(NroTelefono) > 2
    )
    BEGIN
        -- Si ya hay 2 teléfonos, no permitir la actualización
        RAISERROR ('No se puede actualizar a más de dos teléfonos para un vehículo.', 16, 1);
        ROLLBACK TRANSACTION;
    END
END;
GO



--**** Trigger para validar el cumplimiento de la jerarquia exclusiva en la tabla PAGOS al insertar ****
GO
CREATE TRIGGER trg_JerarquiaExclusiva_Ins
ON PAGOS
AFTER INSERT
AS
BEGIN
    -- Validar según TipoPago
    IF EXISTS (
        SELECT 1
        FROM inserted
        WHERE (TipoPago = 'E' AND (TipoEfectivo IS NULL OR Referencia IS NOT NULL OR NroTelf IS NOT NULL OR TipoTarjeta IS NOT NULL OR Banco IS NOT NULL OR NumTarjeta IS NOT NULL))
        OR (TipoPago = 'P' AND (Referencia IS NULL OR NroTelf IS NULL))
        OR (TipoPago = 'T' AND (TipoTarjeta IS NULL OR Banco IS NULL OR NumTarjeta IS NULL))
    )
    BEGIN
        RAISERROR ('Validación fallida para la tabla PAGOS.', 16, 1);
        ROLLBACK TRANSACTION;
    END
END;
GO

--**** Trigger para validar el cumplimiento de la jerarquia exclusiva en la tabla PAGOS al actualizar ****
GO
CREATE TRIGGER trg_JerarquiaExclusiva_Upd
ON PAGOS
AFTER UPDATE
AS
BEGIN
    -- Validar según TipoPago
    IF EXISTS (
        SELECT 1
        FROM inserted
        WHERE (TipoPago = 'E' AND (TipoEfectivo IS NULL OR Referencia IS NOT NULL OR NroTelf IS NOT NULL OR TipoTarjeta IS NOT NULL OR Banco IS NOT NULL OR NumTarjeta IS NOT NULL))
        OR (TipoPago = 'P' AND (Referencia IS NULL OR NroTelf IS NULL))
        OR (TipoPago = 'T' AND (TipoTarjeta IS NULL OR Banco IS NULL OR NumTarjeta IS NULL))
    )
    BEGIN
        RAISERROR ('Validación fallida para la tabla PAGOS.', 16, 1);
        ROLLBACK TRANSACTION;
    END
END;
GO

-- **** La cantidad teorica disminuye cuando hacemos un consumo/venta ****
-- Trigger para disminuir la existencia de productos después de insertar en FACTURAS_SERVICIOS
GO
CREATE TRIGGER trg_UpdateProductExistence_AfterInsert_FACTURAS_SERVICIOS
ON FACTURAS_SERVICIOS
AFTER INSERT
AS
BEGIN
    -- Actualizar la existencia de productos
    UPDATE p
    SET p.Existencia = p.Existencia - ca.CantProd
    FROM PRODUCTOS p
    JOIN PRODUCTOS_SERVICIOS ps ON p.CodProd = ps.CodProd
    JOIN CONTRATAN_ACT_ORDENS_PROD_SERV ca ON ps.CodProd = ca.CodProductoServ
    JOIN ORDENES_SERVICIOS os ON ca.NroOrenServ = os.Nro
    JOIN inserted i ON os.NumFacturaServ = i.CodF
    WHERE p.Existencia - ca.CantProd >= 0 -- Asegurarse de que la existencia no sea negativa
END;
GO



-- Trigger para disminuir la existencia de productos después de insertar en FACTURAS_TIENDAS
GO
CREATE TRIGGER trg_UpdateProductExistence_AfterInsert_FACTURAS_TIENDAS
ON FACTURAS_TIENDAS
AFTER INSERT
AS
BEGIN
    -- Actualizar la existencia de productos
    UPDATE p
    SET p.Existencia = p.Existencia - rf.CantComprada
    FROM PRODUCTOS p
    JOIN PRODUCTOS_TIENDA pt ON p.CodProd = pt.CodProd
    JOIN REGISTRAN_FACT_PROD rf ON pt.CodProd = rf.CodProdTienda
    JOIN inserted i ON rf.NumFactTienda = i.CodF
    WHERE p.Existencia - rf.CantComprada >= 0 -- Asegurarse de que la existencia no sea negativa
END;
GO


-- **** Jerarquia exclusiva de las tablas Productos ****
-- Trigger para asegurar la jerarquía exclusiva en PRODUCTOS_SERVICIOS
GO
CREATE TRIGGER trg_VerifyExclusiveHierarchy_AfterInsert_PRODUCTOS_SERVICIOS
ON PRODUCTOS_SERVICIOS
AFTER INSERT
AS
BEGIN
    IF EXISTS (SELECT 1 FROM PRODUCTOS_TIENDA WHERE CodProd IN (SELECT CodProd FROM inserted))
    BEGIN
        RAISERROR ('El producto ya existe en PRODUCTOS_TIENDA. La jerarquía exclusiva no se cumple.', 16, 1)
        ROLLBACK TRANSACTION
    END
END;
GO

-- Trigger para asegurar la jerarquía exclusiva en PRODUCTOS_TIENDA
GO
CREATE TRIGGER trg_VerifyExclusiveHierarchy_AfterInsert_PRODUCTOS_TIENDA
ON PRODUCTOS_TIENDA
AFTER INSERT
AS
BEGIN
    IF EXISTS (SELECT 1 FROM PRODUCTOS_SERVICIOS WHERE CodProd IN (SELECT CodProd FROM inserted))
    BEGIN
        RAISERROR ('El producto ya existe en PRODUCTOS_SERVICIOS. La jerarquía exclusiva no se cumple.', 16, 1)
        ROLLBACK TRANSACTION
    END
END;
GO





--***************************SEBASTIAN *********************************
--Trigger para generar una requisicion de compra al final del dia 
GO
CREATE TRIGGER generar_requisicion_compra
ON PRODUCTOS
AFTER UPDATE
AS
BEGIN
    DECLARE @currentDate DATE = CONVERT(DATE, GETDATE());
    DECLARE @CodProd INT;
    DECLARE @Existencia INT;
    DECLARE @Minimo INT;
    DECLARE @CantProd INT;

    -- Cursor para recorrer los productos actualizados
    DECLARE product_cursor CURSOR FOR
    SELECT CodProd, Existencia, Minimo
    FROM INSERTED
    WHERE Existencia <= Minimo;

    OPEN product_cursor;

    FETCH NEXT FROM product_cursor INTO @CodProd, @Existencia, @Minimo;

    WHILE @@FETCH_STATUS = 0
    BEGIN
        -- Calcular la cantidad necesaria para alcanzar el nivel deseado (25% por encima del mínimo)
        SET @CantProd = CEILING((@Minimo * 1.25) - @Existencia);

        -- Insertar una nueva requisición de compra
        IF @CantProd > 0
        BEGIN
            INSERT INTO REQUISICIONES_COMPRA (Fecha, CantProd, CodProd)
            VALUES (@currentDate, @CantProd, @CodProd);
        END

        FETCH NEXT FROM product_cursor INTO @CodProd, @Existencia, @Minimo;
    END;

    CLOSE product_cursor;
    DEALLOCATE product_cursor;
END;
GO
--Trigger para verificar la disponibilidad y calcular el abono de una reserva
GO
CREATE TRIGGER trg_VerificarDisponibilidadYCalcularAbono
ON RESERVAS
AFTER INSERT
AS
BEGIN
    DECLARE @NroR INT;
    DECLARE @CodVehiculo INT;
    DECLARE @Abono DECIMAL(10, 2);
    DECLARE @CodServicio INT;
    DECLARE @NroActividad INT;
    DECLARE @Monto DECIMAL(10, 2);
    DECLARE @AntelacionReserva INT;

    -- Obtener la información de la reserva recién insertada
    SELECT @NroR = INSERTED.NroR, @CodVehiculo = INSERTED.CodVehiculo, @Abono = INSERTED.Abono
    FROM INSERTED;

    -- Comprobar la disponibilidad del servicio
    SELECT TOP 1 @CodServicio = CodServicio, @NroActividad = NroActividad, @Monto = Monto, @AntelacionReserva = AntelacionReserva
    FROM ACTIVIDADES
    WHERE CodServicio = @CodVehiculo;

    -- Verificar si la reserva cumple con la antelación mínima requerida
    IF DATEDIFF(DAY, GETDATE(), @AntelacionReserva) >= @AntelacionReserva
    BEGIN
        -- Calcular el abono mínimo y máximo permitido
        DECLARE @AbonoMinimo DECIMAL(10, 2);
        DECLARE @AbonoMaximo DECIMAL(10, 2);

        SET @AbonoMinimo = @Monto * 0.20;
        SET @AbonoMaximo = @Monto * 0.50;

        -- Verificar si el abono está dentro del rango permitido
        IF @Abono < @AbonoMinimo OR @Abono > @AbonoMaximo
        BEGIN
            RAISERROR('El abono debe estar entre el 20%% y el 50%% del monto del servicio.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Insertar la relación entre la reserva y la actividad
        INSERT INTO APARTAN_RES_ACT (NroReserva, CodServicio, NroActividad, FechaEjecucion)
        VALUES (@NroR, @CodServicio, @NroActividad, DATEADD(DAY, @AntelacionReserva, GETDATE()));
    END
    ELSE
    BEGIN
        RAISERROR('No hay disponibilidad para la reserva con la antelación requerida.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END
END;
GO
--Trigger para aumerntar la existencia de un producto en la tabla PRODUCTOS
GO
CREATE TRIGGER trg_AumentarExistencia
ON ORDENES_COMPRAS
AFTER INSERT
AS
BEGIN
    DECLARE @CodProd INT;
    DECLARE @CantidadProd INT;

    -- Obtener la información de la orden de compra recién insertada
    SELECT @CodProd = CodRequiCom, @CantidadProd = CantidadProd
    FROM INSERTED;

    -- Actualizar la existencia del producto en la tabla PRODUCTOS
    UPDATE PRODUCTOS
    SET Existencia = Existencia + @CantidadProd
    WHERE CodProd = @CodProd;
END;

-- Trigger para verificar la anticipación de una reserva
GO
CREATE TRIGGER trg_VerificarAnticipacionReserva
ON RESERVAS
AFTER INSERT
AS
BEGIN
    DECLARE @NroR INT;
    DECLARE @FechaR DATE;
    DECLARE @CodVehiculo INT;
    DECLARE @AntelacionReserva INT;
    DECLARE @CodServicio INT;

    -- Obtener la información de la reserva recién insertada
    SELECT @NroR = INSERTED.NroR, @FechaR = INSERTED.FechaR, @CodVehiculo = INSERTED.CodVehiculo
    FROM INSERTED;

    -- Obtener la información del servicio que requiere reserva
    SELECT @CodServicio = CodServicio, @AntelacionReserva = AntelacionReserva
    FROM ACTIVIDADES
    WHERE CodServicio = @CodVehiculo; -- Supongamos que CodVehiculo se refiere a un servicio en ACTIVIDADES

    -- Verificar la anticipación mínima requerida
    IF DATEDIFF(DAY, GETDATE(), @FechaR) < @AntelacionReserva
    BEGIN
        RAISERROR('La reserva debe realizarse con una anticipación mínima de %d días para garantizar el cupo.', 16, 1, @AntelacionReserva);
        ROLLBACK TRANSACTION;
        RETURN;
    END
END;
GO


GO
CREATE TRIGGER trg_AjustarCantidadOrden
ON ORDENES_COMPRAS
AFTER INSERT
AS
BEGIN
    DECLARE @CodProd INT;
    DECLARE @CantidadProd INT;
    DECLARE @Minimo INT;
    DECLARE @Existencia INT;
    DECLARE @CantidadNecesaria INT;

    -- Obtener la información de la orden de compra recién insertada
    SELECT @CodProd = CodRequiCom, @CantidadProd = CantidadProd
    FROM INSERTED;

    -- Obtener la información del producto
    SELECT @Minimo = Minimo, @Existencia = Existencia
    FROM PRODUCTOS
    WHERE CodProd = @CodProd;

    -- Calcular la cantidad necesaria para que el inventario quede un 25% por encima del nivel mínimo
    SET @CantidadNecesaria = (@Minimo * 1.25) - @Existencia;

    -- Verificar si la cantidad actual es suficiente
    IF @CantidadProd < @CantidadNecesaria
    BEGIN
        -- Actualizar la cantidad pedida en la orden de compra
        UPDATE ORDENES_COMPRAS
        SET CantidadProd = @CantidadNecesaria
        WHERE CodOrden = (SELECT CodOrden FROM INSERTED);
    END
END;
GO

