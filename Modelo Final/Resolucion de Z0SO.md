


### Diagrama de Casos de uso


```plantuml

@startuml

left to right direction

actor "Usuario" as usuario

actor "Cliente" as cliente
actor "Profesional" as profesional
actor "Encargado" as encargado

usuario <|-- profesional
usuario <|-- encargado

' tambien se requiere un actor secundario Farmacia

actor "Farmacia" as farmacia




rectangle "GrowStronger" {
    
    ' caso de uso de usuario
    usecase "Iniciar Sesion" as IS
    usuario -- IS


    ' parte clientes
    usecase "Contratar Servicio" as CS
    usecase "Seleccionar Membresia" as SeleccMem
    usecase "Cancelar Membresia" as cancelMem
    cliente -- CS
    cliente -- SeleccMem
    cliente -- cancelMem

    ' parte profesional
    usecase "Evaluar Formulario" as EF
    usecase "Programar Videollamada" as ProgVid

    EF -left- ProgVid: <<extend>>
    profesional -- EF


    ' parte encargado
    usecase "Asignar Profesional" as AsignarProf
    usecase "Asignar Farmacia" as AF
    usecase "Evaluar Solicitud de Cliente" as ESC
    usecase "Visualizar Clientes Asignados" as VCA

    encargado -- AF
    encargado -- AsignarProf
    encargado -- ESC
    encargado -- VCA


    ' actor secundario farmacia
    farmacia -up- AF

}


@enduml
```
