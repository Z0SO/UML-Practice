
## Patrón Proxy

### Concepto

Proxy es un patrón de diseño estructural que permite proporcionar un sustituto o marcador de posición para otro objeto. Controla el acceso al objeto original, permitiendo ejecutar acciones adicionales antes o después de que la solicitud llegue al objeto original.

![Patrón de diseño Proxy](https://refactoring.guru/images/patterns/content/proxy/proxy.png)
#### Estructura (Diagrama de Clases)

![Estructura del patrón de diseño Proxy](https://refactoring.guru/images/patterns/diagrams/proxy/structure-indexed.png)

1. La **Interfaz de Servicio** declara la interfaz del Servicio. El proxy debe seguir esta interfaz para poder camuflarse como objeto de servicio.

2. **Servicio** es una clase que proporciona una lógica de negocio útil.

3. La clase **Proxy** tiene un campo de referencia que apunta a un objeto de servicio. Cuando el proxy finaliza su procesamiento (por ejemplo, inicialización diferida, registro, control de acceso, almacenamiento en caché, etc.), pasa la solicitud al objeto de servicio.

>    Normalmente los proxies gestionan el ciclo de vida completo de sus objetos de servicio.
   
4. El **Cliente** debe funcionar con servicios y proxies a través de la misma interfaz. De este modo puedes pasar un proxy a cualquier código que espere un objeto de servicio.

---

## Problema

En ocasiones, se necesita controlar el acceso a un objeto que consume muchos recursos del sistema, como una base de datos o un servicio remoto. Si estos objetos se cargan siempre, se desperdician recursos innecesariamente. Además, escribir código para inicialización diferida en cada cliente puede resultar en duplicación de código.

![Problema resuelto por el patrón Proxy](https://refactoring.guru/images/patterns/diagrams/proxy/problem-es.png)

Las consultas a las bases de datos pueden ser muy lentas.

Por ejemplo, en una biblioteca que descarga videos, los videos se descargan repetidamente en lugar de reutilizarse desde un caché.

---

## Solución

El patrón Proxy propone crear una clase proxy que implemente la misma interfaz que el objeto original. Esta clase delega el trabajo al objeto de servicio, pero puede añadir funcionalidad adicional, como inicialización diferida o almacenamiento en caché.

![Solución con el patrón Proxy](https://refactoring.guru/images/patterns/diagrams/proxy/solution-es.png)

*El proxy se camufla como objeto de la base de datos. Puede gestionar la inicialización diferida y el caché de resultados sin que el cliente o el objeto real de la base de datos lo sepan.*

Por ejemplo, un proxy para un descargador de videos puede almacenar en caché los resultados y reutilizarlos para evitar descargas repetidas.

---

### Aplicabilidad

1. **Inicialización diferida (Proxy Virtual):** Cuando un objeto de servicio pesado utiliza recursos innecesariamente al ser creado de inmediato. Un proxy puede retrasar su creación hasta que sea necesario.
2. **Control de acceso (Proxy de Protección):** Restringe el acceso al objeto original según credenciales o condiciones.
3. **Ejecución local de un servicio remoto (Proxy Remoto):** Maneja la comunicación con un servicio remoto, ocultando los detalles de red.
4. **Registro de solicitudes (Proxy de Registro):** Guarda un historial de solicitudes al objeto de servicio.

#### Código

```java
// Interfaz del servicio
interface VideoDownloader {
    String downloadVideo(String url);
}

// Servicio real
class RealVideoDownloader implements VideoDownloader {
    @Override
    public String downloadVideo(String url) {
        System.out.println("Descargando video desde: " + url);
        return "Video descargado: " + url;
    }
}

// Proxy
class CachedVideoDownloader implements VideoDownloader {
    private RealVideoDownloader downloader;
    private Map<String, String> cache;

    public CachedVideoDownloader() {
        this.downloader = new RealVideoDownloader();
        this.cache = new HashMap<>();
    }

    @Override
    public String downloadVideo(String url) {
        if (cache.containsKey(url)) {
            System.out.println("Video recuperado del caché: " + url);
            return cache.get(url);
        }
        String video = downloader.downloadVideo(url);
        cache.put(url, video);
        return video;
    }
}

// Uso
public class ProxyPatternExample {
    public static void main(String[] args) {
        VideoDownloader downloader = new CachedVideoDownloader();

        // Primera descarga (sin caché)
        downloader.downloadVideo("https://video1.com");

        // Segunda descarga (desde caché)
        downloader.downloadVideo("https://video1.com");
    }
}
```

```markdown
---
## Patrón Proxy

### Concepto

Proxy es un patrón de diseño estructural que permite proporcionar un sustituto o marcador de posición para otro objeto. Controla el acceso al objeto original, permitiendo ejecutar acciones adicionales antes o después de que la solicitud llegue al objeto original.

#### Estructura (Diagrama de Clases)

![Ejemplo de estructura del patrón Proxy](https://refactoring.guru/images/patterns/diagrams/proxy/example.png)

---

## Problema

En ocasiones, se necesita controlar el acceso a un objeto que consume muchos recursos del sistema, como una base de datos o un servicio remoto. Si estos objetos se cargan siempre, se desperdician recursos innecesariamente. Además, escribir código para inicialización diferida en cada cliente puede resultar en duplicación de código.

Por ejemplo, en una biblioteca que descarga videos, los videos se descargan repetidamente en lugar de reutilizarse desde un caché.

---

## Solución

El patrón Proxy propone crear una clase proxy que implemente la misma interfaz que el objeto original. Esta clase delega el trabajo al objeto de servicio, pero puede añadir funcionalidad adicional, como inicialización diferida o almacenamiento en caché.

Por ejemplo, un proxy para un descargador de videos puede almacenar en caché los resultados y reutilizarlos para evitar descargas repetidas.

---

### Aplicabilidad

1. **Inicialización diferida (Proxy Virtual):** Cuando un objeto de servicio pesado utiliza recursos innecesariamente al ser creado de inmediato. Un proxy puede retrasar su creación hasta que sea necesario.
2. **Control de acceso (Proxy de Protección):** Restringe el acceso al objeto original según credenciales o condiciones.
3. **Ejecución local de un servicio remoto (Proxy Remoto):** Maneja la comunicación con un servicio remoto, ocultando los detalles de red.
4. **Registro de solicitudes (Proxy de Registro):** Guarda un historial de solicitudes al objeto de servicio.

#### Código

```java
// Interfaz del servicio
interface VideoDownloader {
    String downloadVideo(String url);
}

// Servicio real
class RealVideoDownloader implements VideoDownloader {
    @Override
    public String downloadVideo(String url) {
        System.out.println("Descargando video desde: " + url);
        return "Video descargado: " + url;
    }
}

// Proxy
class CachedVideoDownloader implements VideoDownloader {
    private RealVideoDownloader downloader;
    private Map<String, String> cache;

    public CachedVideoDownloader() {
        this.downloader = new RealVideoDownloader();
        this.cache = new HashMap<>();
    }

    @Override
    public String downloadVideo(String url) {
        if (cache.containsKey(url)) {
            System.out.println("Video recuperado del caché: " + url);
            return cache.get(url);
        }
        String video = downloader.downloadVideo(url);
        cache.put(url, video);
        return video;
    }
}

// Uso
public class ProxyPatternExample {
    public static void main(String[] args) {
        VideoDownloader downloader = new CachedVideoDownloader();

        // Primera descarga (sin caché)
        downloader.downloadVideo("https://video1.com");

        // Segunda descarga (desde caché)
        downloader.downloadVideo("https://video1.com");
    }
}
```

---

### Ventajas y Desventajas

| **VENTAJAS**                                                                                 | **DESVENTAJAS**                                                                      |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Permite controlar el acceso a un objeto sin que los clientes lo noten.                       | Introduce complejidad al agregar clases adicionales.                                 |
| Gestiona el ciclo de vida de objetos de servicio según sea necesario.                        | Puede causar demoras en la respuesta del servicio debido al procesamiento del proxy. |
| Funciona incluso si el objeto de servicio no está disponible o preparado.                    |                                                                                      |
| Cumple con el principio de abierto/cerrado al permitir agregar proxies sin modificar clases. |                                                                                      |
