
---

## Patrón (Facade) Concepto  

El **Facade** es un patrón de diseño estructural que ofrece una **interfaz simplificada** para trabajar con bibliotecas, frameworks o sistemas complejos.  
Permite ocultar la complejidad del subsistema, facilitando su uso para los clientes.  

![Patrón de diseño Facade](https://refactoring.guru/images/patterns/content/facade/facade.png)

#### Analogía en el mundo real

![Un ejemplo de recepción de un pedido por teléfono](https://refactoring.guru/images/patterns/diagrams/facade/live-example-es.png)

***Haciendo pedidos por teléfono.***

*Cuando llamas a una tienda para hacer un pedido por teléfono, un operador es tu fachada a todos los servicios y departamentos de la tienda. El operador te proporciona una sencilla interfaz de voz al sistema de pedidos, pasarelas de pago y varios servicios de entrega.*

---

## Estructura (Diagrama de Clases)  
![Estructura del patrón de diseño Facade](https://refactoring.guru/images/patterns/diagrams/facade/structure-indexed.png)

El patrón consta de:  
1. Una **Fachada**, que actúa como intermediario.
2. Puede crearse una clase **Fachada Adicional** para evitar contaminar una única fachada con funciones no relacionadas que podrían convertirla en otra estructura compleja.
3. Un **Subsistema Complejo**, compuesto por múltiples clases y objetos.  
4. Un **Cliente**, que interactúa únicamente con la Fachada.  

---

## Problema  

Cuando trabajas con un sistema complejo, el cliente debe:  
1. Inicializar múltiples objetos.  
2. Coordinar sus dependencias.  
3. Invocar métodos en un orden específico.  

Esto hace que el código sea difícil de mantener y estrechamente ligado al sistema interno.  

---

## Solución  

Implementar una **fachada**, que:  
- Proporcione una interfaz simple para acceder al subsistema.  
- Oculte los detalles de implementación complejos.  
- Se limite a las funcionalidades necesarias para el cliente.

Por ejemplo:  
Una aplicación que sube videos podría usar una biblioteca compleja para conversión de formatos. En lugar de interactuar directamente con el sistema, puede utilizar una fachada con un método simple como `convertir(archivo, formato)`.

---

### Aplicabilidad  

1. **Cuando necesitas una interfaz simple**:  
   - Si el subsistema es muy complejo, la fachada reduce la curva de aprendizaje.  

2. **Cuando deseas estructurar en capas**:  
   - Separa subsistemas complejos en niveles y define una fachada para cada nivel.  

Ejemplo: Un framework de conversión de video puede dividirse en dos capas:  
- Una para **video**.  
- Otra para **audio**.  

Cada capa puede tener su propia fachada para mantener el código organizado y desacoplado.  

---

#### Código  

```java
// Subsistema complejo
class SistemaVideo {
    void codificarVideo(String archivo) {
        System.out.println("Codificando video: " + archivo);
    }
}

class SistemaAudio {
    void ajustarAudio(String archivo) {
        System.out.println("Ajustando audio: " + archivo);
    }
}

// Fachada
class FachadaConversor {
    private SistemaVideo sistemaVideo;
    private SistemaAudio sistemaAudio;

    public FachadaConversor() {
        this.sistemaVideo = new SistemaVideo();
        this.sistemaAudio = new SistemaAudio();
    }

    public void convertir(String archivo) {
        sistemaAudio.ajustarAudio(archivo);
        sistemaVideo.codificarVideo(archivo);
        System.out.println("Conversión completa para: " + archivo);
    }
}

// Cliente
public class Cliente {
    public static void main(String[] args) {
        FachadaConversor conversor = new FachadaConversor();
        conversor.convertir("video.mp4");
    }
}
```

---

### Ventajas y Desventajas  

| **VENTAJAS**                                          | **DESVENTAJAS**                                      |
| ---------------------------------------------------- | -------------------------------------------------- |
| Simplifica la interacción con sistemas complejos.    | Puede convertirse en un punto de acoplamiento fuerte. |
| Aísla al cliente de cambios en el subsistema.        | Si no se gestiona bien, puede crecer y volverse complejo. |
| Mejora la legibilidad y el mantenimiento del código. | Limita el acceso a funcionalidades específicas del subsistema. |

--- 