export interface MiembroFamilia {
  slug: string;
  nombre: string;
  rol: string;
  foto: string;
  dedicacion: string;
  presentacion: string;
  especialidades: string[];
  redes: {
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
  };
}

export const miembrosFamilia: MiembroFamilia[] = [
  {
    slug: 'abel-hombono-tatanka',
    nombre: 'Abel Hombono Tatanka',
    rol: 'Temazcaltiani, Jefe de danza del sol',
    foto: '/Abel.jpeg',
    dedicacion: 'Guía ceremonial del Temazcal tradicional de cuatro puertas, guardián del fuego sagrado y líder de la Danza del Sol en la tradición mexihka.',
    presentacion: 'Hombre de medicina y sabiduría ancestral con décadas de camino en el rezo del fuego, el temazcal y la tradición roja. Su labor principal es sostener un espacio sagrado, seguro y respetuoso en la chinampa de Cuemanco para que cada persona y cada familia reconecte con sus raíces, sane sus linajes y honre la vida en profunda comunión con la naturaleza.',
    especialidades: ['Temazcales terapéuticos y tradicionales', 'Jefe de Danza del Sol', 'Filosofía y cosmovisión mexihka', 'Consejería de vida y orientación espiritual'],
    redes: {
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
      whatsapp: 'https://wa.me/525534872329?text=Hola%20Abel%2C%20me%20gustar%C3%ADa%20conocer%20m%C3%A1s%20sobre%20tus%20ceremonias%20en%20Tierra%20Sagrada'
    }
  },
  {
    slug: 'oso',
    nombre: 'Oso',
    rol: 'Águila de Fuego, Danzante del sol',
    foto: '/oso.jpeg',
    dedicacion: 'Custodio del fuego sagrado en el temazcal (Hombre de Fuego), encendido y consagración de las piedras volcánicas (abuelitas) y apoyo logístico en el santuario chinampero.',
    presentacion: 'Con corazón firme y temple sereno, Oso resguarda la puerta y el fuego ceremonial que alimenta la medicina del temazcal. Caminante comprometido con la disciplina de la Danza del Sol, cuida con devoción cada detalle del espacio para que quienes nos visitan crucen los canales con tranquilidad y encuentren un refugio de paz.',
    especialidades: ['Custodio del Fuego Sagrado', 'Danza del Sol', 'Logística y navegación en canoa', 'Sostén del altar de piedra'],
    redes: {
      instagram: 'https://instagram.com',
      whatsapp: 'https://wa.me/525534872329?text=Hola%20Oso%2C%20te%20contacto%20desde%20Tierra%20Sagrada'
    }
  },
  {
    slug: 'abraham-ortiz',
    nombre: 'Abraham Ortiz',
    rol: 'Águila de Fuego, Danzante del sol',
    foto: '/Abraham.jpeg',
    dedicacion: 'Guardián del fuego ceremonial, facilitador del traslado en canoa tradicional, preparación de infusiones herbales y cuidado de la chinampa.',
    presentacion: 'Caminante del fuego y buscador constante de la armonía con la tierra. Abraham facilita la experiencia desde el momento del abordaje en el embarcadero de Cuemanco hasta la preparación de las aguas medicinales que bañan las piedras ardientes en el temazcal. Su servicio alegre y atento es pilar para toda la familia.',
    especialidades: ['Águila de Fuego', 'Preparación de infusiones medicinales', 'Manejo de canoa y canales', 'Preservación chinampera'],
    redes: {
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
      whatsapp: 'https://wa.me/525534872329?text=Hola%20Abraham%2C%20me%20gustar%C3%ADa%20contactarte%20por%20Tierra%20Sagrada'
    }
  },
  {
    slug: 'enrique-itzcuauhtli',
    nombre: 'Enrique Itzcuauhtli',
    rol: 'Águila de Fuego, Danzante del sol',
    foto: '/Enrique.jpeg',
    dedicacion: 'Portador del rezo del águila, apoyo en la preparación y sostenimiento del temazcal, cuidado de las plantas sagradas y resguardo del espacio ceremonial.',
    presentacion: 'Dedicado al rescate de las raíces ancestrales y a la comunión respetuosa entre el ser humano y el lago de Xochimilco. Su energía integra la fuerza solar con la humildad del trabajo comunitario en la chinampa, recordando que servir a la familia y a la medicina es el camino más elevado.',
    especialidades: ['Águila de Fuego', 'Danzante del Sol', 'Cuidado de plantas medicinales', 'Sostén ceremonial'],
    redes: {
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
      whatsapp: 'https://wa.me/525534872329?text=Hola%20Enrique%2C%20te%20escribo%20desde%20Tierra%20Sagrada'
    }
  },
  {
    slug: 'monica-alvarez',
    nombre: 'Mónica Álvarez Xochitlmeztlaxohtli',
    rol: 'Mujer Medicina, Danzante de luna',
    foto: '/Moni.jpeg',
    dedicacion: 'Facilitadora de círculos de cacao criollo y medicina del corazón, sahumadora tradicional, danzante de luna y custodia de la herbolaria femenina.',
    presentacion: 'Portadora de la medicina de la flor y de la luna. Mónica guía a las personas en procesos de introspección profunda mediante el canto medicinal, el sahumador de barro y la dulzura del cacao puro elaborado en metate. Su labor busca despertar el amor propio, sanar el útero y abrir la palabra dulce en cada círculo.',
    especialidades: ['Ceremonias de Cacao Criollo en Metate', 'Círculos de Mujeres y Rezo Lunar', 'Sahumación y limpias energéticas', 'Cantos de medicina'],
    redes: {
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
      whatsapp: 'https://wa.me/525534872329?text=Hola%20M%C3%B3nica%2C%20me%20encantar%C3%ADa%20saber%20m%C3%A1s%20sobre%20tus%20c%C3%ADrculos%20de%20cacao'
    }
  },
  {
    slug: 'abuela-lulu',
    nombre: 'Abuela Lulu Xochiquetzali',
    rol: 'Mujer Medicina, Portadora de la tierra, Danzante del sol y de luna',
    foto: '/6.jpeg',
    dedicacion: 'Sanadora tradicional, consejera comunitaria, limpias energéticas con hierbas de olor, sahumación de altares y guía espiritual.',
    presentacion: 'Con la nobleza y sabiduría de la tierra fértil, la Abuela Lulu acoge a quienes llegan a Tierra Sagrada con un abrazo materno que disuelve la pesadumbre. Conoce las propiedades curativas de las hojas y flores de nuestra chinampa y comparte su experiencia para que cada visitante recuerde su valor y armonía interior.',
    especialidades: ['Medicina de la Tierra', 'Limpias con ramo herbal y copal', 'Consejería ancestral', 'Danza del Sol y Luna'],
    redes: {
      instagram: 'https://instagram.com',
      whatsapp: 'https://wa.me/525534872329?text=Hola%20Abuela%20Lulu%2C%20te%20contacto%20desde%20Tierra%20Sagrada'
    }
  },
  {
    slug: 'abuela-leticia',
    nombre: 'Abuela Leticia Acatzin',
    rol: 'Mujer Medicina, Portadora de fuego, Danzante del sol y de luna',
    foto: '/19.jpeg',
    dedicacion: 'Guía de rezos de fuego, medicina de la palabra, armonización de espacios y enseñanza de cantos sagrados tradicionales.',
    presentacion: 'Guardiana de la flama viva y de la palabra impecable. Su canto acompaña la entrada de las abuelitas al temazcal, encendiendo el coraje y la claridad en los corazones afligidos. Su testimonio de vida inspira a mujeres y hombres a mantenerse firmes en su propósito espiritual.',
    especialidades: ['Portadora del Fuego Sagrado', 'Cantos tradicionales de Temazcal', 'Armonización de espacios', 'Rezo comunitario'],
    redes: {
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
      whatsapp: 'https://wa.me/525534872329?text=Hola%20Abuela%20Leticia%2C%20te%20contacto%20desde%20Tierra%20Sagrada'
    }
  },
  {
    slug: 'abuela-diana',
    nombre: 'Abuela Diana Quiahuitzin',
    rol: 'Mujer Medicina, Portadora del agua, Danzante del sol y de luna',
    foto: '/15.jpeg',
    dedicacion: 'Trabajo con el elemento agua, baños florales de purificación, bendición de semillas y siembra sagrada en la chinampa.',
    presentacion: 'Mujer de ternura y fluidez profunda como los canales de Xochimilco. Enseña a soltar lo que no fluye y a nutrir la semilla de la paz interior mediante la conexión con el agua sagrada de la lluvia y del lago. Su presencia es un bálsamo de calma para el alma.',
    especialidades: ['Medicina del Agua', 'Baños florales y fitoterapia', 'Bendición de semillas', 'Conexión con los ciclos naturales'],
    redes: {
      instagram: 'https://instagram.com',
      whatsapp: 'https://wa.me/525534872329?text=Hola%20Abuela%20Diana%2C%20te%20contacto%20desde%20Tierra%20Sagrada'
    }
  },
  {
    slug: 'abuela-laura',
    nombre: 'Abuela Laura Miztlixochitl',
    rol: 'Mujer Medicina, Portadora del viento, Danzante del sol y de luna',
    foto: '/20.jpeg',
    dedicacion: 'Terapia de sonido y cantos al viento, toque de caracol marino ceremonial (Atecocolli), sahumerios de copal y desahogo emocional.',
    presentacion: 'Su voz y el sonido profundo del caracol marino convocan a los cuatro rumbos del universo al inicio de cada ceremonia. Nos recuerda que el aire que respiramos es el aliento de vida que nos une como una sola gran familia. Su alegría y ligereza ayudan a liberar cargas pesadas.',
    especialidades: ['Medicina del Viento', 'Toque ceremonial de caracol (Atecocolli)', 'Cantos sagrados al viento', 'Sahumación tradicional'],
    redes: {
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
      whatsapp: 'https://wa.me/525534872329?text=Hola%20Abuela%20Laura%2C%20te%20contacto%20desde%20Tierra%20Sagrada'
    }
  }
];

export const getMiembroBySlug = (slug: string): MiembroFamilia | undefined => {
  return miembrosFamilia.find((m) => m.slug === slug);
};
