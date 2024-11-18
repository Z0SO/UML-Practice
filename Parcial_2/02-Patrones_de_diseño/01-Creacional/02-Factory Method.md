


---
## Propósito
El patrón **Factory Method** es un patrón de diseño **creacional** que:
- Proporciona una **interfaz** para crear objetos en una superclase.
- Permite a las **subclases** decidir qué tipo de objetos crear.

---

## Problema
Imagina que estás desarrollando una aplicación de gestión logística que inicialmente solo soporta transporte en **camión**. 

Con el tiempo, necesitas añadir soporte para transporte **marítimo**. Sin embargo:
- El código está altamente **acoplado** a la clase `Camión`.
- Modificarlo para incluir `Barco` implicaría:
  - Cambios extensivos en el código base.
  - Introducir **condicionales** que lo harían poco mantenible.

![Añadir una nueva clase de transporte al programa provoca un problema](https://refactoring.guru/images/patterns/diagrams/factory-method/problem1-es.png)

*Añadir una nueva clase al programa no es tan sencillo si el resto del código ya está acoplado a clases existentes.*


### Solución: **Patrón Factory Method**

El **patrón Factory Method** sugiere reemplazar la creación directa de objetos mediante el operador `new` con la invocación de un **método fábrica**. Este método encapsula la creación de los objetos, aunque internamente siga utilizando el operador `new`. Los objetos generados a través del método fábrica son comúnmente denominados **productos**.

---

### Estructura de las **clases creadoras**

Las **subclases** tienen la capacidad de modificar la clase de los objetos retornados por el método fábrica.

#### ¿Por qué es útil?
Aunque a simple vista parezca que solo se está cambiando el lugar donde se invoca al constructor, este enfoque ofrece una ventaja clave: permite sobrescribir el método fábrica en una subclase, modificando así el tipo de producto que se genera.

#### Restricciones:
- Las subclases solo pueden devolver productos de **distintos tipos** si estos comparten una **clase base** o una **interfaz común**.
- El método fábrica de la clase base debe declarar su tipo de retorno como la interfaz o clase base común.

---

#### Estructura de la **jerarquía de productos**

Todos los productos generados mediante el método fábrica deben implementar una **interfaz común**.

#### Ejemplo:
- **Interfaz común**: `Transporte`
  - **Camión**: Implementa `entrega`, especificando que transporta carga por tierra.
  - **Barco**: Implementa `entrega`, indicando que transporta carga por mar.

Las clases creadoras específicas, como `LogísticaTerrestre` y `LogísticaMarítima`, retornan productos adecuados a su contexto: 
- **LogísticaTerrestre** devuelve **Camiones**.
- **LogísticaMarítima** devuelve **Barcos**.

---

### Estructura del código con el patrón Factory Method

Siempre que los productos implementen una interfaz común, el código cliente puede utilizar sus objetos sin necesidad de conocer sus detalles internos.

#### Beneficio clave:
El código cliente (que utiliza el método fábrica) no encuentra diferencias entre los productos retornados por diversas subclases. Simplemente interactúa con ellos como instancias de la clase base o interfaz común, como en el caso de `Transporte`.

Por ejemplo, el cliente sabe que todos los objetos de `Transporte` tienen un método llamado `entrega`, pero no necesita saber cómo se implementa en cada tipo específico de producto.

---
### Ejemplo:  
Si luego necesitas agregar transporte **aéreo**, tendrías que repetir este proceso, creando un código complejo y difícil de escalar.

#### Estructura (Diagrama de Clases)


![La estructura de las clases creadoras](https://refactoring.guru/images/patterns/diagrams/factory-method/solution1.png)

Las subclases pueden alterar la clase de los objetos devueltos por el método fábrica.


### **Pseudocódigo**

### **Clases Base**
```plaintext
// Interfaz común para productos
interface Button {
    render()
    onClick(action)
}

// Clase creadora base
abstract class Dialog {
    abstract createButton(): Button

    method render() {
        Button okButton = createButton()
        okButton.onClick(closeDialog)
        okButton.render()
    }
}
```

### **Clases Concretas**
```java
// Productos concretos
class WindowsButton implements Button {
    render() { /* Renderiza un botón estilo Windows */ }
    onClick(action) { /* Vincula un evento nativo de clic */ }
}

class HTMLButton implements Button {
    render() { /* Devuelve un botón HTML */ }
    onClick(action) { /* Vincula un evento de clic del navegador */ }
}

// Creadores concretos
class WindowsDialog extends Dialog {
    createButton(): Button {
        return new WindowsButton()
    }
}

class WebDialog extends Dialog {
    createButton(): Button {
        return new HTMLButton()
    }
}
```

### **Uso**
```java
class Application {
    Dialog dialog

    method initialize() {
        if (OS == "Windows") dialog = new WindowsDialog()
        else if (OS == "Web") dialog = new WebDialog()
        else throw "Error: Sistema desconocido."
    }

    method main() {
        initialize()
        dialog.render()
    }
}
```

---
## **Aplicabilidad**

### Usa el Factory Method cuando:
1. **No conoces de antemano** los tipos exactos de objetos necesarios en tu código.
2. Quieres proporcionar una forma **extensible** de construir objetos en un **framework**.
3. Deseas **reutilizar objetos existentes** (por ejemplo, usando un cache o pool).


---
### Ventajas y Desventajas

| **VENTAJAS**                                                                                                                                                | **DESVENTAJAS**                                                                                          |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| - **Desacopla** la creación de objetos de su uso.<br>- Facilita la **extensibilidad**.<br>- Mejora la **mantenibilidad** al evitar condicionales complejos. | - Puede incrementar la **complejidad** si necesitas muchas subclases para diferentes tipos de productos. |

---

## **Ejemplo Práctico**
En un sistema de interfaz gráfica:
- Una clase base `Dialog` puede usar un método fábrica `createButton` para instanciar botones.
- Las subclases (`WindowsDialog`, `WebDialog`) deciden el tipo de botón (Windows o HTML).

Este patrón asegura que la lógica del diálogo no dependa de los detalles específicos del botón.



---
