![[Pasted image 20240530024838.png]]
```plantuml
@startuml
left to right direction

skinparam linetype ortho

class Taller {
    - cuit: int
    - nombre: string
    - direccion: string
}

class Persona{
    dni: int
    nombre: string
    telefono: int
    direccion: string
    email: email
}

class Dueño {
    - nroCliente: string
    - fechaRegistro: date
    - nroLicencia: int
    - tipoLicencia: int
}

class Vehiculo {
    - año: int
    - nroChasis: string
    - modelo: string
    - marca: string
    - tipo: string
    - matricula: string
    - utilidad: string

    ' parte de metodos
    + getVehiculo()
}

class Personal_AtencionAlCliente{
    - CUIL: int
    - estado: string
    - turno: string

    + consultarInfoVehiculo()
}

' ##### PARTE DE RELACIONES #####

Persona <|-- Personal_AtencionAlCliente 
Persona <|-- Dueño

Dueño "1" --- "1..*" Vehiculo: Tiene >
Vehiculo "1..*" ---- "1..1*" Personal_AtencionAlCliente: < Consulta

Taller "1..1" -- "1..*" Personal_AtencionAlCliente: < Trabaja
Taller "1..1" ---- "1..*" Vehiculo:  Verifica >
@enduml

```
