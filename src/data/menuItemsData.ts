import type { MenuItem } from "../types/types";

// Se ha añadido el nuevo enlace a "Descargas"
const menuItems: MenuItem[] = [
  {
    title: "Home",
    url: "#home",  // Enlace a la sección con id="home"
    icon: "",
  },
  {
    title: "Paginas",
    url: "#paginas",  // Enlace a la sección con id="paginas"
    icon: "",
  },
  {
    title: "Tasa Bancos",
    url: "#bancos",  // Enlace a la sección con id="paginas"
    icon: "",
  },
  // --- INICIO DE LA ADICIÓN ---
  {
    title: "Descargas",
    url: "https://www.dolaraldiavzla.com/descarga/", // Enlace directo a la otra página
    icon: "",
  },
  // --- FIN DE LA ADICIÓN ---
];

export default menuItems;
