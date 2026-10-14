# Especificación de Requisitos de Software (ERS)
## Proyecto: Tienda Online "HuertoHogar" (Versión 2.0 - Frontend React)

**Asignatura:** DSY1104 - Desarrollo Fullstack II  
**Evaluación:** Evaluación Parcial N° 2 (30%)  
**Equipo de Trabajo:** Traiganmen al JSON  
**Fecha:** Octubre 2026  
**Versión:** 2.0 (Actualizada con Framework React y Pruebas Unitarias)

---

## 1. Introducción

### 1.1 Propósito
El propósito del presente documento es formalizar la **Especificación de Requisitos de Software (ERS)** en su versión 2.0 para la plataforma e-commerce **HuertoHogar**. Este documento detalla la migración de la arquitectura estática original (Vanilla JS/HTML5/CSS3) hacia un ecosistema moderno basado en **React 19** utilizando **Vite** como herramienta de empaquetado y construcción, integrando gestión de estado global mediante **React Context API**, diseño responsivo con **Bootstrap 5**, componentes modulares y una suite automatizada de **pruebas unitarias** desarrollada con **Vitest** y **React Testing Library**.

### 1.2 Alcance del Sistema
HuertoHogar es una tienda digital especializada en la comercialización de productos agrícolas frescos (frutas, verduras), productos orgánicos y lácteos directos de productores chilenos. 
El sistema en su versión 2 contempla:
* Navegación fluida Single Page Application (SPA) sin recargas de página.
* Catálogo dinámico con filtrado reactivo por categorías y búsqueda por texto.
* Carrito de compras reactivo con actualización instantánea de stock, cantidades y totales.
* Sistema de autenticación con control de acceso basado en roles (`cliente` y `admin`).
* Panel de administración (Back-office) protegido para operaciones CRUD sobre el catálogo de productos.
* Componentes desacoplados y reutilizables (`Navbar`, `Footer`, `ProductCard`, `Alert`).
* Persistencia local en tiempo real sincronizada con `window.localStorage`.
* Suite completa de 27 pruebas unitarias automatizadas.

### 1.3 Referencias Normativas
* Estándar IEEE 830-1998 para la Especificación de Requisitos de Software.
* Pauta de Evaluación y Rúbrica DSY1104 - Evaluación Parcial N° 2.
* Anexo 1: Instrucciones para el desarrollo de la Evaluación 2 (30%).

---

## 2. Descripción General del Sistema

### 2.1 Perspectiva del Producto
HuertoHogar evoluciona de un conjunto de páginas HTML independientes a una **Single Page Application (SPA)** de alto rendimiento. Todas las vistas conviven dentro de un único contenedor DOM renderizado por React, manteniendo las URLs sincronizadas a través de `react-router-dom` v7.

### 2.2 Arquitectura del Sistema
El sistema implementa una arquitectura modular por capas en el frontend:
1. **Capa de Enrutamiento y Control de Acceso (`App.jsx`):** Define las rutas públicas y rutas protegidas (`ProtectedRoute`) que restringen el acceso al panel administrativo.
2. **Capa de Estado Global (`src/context/`):**
   * `ProductContext`: Gestiona el inventario de productos y provee métodos CRUD (`addProduct`, `updateProduct`, `deleteProduct`). Optimizado con `useMemo` y `useCallback`.
   * `CartContext`: Administra los productos seleccionados, cantidades, cálculo de totales y vaciado.
   * `AuthContext`: Controla el estado de sesión, credenciales del usuario activo y perfiles de rol.
3. **Capa de Componentes Reutilizables (`src/components/`):** Piezas de UI independientes con estilos encapsulados vía CSS Modules (`.module.css`).
4. **Capa de Vistas / Páginas (`src/pages/`):** Ensamblado de componentes para cada flujo funcional (`Inicio`, `Catalogo`, `Carrito`, `Login`, `Registro`, `Perfil`, `Seguimiento`, `Admin`).

