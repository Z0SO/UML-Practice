


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

' para mi los usuarios para el sistema deben estar logueados si o si
' por lo que se debe iniciar sesion

usuario <|-- cliente



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
    usecase "Visualizar Clientes Asignados" as VCA

    profesional -- VCA
    profesional -- EF
    '---- parte del actor secundario
    EF -left- ProgVid: <<extend>>


    ' parte encargado
    usecase "Asignar Profesional" as AsignarProf
    usecase "Asignar Farmacia" as AF
    usecase "Evaluar Solicitud de Cliente" as ESC

    encargado -- AF
    encargado -- AsignarProf
    encargado -- ESC


    ' actor secundario farmacia
    farmacia -up- AF

}


@enduml
```


### Diagrama de Secuencia para el CU "*Contratar Servicio*"


> tener en cuenta que primero se le pide un formulario de datos personales y despues un formulario de pago


```plantuml
@startuml
' Escondiendo el footbox

hide footbox

skinparam participant {
  RoundCorner 0
}



create "   " as externo


create ":CTRL-CServ" as controlador
externo --> controlador : create()


actor "Cliente" as cliente

create ":UI-Cliente" as ui
controlador --> ui  : create()



participant ":Encargado" as enc
participant ":Profesional" as prof
participant ":GrowStronger" as GS

participant "CTRL-Session" as autenticacion

' solicita pago
controlador -> ui : mostrarOpciones()
ui -> cliente : mostrarOpciones()

cliente --> ui : opcion
ui --> controlador : opcion

' solicitar el formulario de registro de usuario
controlador -> ui : solicitarDP()
ui -> cliente : mostrarFormularioDP()

cliente --> ui : formularioDP
ui --> controlador : formularioDP

' solicitar el formulario de pago
controlador -> ui : solicitarFormularioPago()
ui -> cliente : mostrarFormularioPago()

cliente --> ui : formularioPago
ui --> controlador : formularioPago







@enduml


```
