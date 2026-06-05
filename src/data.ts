/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from "./types";

// Import generated assets for seamless Vite bundling
import abejitasImg from "./assets/images/abejitas_socks_1780616772151.png";
import cervezaImg from "./assets/images/cerveza_socks_1780616743398.png";
import pizzaImg from "./assets/images/pizza_socks_1780616756933.png";
import chiliImg from "./assets/images/chili_socks_1780616785003.png";

export const PRODUCTS: Product[] = [
  {
    id: "aguacates",
    name: "Medias de Aguacates",
    subtitle: "Vibrantes, verdes y listas para el brunch. El accesorio perfecto.",
    description: "Nuestras divertidas medias de aguacates felices le devuelven la chispa a tus días. Fabricadas en algodón hilado extra suave, son cómodas y listas para combinar con tu mejor brunch de fin de semana.",
    price: 12.99,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYBg_fMNoBrpKC8Mkf5Zlrr5-eEkvZAIoIu9wZvM5kfl8tqVjt7Irb_N_cR_mr8snrDkmctN99YidckPNNjsl_KsTpoKGy6KGyGLS0TXkAjJqrC8PDsdT7Fo2C_f6sIH6ddog4b05Fyjpjcd6zEzP9UXynoGtFb1hAjhrlSs5h-BhHO_AOuzhT14d_HOP7SCOpUw-QSKKQx8UXfPeMrh0lQIuoZgA6m2uDdVZE4PRTlpPEy4ojjePs9uULPorjZYA0qP74fb5fs-8",
    bgColor: "bg-lime text-black",
    specs: ["Algodón extra peinado", "Ajuste elástico súper cómodo", "Suela afelpada anti-impacto"],
    sizes: ["S", "M", "L"],
    limitedEdition: true,
    galleryImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCYBg_fMNoBrpKC8Mkf5Zlrr5-eEkvZAIoIu9wZvM5kfl8tqVjt7Irb_N_cR_mr8snrDkmctN99YidckPNNjsl_KsTpoKGy6KGyGLS0TXkAjJqrC8PDsdT7Fo2C_f6sIH6ddog4b05Fyjpjcd6zEzP9UXynoGtFb1hAjhrlSs5h-BhHO_AOuzhT14d_HOP7SCOpUw-QSKKQx8UXfPeMrh0lQIuoZgA6m2uDdVZE4PRTlpPEy4ojjePs9uULPorjZYA0qP74fb5fs-8"
    ]
  },
  {
    id: "alien",
    name: "Medias de Alien",
    subtitle: "Fuera de este mundo. Cósmicamente cómodas.",
    description: "Prepárate para abducir miradas con estas medias de otro universo. Presentan un diseño de cara alienígena retro que brilla bajo luces psicodélicas, ofreciendo un ajuste estelar de algodón galáctico peinado.",
    price: 14.99,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCp6gYV6e3fQ5YON3Njwakn6imHugKNcfI25fsO-UANXnTAAQnfCmthJ-OCMWYTKXal26Tp_HtSJkLjyoNJt5PbqnCvHEfMRRbAfbeKiJF6a81yEyyogQUoBErUSRMcYDaj0urGIJftXbIlufjQZxJ1Vo6yl2NGFKrMIZ5wlqT73tFLP2baClPJMUrqnaW-EFuuFz7XH91O6v1PyzA1eQSeDstBUK4_URaxIvZPq8DONaR7lGhXF0amtMWyaIEz9ahmPQwS32ZQCH8",
    bannerImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuATSg0GMW7qQidDg50AxhdS1dAvolJ4YIx0M8Y-ybtMb7dr71QwRCXuQx3oVNp0fvBrs37qauj5Ivz1Rb-U3dPusrO5Ej3G2nwkdw6FB5J3VMd_geGwZlgLRHakdd58bB4F97RHyZDLYAEncyLHksNA3TdqINSjODa5U1rPghJDNQlIKvJFvcMVI0a86oCfB_Bz9dPSByFjYOYJ1T63Ro_kzMvBdKA4U6p4yb0e_h7ge30SZS6vscVWQMEGLs4_BHZXz-KBcsGdh9Q",
    bgColor: "bg-electric text-white",
    specs: ["Algodón galáctico", "Ajuste estelar", "Diseño que brilla (en la oscuridad)"],
    sizes: ["S", "M", "L"],
    limitedEdition: true,
    galleryImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDQeCvYLcNnN6GGaCNDw-30jZueGkYnZNYbz_mtC7Jt_9iZw4Dri5ZF7yQICYhmtlmLVjhsTX8xGpV6s4khLaOx5IXhOUd38Uuv5_9CzvYBfpjIupZRk1C6Q87TdkkMYzKxLo_u10zBcUcDsH1JLmdvyKAFfzNapm22ZvuO5cmWzdNv2tfOuYPhj-R3Cu4Lcvt2rfTRHa3JBVZT7NOzI3vDF30a8Bd6HdMEtTiAoXyiHEUxrrCVch5Xc-qkwKGwhAFiBrvDxMPz3oA",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCMJMno4R6TgTVOfJDXVa0krXK50ym074SYxLx8nb9p9VntzpOyDHPEpCFbc7KWUhHDRx6QEJYUkktyOCKJvq9djzfNAhwp3QHxIH2mcbThfIFgfiTF9EXo2QN5XXPUOPgYsBlLiiSXUKkJDWO2TwBoKb8fwXOO1mjZ2mvSdaX-DY304aqlemASVgrnZ98lczBJCBJ4g5sQnlVeEdxkdAmQliEFH-bvkrL4En-Wgk1M71bCzcMUhkPy_VN94nXAXuXPUrMah8mfV8Y"
    ]
  },
  {
    id: "cafe",
    name: "Si puedes leer esto...",
    subtitle: "Mensajes directos para gente que necesita cafeína.",
    description: "La manera perfecta de comunicarte por las mañanas sin gastar saliva. Cuando levantas tus pies en tu sillón favorito, el mensaje 'TRÁEME CAFÉ' se leerá alto y claro para todos en la habitación.",
    price: 11.50,
    image: "TRÁEME CAFÉ",
    bgColor: "bg-bubblegum text-white", // Magenta background box
    specs: ["Mensaje de goma antideslizante", "Tejido térmico ultra cálido", "Costura invisible de puntera"],
    sizes: ["S", "M", "L"],
    limitedEdition: false,
    galleryImages: []
  },
  {
    id: "michis",
    name: "Michis Espaciales",
    subtitle: "Gatos + Espacio = Perfección. Felicidad en tus tobillos.",
    description: "Una sinergia cósmica entre gatitos astronautas y cielos estrellados. Diseñadas para arrancar una sonrisa y calentar tus pasos con el confort de una de nuestras lanas espaciales predilectas.",
    price: 15.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMNCUWWpT8CYj-9WqT2IzbmF2t8bvlspZxSHrqwG68bktoubcN4NwpDhz3W_i__1Mik7qay3TqUVd7gZ1aFkwdVLEcIU03bJMmm-eDwP4ZTE5oPTWQ3hj8bbrKgzZY3HOINRIIh1e58oKtAc00bSSnhI1ceD4ql-Mowjd8BAoiloYxw6gj1UoK0YP7gVx1HJmT1W739blgLKepMj-FAGfaWPhmVkRrvthC4kj0S8OaNX617S0V2LPbuYWLMeRdpGjG1TQmonj1z-Y",
    bgColor: "bg-surface-container-low text-black",
    specs: ["Hebra de lana térmica", "Colores de neón de larga duración", "Bandas de soporte de arco"],
    sizes: ["S", "M", "L"],
    limitedEdition: false,
    galleryImages: []
  },
  {
    id: "cerveza",
    name: "Medias de Cerveza Bien Fría",
    subtitle: "Refrescantes y con estilo espumoso para tus mejores momentos.",
    description: "Nuestras divertidas medias de tarros de cerveza bien helados con espuma rebosante. Tienen un diseño de pop art súper alegre perfecto para reuniones familiares, asados o un viernes relajado.",
    price: 12.50,
    image: cervezaImg,
    bgColor: "bg-yellow-400 text-black",
    specs: ["Tarritos tejidos en jacquard de alta definición", "Soporte de talón reforzado", "Canales de ventilación transpirable"],
    sizes: ["S", "M", "L"],
    limitedEdition: true,
    galleryImages: [cervezaImg]
  },
  {
    id: "pizza",
    name: "Medias de Pizza Cósmica",
    subtitle: "Rebanadas de pura felicidad espacial intergaláctica.",
    description: "Rebanadas calientes y crujientes con queso fundido flotando en el espacio sideral de neón. El regalo definitivo para los amantes de la pizza que no quieren comprometer la comodidad extrema.",
    price: 13.00,
    image: pizzaImg,
    bgColor: "bg-orange-500 text-white",
    specs: ["Doble densidad en metatarso", "Hilo térmico aislante de frío", "Elasticidad expandible hasta 2x"],
    sizes: ["S", "M", "L"],
    limitedEdition: false,
    galleryImages: [pizzaImg]
  },
  {
    id: "abejitas",
    name: "Medias de Abejitas Felices",
    subtitle: "Sabor a miel en tus pasos, vibración súper dulce.",
    description: "Ponle un zumbido de optimismo a tus zapatillas con estas adorables abejitas polinizadoras de neón amarillo y panales geométricos. Suaves como el polen gracias a la microfibra elástica.",
    price: 11.99,
    image: abejitasImg,
    bgColor: "bg-amber-400 text-black",
    specs: ["Microfibra peinada extra suave", "Costura plana en la puntera anti-roce", "Colores resistentes a más de 100 lavadas"],
    sizes: ["S", "M", "L"],
    limitedEdition: false,
    galleryImages: [abejitasImg]
  },
  {
    id: "chili",
    name: "Medias de Chili Picante",
    subtitle: "Puro fuego para destacar tus tenis más cool.",
    description: "Las medias más calientes de toda la colección. Con ajíes de rojo neón picante que le darán un shock de energía instantáneo a cualquier outfit urbano y aburrido.",
    price: 13.50,
    image: chiliImg,
    bgColor: "bg-red-500 text-white",
    specs: ["Compresión en empeine activo", "Fibra de bambú hipoalergénica", "Talón reforzado en hilos de nylon"],
    sizes: ["S", "M", "L"],
    limitedEdition: true,
    galleryImages: [chiliImg]
  }
];