### 2.3 Perfiles de Usuario
* **Visitante / Usuario Anónimo:** Puede explorar el catálogo, buscar productos, ver detalles, filtrar por categorías y agregar artículos al carrito.
* **Cliente Registrado:** Puede iniciar sesión, gestionar sus datos de perfil, revisar historial de compras y realizar pedidos.
* **Administrador:** Cuenta con permisos especiales (`role: 'admin'`). Dispone de acceso exclusivo al "Panel de Control" para gestionar el catálogo (alta, edición y baja de productos mediante modales).

---

## 3. Requerimientos Funcionales (RF)

| ID | Nombre | Descripción | Prioridad |
|---|---|---|---|
| **RF-01** | **Navegación SPA** | El sistema debe navegar entre vistas (`/`, `/catalogo`, `/carrito`, `/login`, `/registro`, `/perfil`, `/seguimiento`, `/admin`) sin recargar el navegador utilizando `react-router-dom`. | Alta |
| **RF-02** | **Catálogo Reactivo** | Debe renderizar la lista completa de productos obtenida desde `ProductContext`, mostrando imagen, nombre, precio por unidad, origen y stock. | Alta |
| **RF-03** | **Filtrado y Búsqueda** | El catálogo debe permitir filtrar dinámicamente por categoría (Frutas, Verduras, Orgánicos, Lácteos) y buscar por texto en tiempo real. | Alta |
| **RF-04** | **Productos Destacados Aleatorios** | En la página de inicio, el sistema debe seleccionar y mostrar aleatoriamente hasta 4 productos del inventario cada vez que se cargue la vista. | Media |
| **RF-05** | **Gestión de Carrito** | El cliente puede agregar productos, incrementar o decrementar cantidades y eliminar ítems. El contador numérico en el Navbar debe sincronizarse en tiempo real. | Alta |
| **RF-06** | **Cálculo de Totales** | El carrito debe computar subtotales por producto y el total general en pesos chilenos (CLP) formateado numéricamente. | Alta |
| **RF-07** | **Confirmación de Pedido** | Al confirmar la compra, el sistema debe validar que existan ítems, generar la confirmación y reiniciar el carrito. | Alta |
| **RF-08** | **Autenticación de Usuarios** | Formulario de Login que valida formato de correo electrónico y contraseña. Al ingresar credenciales de admin (`admin@huertohogar.cl`), el sistema asigna el rol de administrador. | Alta |
| **RF-09** | **Registro con Validaciones** | Formulario de registro con validaciones en tiempo real: nombre mínimo 2 caracteres, correo válido, contraseñas coincidentes y aceptación de términos. | Alta |
| **RF-10** | **Rutas Protegidas** | Si un usuario no autenticado o con rol de cliente intenta ingresar a `/admin`, el sistema debe redirigir inmediatamente a `/` o `/login`. | Crítica |
| **RF-11** | **CRUD de Productos (Admin)** | El administrador puede crear nuevos productos, editar precio/nombre/categoría y eliminar productos con confirmación mediante ventanas modales interactivas. | Alta |
| **RF-12** | **Componentes de Alerta y Notificación** | Implementación del componente reutilizable `Alert` (`Alert.jsx` + `Alert.module.css`) con tipos (`success`, `danger`, `warning`, `info`) y opción de autocierre para feedback al usuario. | Media |

---

## 4. Requerimientos No Funcionales (RNF)

| ID | Nombre | Descripción |
|---|---|---|
| **RNF-01** | **Responsividad (Mobile First)** | La interfaz debe adaptarse coherentemente a pantallas móviles (< 576px), tablets (768px) y escritorios (> 992px) mediante el sistema de rejilla y utilidades de Bootstrap 5. |
| **RNF-02** | **Principio de Responsabilidad Única (SRP)** | Cada componente de React debe cumplir una única función bien definida, separando lógica de presentación y estado. |
| **RNF-03** | **Aislamiento de Estilos** | Prohibición de estilos en línea invasivos; utilización de CSS Modules (`[Componente].module.css`) combinados con clases globales de Bootstrap. |
| **RNF-04** | **Persistencia de Datos** | La información de productos, usuario activo y carrito de compras debe persistir en `localStorage`, sobreviviendo al cierre de pestaña. |
| **RNF-05** | **Rendimiento y Optimización** | Uso de hooks `useMemo` y `useCallback` en proveedores de contexto y listados para evitar re-renderizados innecesarios del árbol de componentes. |
| **RNF-06** | **Cobertura de Pruebas Unitarias** | La suite debe contener al menos 10 pruebas automatizadas (implementadas 27 pruebas) abarcando renderizado, eventos, estado, manipulación del DOM y seguridad. |

