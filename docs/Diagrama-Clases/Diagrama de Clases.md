

En PlantUML, puedes crear una clase utilizando la palabra clave `class` seguida del nombre de la clase. Dentro de la definición de la clase, puedes especificar atributos y métodos. Aquí tienes un ejemplo básico de cómo definir una clase en PlantUML:

```plantuml
@startuml
class Persona {
  -nombre: String
  -edad: int
  +getNombre(): String
  +setNombre(nombre: String): void
  +getEdad(): int
  +setEdad(edad: int): void
}
@enduml
```

En este ejemplo:

- `class Persona` define una clase llamada `Persona`.
- Dentro de las llaves `{}`, se listan los atributos y métodos de la clase.
  - `-nombre: String` y `-edad: int` son atributos privados (`-` indica privado).
  - `+getNombre(): String` y `+setNombre(nombre: String): void` son métodos públicos (`+` indica público).

Si quieres incluir relaciones entre clases, puedes hacerlo de la siguiente manera:

```plantuml
@startuml
class Persona {
  -nombre: String
  -edad: int
  +getNombre(): String
  +setNombre(nombre: String): void
  +getEdad(): int
  +setEdad(edad: int): void
}

class Empleado {
  -salario: float
  +getSalario(): float
  +setSalario(salario: float): void
}

Persona <|-- Empleado : hereda
@enduml
```

En este caso:

- Se define una segunda clase llamada `Empleado`.
- Se indica una relación de herencia entre `Persona` y `Empleado` con `Persona <|-- Empleado`.

# Relación entre Clases

Las relaciones entre clases se definen usando los siguientes símbolos:

| Tipo        | Símbolo | Dibujo  |
|-------------|---------|---------|
| Extensión   | `<|--`  | <|--    |
| Composición | `*--`   | *--     |
| Agregación  | `o--`   | o--     |

Es posible intercambiar `--` por `..` para tener líneas punteadas.

## Ejemplos de Relación entre Clases

### Diagrama 1

```plantuml
@startuml
Class01 <|-- Class02
Class03 *-- Class04
Class05 o-- Class06
Class07 .. Class08
Class09 -- Class10
@enduml
```

### Diagrama 2

```plantuml
@startuml
Class11 <|.. Class12
Class13 --> Class14
Class15 ..> Class16
Class17 ..|> Class18
Class19 <--* Class20
@enduml
```

### Diagrama 3

```plantuml
@startuml
Class21 #-- Class22
Class23 x-- Class24
Class25 }-- Class26
Class27 +-- Class28
Class29 ^-- Class30
@enduml
```


# Etiquetas y Cardinalidad en las Relaciones

Es posible añadir etiquetas en las relaciones, usando `:` seguido del texto de la etiqueta. Para la cardinalidad, puede usar comillas dobles `""` en cada lado de la relación.

```plantuml
@startuml
Class01 "1" *-- "many" Class02 : contains
Class03 o-- Class04 : aggregation
Class05 --> "1" Class06
@enduml
```

Se puede añadir una flecha extra apuntando a un objeto, mostrando que objeto actúa sobre el otro objeto, usando `<` o `>` al inicio o al final de la etiqueta.

```plantuml
@startuml
class Car
Driver - Car : drives >
Car *- Wheel : have 4 >
Car -- Person : < owns
@enduml
```



### Descripción de los Tipos de Relaciones

- **Extensión (`<|--`)**: Indica que una clase hereda de otra.
- **Composición (`*--`)**: Indica una relación de composición fuerte donde una clase es parte de otra y depende totalmente de ella.
- **Agregación (`o--`)**: Indica una relación de agregación donde una clase contiene a otra, pero la vida de la clase contenida no depende de la clase contenedora.
- **Relación (`--`)**: Representa una relación general entre clases.
- **Relación punteada (`..`)**: Representa una relación menos formal o sujeta a cambios entre clases.

## Tipos de Lineas Rectangulares

Para hacer que las líneas de las relaciones en PlantUML sean rectangulares en lugar de diagonales, puedes utilizar la directiva `skinparam` para establecer el estilo de las flechas.

```
skinparam linetype ortho
```

# Definiendo la Visibilidad

Cuando defines propiedades o métodos, puedes usar caracteres para establecer la visibilidad que les correspondan:

| Character | Icon for field  | Icon for method | Visibility |
| --------- | --------------- | --------------- | ---------- |
| -         | private         | private         | Privada    |
| #         | protected       | protected       | Protegida  |
| ~         | package private | package private | Paquete    |
| +         | public          | public          | Pública    |

## Ejemplo en PlantUML

```plantuml
@startuml
class MiClase {
  + atributoPublico: Tipo
  - atributoPrivado: Tipo
  # atributoProtegido: Tipo
  
  + metodoPublico(parametro: Tipo): Retorno
  - metodoPrivado(parametro: Tipo): Retorno
  # metodoProtegido(parametro: Tipo): Retorno
}
@enduml

```

Puedes desactivar esta característica usando el comando:
```
skinparam classAttributeIconSize 0
```
