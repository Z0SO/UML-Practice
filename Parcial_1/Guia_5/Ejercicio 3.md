
**Consigna**: Considere el [[Ejercicio 4]] de la guía anterior, haga la realización de los casos de uso vinculados a préstamo y devolución de libros.

---

### Descripción del Caso de Uso: "Devolver libros"

| **Descripción del Caso de Uso: "Devolver libros"**                                                                                                                                                                                                                                                                                                                                                                                                             |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Actor:** Bibliotecario<br>**Precondición:** Préstamo realizado y bibliotecario logueado.<br>**Postcondición:** Devolución realizada.                                                                                                                                                                                                                                                                                                                          |
| **Camino Estándar**                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 1. El sistema muestra las opciones disponibles.<br>2. El bibliotecario selecciona registrar devolución.<br>3. El sistema solicita el libro prestado.<br>4. El bibliotecario escanea el libro.<br>5. El sistema comprueba si la fecha actual se encuentra dentro del límite de devolución.<br>6. El sistema solicita si tiene fallas o no.<br>7. El bibliotecario ingresa que el libro no tiene fallas.<br>8. El sistema registra la información.<br>9. Fin del caso de uso. |
| **Camino Alternativo**                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| **6.a. Libro entregado fuera de tiempo**<br>a.1. El sistema informa la penalización que se aplicará por la entrega fuera de tiempo.<br>a.2. El bibliotecario acepta.<br>a.3. Vuelve al paso 6.<br>**7.a. Libros con fallas**<br>a.1. El bibliotecario ingresa que el libro tiene fallas.<br>a.2. El sistema solicita la gravedad de las fallas y una descripción.<br>a.3. El bibliotecario ingresa la información solicitada.<br>a.4. El sistema procesa y calcula la penalización.<br>a.5. El sistema informa la penalización que se aplicará.<br>a.6. El bibliotecario acepta.<br>a.7. Vuelve al paso 8. |

---

### Diagrama de Clases

```plantuml
@startuml

' Necesito que el estilo de las líneas sean ortogonales
skinparam linetype ortho

' Esto se encarga de la separación de las relaciones
skinparam nodesep 80

left to right direction 

class "Sistema" {
    - nombre: String
    - version: String
    - descripcion: String

    + getNombre(): String
    + getVersion(): String
    + getDescripcion(): String
    + calcularPenalizacion(): double
    + registrarDevolucion(): void
    + registrarPrestamo(): void
    + informeLibrosMasRequeridos(): void
    + informeLibrosRechazados(): void
}

class "Socio" {
    - nombre: String
    - apellido: String
    - dni: String
    - direccion: String
    - telefono: String

    + getAyN(): String
}

class "Libro" {
    - idLibro: int
    - titulo: String
    - autor: String
    - editorial: String
    - isbn: String
    - cantidad: int

    + getTitulo(): String
    + getAutor(): String
    + getEditorial(): String
    + getIsbn(): String
    + getCantidad(): int
}

class "Prestamo" {
    - idPrestamo: int
    - fechaPrestamo: Date
    - fechaDevolucion: Date
    - estado: String
    - penalizacion: double

    + getIdPrestamo(): int
    + getFechaPrestamo(): Date
    + getFechaDevolucion(): Date
    + getEstado(): String
    + getPenalizacion(): double
}

class Ejemplar {
    - id_Ejemplar: int
}


' Clases aisladas que son CtrlSecion, CtrlDevLibro, UIDevLibro


class CTRLDevLibro {
    - sistema: Sistema
    - socio: Socio
    - libro: Libro
    - prestamo: Prestamo

    + registrarDevolucion(): void
}




' class "Bibliotecario" {
'     - nombre: String
'     - apellido: String
'     - dni: String
'     - direccion: String
'     - telefono: String

'     + getAyN(): String
' }



'Libro "1..*" ---- "1" Prestamo: tiene
Prestamo "0..*" ---- "1" Socio: < solicita


' asociacion Ejemplar con Libro y Prestamo
Ejemplar "1" ---- "0..*" Libro: < tiene
Ejemplar "1" -right- "0..*" Prestamo: < pertenece



' La etiqueta '<-left-
' indica que la relación se direcciona hacia la izquierda



' para direccionar el nacimiento de la relacion se especifica con una etiqueta entre las relaciones
Prestamo "0..*" -left- "1" Sistema: < Controla

@enduml
```