


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



    ' parte profesional
    usecase "Evaluar Formulario" as EF
    usecase "Asignar Farmacia" as AF

    profesional -- EF
    profesional -- AF

    ' actor secundario farmacia
    farmacia -up- AF



}


@enduml
```