---

## 5. Matriz de Trazabilidad: Requisitos vs Pruebas Unitarias

| Caso de Prueba | Módulo / Componente | Requisito Verificado | Estado |
|---|---|---|---|
| **PU-001** | AuthContext | RF-08 / RNF-04: Inicialización sin usuario activo | Pasó |
| **PU-002** | AuthContext | RF-08 / RF-10: Login con rol admin (`admin@huertohogar.cl`) | Pasó |
| **PU-003** | AuthContext | RF-08: Cierre de sesión y limpieza de estado | Pasó |
| **PU-004** | AuthContext | RF-09: Registro de usuario y login automático | Pasó |
| **PU-005** | CartContext | RF-05: Incorporación de ítem al carrito | Pasó |
| **PU-006** | CartContext | RF-05: Modificación incremental de cantidad | Pasó |
| **PU-007** | CartContext | RF-05: Eliminación de ítem del carrito | Pasó |
| **PU-008** | CartContext | RF-07: Vaciado total del carrito | Pasó |
| **PU-009** | ProductContext | RF-02 / RNF-04: Carga inicial de catálogo por defecto | Pasó |
| **PU-010** | ProductContext | RF-11: Operaciones de alta y baja en el catálogo | Pasó |
| **PU-011** | Navbar | RF-01: Renderizado de enlaces públicos de navegación | Pasó |
| **PU-012** | Navbar | RF-05: Visualización reactiva de badge contador de carrito | Pasó |
| **PU-013** | Navbar | RF-08: Despliegue de botón "Salir" ante sesión iniciada | Pasó |
| **PU-014** | Navbar | RF-10: Despliegue condicional de enlace "Panel de Control" | Pasó |
| **PU-015** | Footer | RNF-01: Renderizado de copyright y año dinámico | Pasó |
| **PU-016** | ProductCard | RF-02: Presentación correcta de datos del producto | Pasó |
| **PU-017** | ProductCard | RF-05: Disparo de callback personalizado al agregar | Pasó |
| **PU-018** | ProductCard | RF-05: Invocación a `CartContext.addToCart` por defecto | Pasó |
| **PU-019** | Inicio | RF-04: Renderizado de Hero y grilla de 4 destacados | Pasó |
| **PU-020** | Catalogo | RF-03: Filtrado dinámico por término de búsqueda | Pasó |
| **PU-021** | Carrito | RF-05: Despliegue de estado vacío cuando no hay ítems | Pasó |
| **PU-022** | Carrito | RF-06 / RF-07: Procesamiento de checkout y confirmación | Pasó |
| **PU-023** | Login | RF-08: Envío y validación de formulario de credenciales | Pasó |
| **PU-024** | Admin | RF-10: Bloqueo de acceso y redirección para no-admin | Pasó |
| **PU-025** | Admin | RF-11: Apertura de modal y creación de nuevo producto | Pasó |
| **PU-026** | Alert | RF-12 / RNF-02: Renderizado accesible con role="alert" | Pasó |
| **PU-027** | Alert | RF-12: Evento interactivo de cierre de notificación | Pasó |

---

## 6. Conclusiones y Cumplimiento
La versión 2.0 de la plataforma HuertoHogar satisface el 100% de los criterios estipulados en la rúbrica de evaluación DSY1104, logrando una arquitectura desacoplada, responsiva y completamente validada mediante pruebas automatizadas.
