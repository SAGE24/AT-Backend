# Proyecto de Microservicios con Node.js y NestJS - Patrón SAGA con Orquestación

Este proyecto implementa un conjunto de microservicios en Node.js usando el framework NestJS, siguiendo el patrón de diseño SAGA mediante **orquestación** para coordinar los procesos entre servicios. El propósito es gestionar el flujo de creación de reservas de vuelo, pagos y clientes de manera distribuida, con soporte para compensaciones en caso de fallo en alguna transacción.

## Arquitectura General

El proyecto está dividido en los siguientes microservicios:

1. **Customer Service**: crear registro y validación de clientes.
2. **Flights Service**: Se encarga de crear y actualizar estado de reservacion.
3. **Payment Service**: Crea los registros de pagos.
4. **Orchestrator Service**: Actúa como el coordinador central del flujo SAGA, controlando los pasos entre servicios y manejando las compensaciones en caso de error.

## Tabla de Contenidos

- [Servicios](#servicios)
- [Patrón SAGA con Orquestación](#patrón-saga-con-orquestación)
- [Cómo Ejecutar el Proyecto](#cómo-ejecutar-el-proyecto)

---

## Servicios

### 1. Customer Service

**Responsabilidad**: El Customer Service es responsable de manejar la creación y validación de clientes.

**EndPoints**:
- **POST /api/customers**: Crea un nuevo cliente en la base de datos.
- **GET /api/customers/:document**: Buscar registro de cliente por documento.

### 2. Reservation Service

**Responsabilidad**: Este servicio gestiona la creación y cambio de estado de reservas.

**EndPoints**:
- **POST /api/flights**: Crea una nueva reserva de vuelo para un cliente y genera un ID de reserva.
- **UPDATE /api/flights/:id**: Actualiza el estado de la reserva, por error o que se concreto el pago.

### 3. Payment Service

**Responsabilidad**: Maneja los pagos asociados a una reserva específica.

**EndPoints**:
- **POST /api/payments**: Procesa el pago de una reserva utilizando el ID de la reserva, ID de cliente y el monto.

### 4. Orchestrator Service

**Responsabilidad**: Este servicio actúa como orquestador central, coordinando las acciones entre los demás servicios y gestionando el flujo de transacciones y compensaciones en caso de fallo.

**Flujo de Orquestación**:
- Inicia el flujo de reserva al recibir datos de cliente y vuelo.
- Llama a los servicios en secuencia:
  - **Customer Service** para crear o validar al cliente.
  - **Flight Service** para crear la reserva.
  - **Payment Service** para procesar el pago.
- Si algún paso falla, activa un proceso de compensación llamando a otros servicios para revertir las operaciones (por ejemplo, cancelar una reserva si falla el pago).

## Patrón SAGA con Orquestación

En este proyecto, se usa **SAGA con orquestación**. Esto significa que el **Orchestrator Service** es responsable de coordinar cada paso en el proceso, actuando como el controlador central que comunica los servicios entre sí en un orden específico. Esto permite una gestión más sencilla de las transacciones distribuidas y proporciona un punto de control para manejar fallos y compensaciones.

### Flujo de Transacciones y Compensaciones

1. **Creación de Cliente**:
   - El orquestador valida si el cliente existe mediante el `Customer Service`.
   - Si no existe, solicita su creación.
   
2. **Creación de Reserva**:
   - Una vez validado el cliente, el orquestador solicita al `Reservation Service` la creación de una nueva reserva.
   
3. **Procesamiento de Pago**:
   - Si la reserva se crea exitosamente, el orquestador llama al `Payment Service` para procesar el pago.
   - Si el pago es exitoso, el orquestador llama al `Reservation Service` para actualizar estado a pagado.
   - Si el pago falla, el orquestador invoca la cancelación de la reserva en el `Reservation Service` como compensación.

## Cómo Ejecutar el Proyecto

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio

2. Instalar dependencias:
   npm install

3. Configurar variables de entorno de los diferentes proyestos .env:
   para los servicios service-customers, service-flights, service-payments agregar las siguientes variables globales:
   - **DB_HOST**, nombre de base de datos mysql.
   - **DB_PORT**, puerto de pase de datos mysql.
   - **DB_USERNAME**, usuario.
   - **DB_PASSWORD**, contraseña.
   - **DB_NAME, nombre** de base de datos.

   para el orquestador:
   - **URL_SERVICE_CUSTOMERS**, url de sevicio de cliente.
   - **URL_SERVICE_FLIGTHS**, url se servicio de reservacion.
   - **URL_SERVICE_PAYMENTS**, url para servicio de pagos.

4. Ejecutar cada microservicio en un puerto diferente.
   ```bash
   - npm run start:dev

5. Se puede visualizar los servicios desde Swagger, o utilizar postman cargado en la carpeta Utils.
   - **Customers**: http://localhost:3000/api/customer
   - **Flights**: http://localhost:3001/api/flight
   - **Payments**: http://localhost:3002/api/payments
   - **Orchestrator**: http://localhost:3003/api/orchestrator