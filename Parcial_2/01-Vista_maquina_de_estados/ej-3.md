## Ejercicio 3 - El Ascensor

El objetivo es desarrollar un modelo de ciclo de vida para un ascensor que puede encontrarse en los estados de **Detenido**, **Subiendo** o **Bajando**. Los eventos que puede recibir el ascensor son:

- **Solicitud para ir a un piso específico**
- **Alcanzar un piso**

Considere dos variantes para el problema:

1. **Ascensor sin memoria**: el ascensor solo puede recibir solicitudes cuando está detenido.
2. **Ascensor con memoria**: el ascensor puede almacenar hasta cinco solicitudes. En esta versión, el ascensor prioriza las detenciones no según el orden en que las solicitudes fueron recibidas, sino de acuerdo con su proximidad al piso actual.


---

### Ascensor sin memoria

```plantuml
@startuml

hide empty description

'definir el sentirdo de derecha a izquierda
top to bottom direction

' Definicion de estados
state "Detenido" as detenido
state "Subiendo" as subiendo
state "Bajando" as bajando

[*] -> detenido

detenido -> subiendo: [ si solicitud > piso actual ]/Solicitud para ir a un piso superior
detenido -> bajando: [ si solicitud < piso actual ]/Solicitud para ir a un piso inferior

subiendo -> detenido: Piso alcanzado
bajando -> detenido: Piso alcanzado


@enduml
```

