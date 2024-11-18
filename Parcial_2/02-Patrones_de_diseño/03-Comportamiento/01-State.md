
---
## Patron (State) Concepto

El patrón **State** es un patrón de diseño de comportamiento que permite a un objeto alterar su comportamiento cuando su estado interno cambia. Este patrón simula que el objeto cambia su clase, delegando la responsabilidad de su comportamiento a diferentes clases que representan los posibles estados.

![Patrón de diseño State](https://refactoring.guru/images/patterns/content/state/state-es.png)
#### Estructura (Diagrama de Clases)

![Estructura del patrón de diseño State](https://refactoring.guru/images/patterns/diagrams/state/structure-es-indexed.png)

- **Contexto**: Mantiene una referencia a uno de los objetos de estado concretos y le delega el trabajo específico de ese estado.
- **Estado**: Interfaz que declara los métodos que deben ser implementados por los estados concretos.
- **Estado Concreto**: Implementación específica de los métodos de la interfaz Estado para cada estado particular del contexto.
- **Transición de Estado**: El contexto puede cambiar de estado sustituyendo el objeto de estado actual por uno nuevo.

---

## Problema

En un sistema con varios estados posibles, como un objeto **Documento** que puede estar en **Borrador**, **Moderación** y **Publicado**, el código se llena de condicionales (`if` o `switch`) para manejar los diferentes comportamientos según el estado actual. A medida que aumentan los estados, la lógica se vuelve cada vez más compleja y difícil de mantener, con muchos condicionales que seleccionan el comportamiento adecuado.

![Máquina de estados finitos](https://refactoring.guru/images/patterns/diagrams/state/problem1.png)


El patrón **State** resuelve este problema al delegar el comportamiento de cada estado a una clase separada, eliminando la necesidad de condicionales voluminosos.

---

## Solucion

El patrón **State** sugiere crear clases específicas para cada uno de los posibles estados de un objeto. El objeto principal (el **Contexto**) almacena una referencia a un objeto de estado y delega todo el trabajo relacionado con ese estado a dicho objeto. Para cambiar de estado, el contexto simplemente reemplaza el objeto de estado actual por uno nuevo, sin necesidad de modificar la clase de contexto.

![Documento delega el trabajo a un objeto de estado](https://refactoring.guru/images/patterns/diagrams/state/solution-es.png)

Documento delega el trabajo a un objeto de estado.

Este enfoque permite agregar nuevos estados o cambiar los existentes de manera independiente, mejorando la mantenibilidad y la extensión del código.

### Aplicabilidad

Utiliza el patrón **State** cuando:

- Un objeto cambia su comportamiento según su estado.
- El número de estados es grande y cambia con frecuencia.
- El código de la clase está lleno de condicionales que alteran el comportamiento según los valores de los campos.
- Existen comportamientos duplicados para estados similares y transiciones complejas entre los estados.


#### Analogía en el mundo real

Los botones e interruptores de tu smartphone se comportan de forma diferente dependiendo del estado actual del dispositivo:

- Cuando el teléfono está desbloqueado, al pulsar botones se ejecutan varias funciones.
- Cuando el teléfono está bloqueado, pulsar un botón desbloquea la pantalla.
- Cuando la batería del teléfono está baja, pulsar un botón muestra la pantalla de carga.

---

#### Codigo (Esto pide GG)

```java
// Definición de la interfaz Estado
public interface Estado {
    void publicar(Document doc);
}

// Clase Contexto
public class Document {
    private Estado estado;

    public Document() {
        this.estado = new Borrador(); // Estado inicial
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }

    public void publicar() {
        estado.publicar(this);
    }
}

// Estado Borrador
public class Borrador implements Estado {
    @Override
    public void publicar(Document doc) {
        System.out.println("Moviendo documento a Moderación");
        doc.setEstado(new Moderacion());
    }
}

// Estado Moderación
public class Moderacion implements Estado {
    @Override
    public void publicar(Document doc) {
        if (/* verificar si el usuario es administrador */) {
            System.out.println("Documento publicado");
            doc.setEstado(new Publicado());
        } else {
            System.out.println("Solo los administradores pueden publicar en este estado");
        }
    }
}

// Estado Publicado
public class Publicado implements Estado {
    @Override
    public void publicar(Document doc) {
        System.out.println("El documento ya está publicado, no se puede hacer nada");
    }
}

// Uso del patrón State
public class Main {
    public static void main(String[] args) {
        Document doc = new Document();
        doc.publicar(); // Mueve el documento a Moderación
        doc.publicar(); // Mueve el documento a Publicado
        doc.publicar(); // No hace nada, ya está publicado
    }
}

```

### Ventajas y Desventajas

| **VENTAJAS** | **DESVENTAJAS** |
| ------------ | --------------- |
| **Responsabilidad única**: Organiza el código de estados en clases separadas. | **Excesivo en sistemas simples**: Puede ser innecesario si hay pocos estados o cambios poco frecuentes. |
| **Abierto/cerrado**: Añadir nuevos estados sin modificar los existentes. | **Mayor número de clases**: Incrementa la complejidad al requerir clases adicionales. |
| **Eliminación de condicionales**: Reduce los condicionales en el código principal. | **Pequeña sobrecarga**: Puede haber un ligero impacto en el rendimiento debido a los objetos adicionales. |
