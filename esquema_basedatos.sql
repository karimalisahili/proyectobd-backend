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
    FOREIGN KEY (RIFSuc) REFERENCES SUCURSALES(RIFSuc) ON UPDATE NO ACTION ON DELETE CASCADE
);

-- Agregar la restricci�n de clave for�nea a la tabla SUCURSALES
ALTER TABLE SUCURSALES
ADD FOREIGN KEY (Encargado) REFERENCES TRABAJADORES(Cedula) ON UPDATE NO ACTION ON DELETE NO ACTION;

-- Tabla RESPONSABLES
CREATE TABLE RESPONSABLES (
    CIResponsable VARCHAR(8) NOT NULL PRIMARY KEY,
    NombreResponsable VARCHAR(30) NOT NULL
);


-- Tabla MARCAS_VEHICULOS
CREATE TABLE MARCAS_VEHICULOS (
    CodMarcaVeh INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    Nombre VARCHAR(50) NOT NULL UNIQUE
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

-- Tabla AUTORIZADOS
CREATE TABLE AUTORIZADOS (
    CIAutorizado VARCHAR(8) NOT NULL PRIMARY KEY,
    NombreAutorizado VARCHAR(30) NOT NULL
);

-- Tabla ORDENES_SERVICIOS
CREATE TABLE ORDENES_SERVICIOS (
    Nro INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    FechaHoraE DATE NOT NULL,
    FechaHoraSEstimada DATE NOT NULL,
    CIAutorizado VARCHAR(8),
    CodVehiculo INT NOT NULL,
    CIEmpleado VARCHAR(8) NOT NULL,
    FOREIGN KEY (CIAutorizado) REFERENCES AUTORIZADOS(CIAutorizado) ON UPDATE CASCADE ON DELETE NO ACTION,
    FOREIGN KEY (CodVehiculo) REFERENCES VEHICULOS(CodVehiculo) ON UPDATE CASCADE ON DELETE NO ACTION,
    FOREIGN KEY (CIEmpleado) REFERENCES TRABAJADORES(Cedula) ON UPDATE CASCADE ON DELETE NO ACTION
);

-- Tabla FACTURAS_SERVICIOS
CREATE TABLE FACTURAS_SERVICIOS (
    CodF INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	CodOrd INT NOT NULL UNIQUE,
	FOREIGN KEY (CodOrd) REFERENCES ORDENES_SERVICIOS(Nro) ON UPDATE CASCADE ON DELETE NO ACTION,
    Fecha DATE NOT NULL,
    Monto DECIMAL(10, 2) NOT NULL CHECK (Monto > 0),
    Descuento DECIMAL(10,2) NOT NULL
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
    CodProd INT NOT NULL,
    NombreP VARCHAR(50) NOT NULL,
    Descripcion VARCHAR(100) NOT NULL,
    Precio DECIMAL(10, 2) NOT NULL CHECK (Precio > 0),
    Ecologico CHAR(1) NOT NULL CHECK (Ecologico IN ('S', 'N')),
    Fabricante VARCHAR(50) NOT NULL,
    Maximo INT NOT NULL CHECK (Maximo > 0),
    Minimo INT NOT NULL CHECK (Minimo > 0),
    CHECK (Minimo <= Maximo),
    TipoPro VARCHAR(10) NOT NULL CHECK (TipoPro IN ('Servicio', 'Tienda')),
    CodLinea INT NOT NULL,
    PRIMARY KEY (CodProd),
    FOREIGN KEY (CodLinea) REFERENCES LINEAS(CodLineas) ON UPDATE CASCADE ON DELETE NO ACTION
);

-- Tabla PRODUCTOS_SERVICIOS
CREATE TABLE PRODUCTOS_SERVICIOS (
    CodProd INT NOT NULL,
    PRIMARY KEY (CodProd),
    FOREIGN KEY (CodProd) REFERENCES PRODUCTOS(CodProd) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Tabla PRODUCTOS_TIENDA
CREATE TABLE PRODUCTOS_TIENDA (
    CodProd INT NOT NULL,
    PRIMARY KEY (CodProd),
    FOREIGN KEY (CodProd) REFERENCES PRODUCTOS(CodProd) ON UPDATE CASCADE ON DELETE CASCADE
);


-- Tabla RESERVAS
CREATE TABLE RESERVAS (
    NroR INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    FechaR DATETIME NOT NULL,
    Abono DECIMAL(10, 2) NOT NULL CHECK (Abono > 0),
    CodVehiculo INT NOT NULL,
    FOREIGN KEY (CodVehiculo) REFERENCES VEHICULOS(CodVehiculo) ON UPDATE CASCADE ON DELETE NO ACTION
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
    FOREIGN KEY (NumR) REFERENCES RESERVAS(NroR) ON UPDATE NO ACTION ON DELETE NO ACTION
);


-- Tabla REQUISICIONES_COMPRA
CREATE TABLE REQUISICIONES_COMPRA (
    RIFSuc VARCHAR(12) NOT NULL,
    IdReq INT IDENTITY(1,1),
    CodProd INT NOT NULL,
    CantProd INT NOT NULL CHECK (CantProd > 0),
    Fecha DATE NOT NULL,
    PRIMARY KEY (IdReq, CodProd, RIFSuc),
    FOREIGN KEY (RIFSuc) REFERENCES SUCURSALES(RIFSuc) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (CodProd) REFERENCES PRODUCTOS(CodProd) ON UPDATE CASCADE ON DELETE NO ACTION
);

-- Tabla ORDENES_COMPRAS ajustada para incluir CodProd
CREATE TABLE ORDENES_COMPRAS (
    RIFSuc VARCHAR(12) NOT NULL,
    CodOrden INT NOT NULL IDENTITY(1,1),
    CodRequiCom INT NOT NULL,
    CodProd INT NOT NULL, -- Agregado para formar parte de la llave primaria compuesta
    RIFProv VARCHAR(12) NOT NULL,
    Precio DECIMAL(10, 2) NOT NULL CHECK (Precio > 0),
    PRIMARY KEY(RIFSuc,CodOrden, CodRequiCom, CodProd),
    FOREIGN KEY (CodRequiCom, CodProd, RIFSuc) REFERENCES REQUISICIONES_COMPRA(IdReq, CodProd,RIFSuc) ON UPDATE NO ACTION ON DELETE NO ACTION,
    FOREIGN KEY (RIFProv) REFERENCES PROVEEDORES(Rif) ON UPDATE NO ACTION ON DELETE NO ACTION,
);


-- Tabla FACTURAS_PROVEEDORES ajustada para incluir todos los componentes de la llave primaria compuestaa
CREATE TABLE FACTURAS_PROVEEDORES (
    NumFact INT NOT NULL PRIMARY KEY,
    Monto DECIMAL(10, 2) NOT NULL CHECK (Monto > 0),
    Fecha DATE NOT NULL,
    RIFSuc VARCHAR(12) NOT NULL,
    CodOrden INT NOT NULL,
    CodRequiCom INT NOT NULL, -- Agregado para coincidir con la llave primaria compuesta de ORDENES_COMPRAS
    CodProd INT NOT NULL, -- Agregado para coincidir con la llave primaria compuesta de ORDENES_COMPRAS
    FOREIGN KEY (RIFSuc,CodOrden, CodRequiCom, CodProd) REFERENCES ORDENES_COMPRAS(RIFSuc,CodOrden, CodRequiCom, CodProd) ON UPDATE CASCADE ON DELETE NO ACTION
);

-- Tabla FACTURAS_TIENDAS
CREATE TABLE FACTURAS_TIENDAS (
    CodF INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
    Fecha DATE NOT NULL,
    Monto DECIMAL(10, 2) NOT NULL CHECK (Monto > 0),
    Descuento DECIMAL(10,2) NOT NULL,
    CodPago INT NOT NULL,
	CIResponsable VARCHAR(8) NOT NULL,
    FOREIGN KEY (CIResponsable) REFERENCES RESPONSABLES(CIResponsable) ON UPDATE NO ACTION ON DELETE NO ACTION,
    FOREIGN KEY (CodPago) REFERENCES PAGOS(CodPago) ON UPDATE CASCADE ON DELETE NO ACTION
);


-- Tabla DESCUENTOS
CREATE TABLE DESCUENTOS (
    RIFSuc VARCHAR(12) NOT NULL,
    NroDesc INT NOT NULL IDENTITY(1,1),
    LimiteInfe INT NOT NULL,
    LimiteSup INT NOT NULL,
    PorcentajeDesc DECIMAL(10,2) NOT NULL CHECK (PorcentajeDesc > 0),
    UNIQUE(LimiteInfe,LimiteSup),
	CHECK (LimiteSup >= LimiteInfe),
    PRIMARY KEY (RIFSuc, NroDesc),
    FOREIGN KEY (RIFSuc) REFERENCES SUCURSALES(RIFSuc) ON UPDATE CASCADE ON DELETE CASCADE
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
    FOREIGN KEY (RIFSucursal) REFERENCES SUCURSALES(RIFSuc) ON UPDATE CASCADE ON DELETE CASCADE,
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
    PRIMARY KEY (CodServicio, NroActividad, NroOrenServ, CodProductoServ),
    FOREIGN KEY (CodServicio, NroActividad) REFERENCES ACTIVIDADES(CodServicio, NroActividad) ON UPDATE NO ACTION ON DELETE NO ACTION,
    FOREIGN KEY (NroOrenServ) REFERENCES ORDENES_SERVICIOS(Nro) ON UPDATE NO ACTION ON DELETE NO ACTION,
    FOREIGN KEY (CodProductoServ) REFERENCES PRODUCTOS_SERVICIOS(CodProd) ON UPDATE NO ACTION ON DELETE NO ACTION
);



-- Tabla INVENTARIOS
CREATE TABLE INVENTARIOS (
    RIFSuc VARCHAR(12) NOT NULL,
    CodProducto INT NOT NULL,
    Existencia INT NOT NULL CHECK (Existencia >= 0),
    PRIMARY KEY (CodProducto),
    FOREIGN KEY (RIFSuc) REFERENCES SUCURSALES(RIFSuc) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (CodProducto) REFERENCES PRODUCTOS(CodProd) ON UPDATE CASCADE ON DELETE NO ACTION
);




GO 

CREATE VIEW inventario_view
AS

	SELECT s.RIFSuc,p.CodProd, p.NombreP, i.Existencia
	FROM PRODUCTOS p, INVENTARIOS i, SUCURSALES s
	WHERE p.CodProd = i.CodProducto 
	AND s.RIFSuc = i.RIFSuc

GO




/*
--Vista aux para la primera consulta de estadísticas

CREATE VIEW V_ServiciosPorMarca AS
SELECT 
    S.Descripcion AS TipoServicio,
    M.Nombre AS Marca,
    COUNT(*) AS Cantidad
FROM 
    ORDENES_SERVICIOS OS
JOIN 
    VEHICULOS V ON OS.CodVehiculo = V.CodVehiculo
JOIN 
    MODELOS_VEHICULOS MV ON V.CodMarca = MV.CodMarcaV
JOIN 
    MARCAS_VEHICULOS M ON MV.CodMarcaV = M.CodMarcaVeh
JOIN 
    CONTRATAN_ACT_ORDENS_PROD_SERV CA ON OS.Nro = CA.NroOrenServ
JOIN 
    ACTIVIDADES A ON CA.CodServicio = A.CodServicio AND CA.NroActividad = A.NroActividad
JOIN 
    SERVICIOS S ON A.CodServicio = S.CodigoServ
GROUP BY 
    S.Descripcion, M.Nombre;

-- Desde donde voy a buscar la primera consulta de Estadísticas

	CREATE VIEW V_Est_Marcas_Servicios AS
SELECT 
    spm1.TipoServicio,
    spm1.Marca,
    spm1.Cantidad
FROM 
    V_ServiciosPorMarca spm1
WHERE 
    spm1.Cantidad = (
        SELECT MAX(spm2.Cantidad)
        FROM V_ServiciosPorMarca spm2
        WHERE spm2.TipoServicio = spm1.TipoServicio
    );


-- Vista Auxiliat para la consulta de estadísticas 2

CREATE VIEW V_ServiciosPorEmpleadoMes AS
SELECT 
    T.Cedula AS CIEmpleado,
    T.Nombre AS NombreEmpleado,
    YEAR(OS.FechaHoraE) AS Año,
    MONTH(OS.FechaHoraE) AS Mes,
    COUNT(*) AS Cantidad
FROM 
    ORDENES_SERVICIOS OS
JOIN 
    TRABAJADORES T ON OS.CIEmpleado = T.Cedula
GROUP BY 
    T.Cedula,
    T.Nombre,
    YEAR(OS.FechaHoraE),
    MONTH(OS.FechaHoraE);


---Consulta 2 Personal que realiza más servicios por mes.

	CREATE VIEW V_PersonalMasServiciosPorMes AS
SELECT 
    Año as Anio,
    Mes,
    CIEmpleado,
    NombreEmpleado,
    Cantidad
FROM 
    V_ServiciosPorEmpleadoMes spem1
WHERE 
    Cantidad = (
        SELECT MAX(spem2.Cantidad)
        FROM V_ServiciosPorEmpleadoMes spem2
        WHERE spem2.Año = spem1.Año AND spem2.Mes = spem1.Mes
    );

---Consulta 2 Personal que realiza menos servicios por mes.

	CREATE VIEW V_PersonalMenosServiciosPorMes AS
SELECT 
    Año as Anio,
    Mes,
    CIEmpleado,
    NombreEmpleado,
    Cantidad
FROM 
    V_ServiciosPorEmpleadoMes spem1
WHERE 
    Cantidad = (
        SELECT MIN(spem2.Cantidad)
        FROM V_ServiciosPorEmpleadoMes spem2
        WHERE spem2.Año = spem1.Año AND spem2.Mes = spem1.Mes
    );


*/


-- ********************************* TRIGGERS *******************************

GO

CREATE TRIGGER tr_AfterInsert_Factura_Proveedor
ON FACTURAS_PROVEEDORES
AFTER INSERT
AS
BEGIN
    -- Declare variables to hold the inserted values
    DECLARE @RIFSuc VARCHAR(12);
    DECLARE @CodProd INT;
    DECLARE @CodRequiCom INT;
    DECLARE @CantProd INT;

    -- Retrieve the inserted values
    SELECT @RIFSuc = i.RIFSuc, @CodProd = i.CodProd, @CodRequiCom = i.CodRequiCom
    FROM INSERTED i;

    -- Retrieve the quantity from the requisitions table
    SELECT @CantProd = rc.CantProd
    FROM REQUISICIONES_COMPRA rc
    WHERE rc.IdReq = @CodRequiCom AND rc.CodProd = @CodProd AND rc.RIFSuc = @RIFSuc;

    -- Check if the product already exists in the inventory
    IF EXISTS (SELECT 1 FROM INVENTARIOS WHERE RIFSuc = @RIFSuc AND CodProducto = @CodProd)
    BEGIN
        -- Update the existing inventory record
        UPDATE INVENTARIOS
        SET Existencia = Existencia + @CantProd
        WHERE RIFSuc = @RIFSuc AND CodProducto = @CodProd;
    END
    ELSE
    BEGIN
        -- Insert a new inventory record
        INSERT INTO INVENTARIOS (RIFSuc, CodProducto, Existencia)
        VALUES (@RIFSuc, @CodProd, @CantProd);
    END
END;

GO






--*********************PROCEDIMIENTOS

--GENERA REQUISICIONES DE COMPRAS PARA UNA SUCURSAL DADA
GO
CREATE PROCEDURE GenerarRequisicionesCompra
    @RIFSuc VARCHAR(12)
AS
BEGIN
    DECLARE @CodProd INT;
    DECLARE @Minimo INT;
    DECLARE @Existencia INT;
    DECLARE @CantidadAOrdenar INT;
    DECLARE @FechaActual DATE = GETDATE();

    DECLARE productos_cursor CURSOR FOR
        SELECT p.CodProd, p.Minimo, ISNULL(i.Existencia, 0) AS Existencia
        FROM PRODUCTOS p
        LEFT JOIN INVENTARIOS i ON p.CodProd = i.CodProducto AND i.RIFSuc = @RIFSuc;

    OPEN productos_cursor;

    FETCH NEXT FROM productos_cursor INTO @CodProd, @Minimo, @Existencia;

    WHILE @@FETCH_STATUS = 0
    BEGIN
        -- Calcular la cantidad a ordenar
        SET @CantidadAOrdenar = @Minimo - @Existencia;
        
        IF @CantidadAOrdenar > 0
        BEGIN
            -- Calcular la cantidad para que la existencia quede en 25% del mínimo
            SET @CantidadAOrdenar = CEILING(@Minimo * 1.25);

            -- Insertar una nueva requisición de compra
            INSERT INTO REQUISICIONES_COMPRA (RIFSuc, CodProd, CantProd, Fecha)
            VALUES (@RIFSuc, @CodProd, @CantidadAOrdenar, @FechaActual);
        END

        FETCH NEXT FROM productos_cursor INTO @CodProd, @Minimo, @Existencia;
    END

    CLOSE productos_cursor;
    DEALLOCATE productos_cursor;
END;
GO



-- INSERTA EL MONTO CORRECTO EN CONTRATACIONES PARA UNA ORDEN SERVICIO
-- MONTO = MONTOACTIVIDAD + CANT PRODUCTO * PRECIO PRODUCTO

GO

CREATE PROCEDURE InsertarContratan
    @CodServicio INT,
    @NroActividad INT,
    @NroOrenServ INT,
    @CodProductoServ INT,
    @CantProd INT
AS
BEGIN
    DECLARE @MontoActividad DECIMAL(10, 2);
    DECLARE @PrecioProducto DECIMAL(10, 2);
    DECLARE @PrecioTotal DECIMAL(10, 2);

    -- Iniciar una transacción
    BEGIN TRANSACTION;

    -- Obtener el monto de la actividad
    SELECT @MontoActividad = Monto
    FROM ACTIVIDADES
    WHERE CodServicio = @CodServicio AND NroActividad = @NroActividad;

    -- Obtener el precio del producto
    SELECT @PrecioProducto = Precio
    FROM PRODUCTOS
    WHERE CodProd = @CodProductoServ;

    -- Calcular el precio total (monto de la actividad + precio del producto)
    SET @PrecioTotal = @MontoActividad + (@PrecioProducto*@CantProd);

    -- Insertar en la tabla CONTRATAN_ACT_ORDENS_PROD_SERV
    INSERT INTO CONTRATAN_ACT_ORDENS_PROD_SERV (
        CodServicio, NroActividad, NroOrenServ, CodProductoServ, CantProd, Precio
    )
    VALUES (
        @CodServicio, @NroActividad, @NroOrenServ, @CodProductoServ, @CantProd, @PrecioTotal
    );

    -- Verificar si todo salió bien y finalizar la transacción
    IF @@ERROR = 0
    BEGIN
        COMMIT TRANSACTION;
    END
    ELSE
    BEGIN
        ROLLBACK TRANSACTION;
    END
END;

GO

--Procedimiento para calcular el descuento PARA UNA  CI RESPONSABLE DADA
GO
CREATE PROCEDURE ObtenerDescuentoParaResponsable
    @CIResponsable VARCHAR(8)
AS
BEGIN
    DECLARE @CantidadOrdenes INT;
    DECLARE @Descuento DECIMAL(10,2);

    -- Contar órdenes de servicio en los últimos 4 meses
    SELECT @CantidadOrdenes = COUNT(*)
    FROM ORDENES_SERVICIOS os
    JOIN VEHICULOS v ON os.CodVehiculo = v.CodVehiculo
    WHERE v.CiResp = @CIResponsable
    AND os.FechaHoraE >= DATEADD(MONTH, -4, GETDATE());

    -- Determinar el descuento correspondiente
    SELECT @Descuento = PorcentajeDesc
    FROM DESCUENTOS
    WHERE @CantidadOrdenes BETWEEN LimiteInfe AND LimiteSup;

    -- Devolver el descuento
    SELECT @Descuento AS Descuento;
END

--EXECUTE ObtenerDescuentoParaResponsable @CIResponsable = 30212401



--OBTENER NRO ORDEN SERVICIO RESPONSABLE CEDULA PARA UNA ORDEN DE SERVICIO DADA

GO
CREATE PROCEDURE ObtenerDatosOrdenServicio
    @NroOrdenServicio INT
AS
BEGIN
    SELECT 
        os.Nro AS 'Nro ORDEN DE SERVICIO',
        v.CodVehiculo AS 'CODIGO DE VEHICULO',
        r.NombreResponsable AS 'Nombre Responsable',
        r.CIResponsable AS 'CI. Responsable'
    FROM ORDENES_SERVICIOS os
    INNER JOIN VEHICULOS v ON os.CodVehiculo = v.CodVehiculo
    INNER JOIN RESPONSABLES r ON v.CiResp = r.CIResponsable
    WHERE os.Nro = @NroOrdenServicio;
END;

--EXECUTE ObtenerDatosOrdenServicio @NroOrdenServicio = 1

--OBTENER SERVICIOS PARA UNA ORDEN DE SERVICIO DADA
GO 
CREATE PROCEDURE ObtenerServiciosOrdenServicio
    @NroOrdenServicio INT
AS
BEGIN
    SELECT 
        caos.CodServicio AS 'COD',
        s.Descripcion AS 'DESCRIPCION'
    FROM CONTRATAN_ACT_ORDENS_PROD_SERV caos
    INNER JOIN SERVICIOS s ON caos.CodServicio = s.CodigoServ
    WHERE caos.NroOrenServ = @NroOrdenServicio;
END;

--EXECUTE ObtenerServiciosOrdenServicio @NroOrdenServicio = 1

--OBTENER ACTIVIDADES PARA UNA ORDEN DE SERVICIO DADA
GO
CREATE PROCEDURE ObtenerActividadesOrdenServicio
    @NroOrdenServicio INT
AS
BEGIN
    SELECT 
        a.CodServicio AS 'COD',
        a.NroActividad AS 'COD ACTIVIDAD',
        a.Descripcion AS 'DESCRIPCION',
        a.Monto AS 'MONTO'
    FROM CONTRATAN_ACT_ORDENS_PROD_SERV caos
    INNER JOIN ACTIVIDADES a ON caos.CodServicio = a.CodServicio AND caos.NroActividad = a.NroActividad
    WHERE caos.NroOrenServ = @NroOrdenServicio;
END;

--EXECUTE ObtenerActividadesOrdenServicio @NroOrdenServicio = 1

--OBTENER PRODUCTOS  CON UNA ORDEN SERVICIO DADA
GO
CREATE PROCEDURE ObtenerProductosOrdenServicio
    @NroOrdenServicio INT
AS
BEGIN
    SELECT 
        p.NombreP AS 'Productos'
    FROM CONTRATAN_ACT_ORDENS_PROD_SERV caos
    INNER JOIN PRODUCTOS p ON caos.CodProductoServ = p.CodProd
    WHERE caos.NroOrenServ = @NroOrdenServicio;
END;

--EXECUTE ObtenerProductosOrdenServicio @NroOrdenServicio = 1

--OBTENER DESCUENTO CON UNA ORDEN SERVICIO DADA
GO
CREATE PROCEDURE ObtenerDescuentoPorOrdenServicio
    @NroOrdenServicio INT
AS
BEGIN
    DECLARE @CIResponsable VARCHAR(8);
    DECLARE @CantidadOrdenes INT;
    DECLARE @Descuento DECIMAL(10,2);

    -- Obtener el CIResponsable a partir del NroOrdenServicio
    SELECT @CIResponsable = r.CIResponsable
    FROM ORDENES_SERVICIOS os
    INNER JOIN VEHICULOS v ON os.CodVehiculo = v.CodVehiculo
    INNER JOIN RESPONSABLES r ON v.CiResp = r.CIResponsable
    WHERE os.Nro = @NroOrdenServicio;

    -- Contar órdenes de servicio en los últimos 4 meses
    SELECT @CantidadOrdenes = COUNT(*)
    FROM ORDENES_SERVICIOS os
    JOIN VEHICULOS v ON os.CodVehiculo = v.CodVehiculo
    WHERE v.CiResp = @CIResponsable
    AND os.FechaHoraE >= DATEADD(MONTH, -4, GETDATE());

    -- Determinar el descuento correspondiente
    SELECT @Descuento = PorcentajeDesc
    FROM DESCUENTOS
    WHERE @CantidadOrdenes BETWEEN LimiteInfe AND LimiteSup;

    -- Devolver el descuento
    SELECT @Descuento AS Descuento;
END;



