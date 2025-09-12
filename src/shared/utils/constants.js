export const DROP_DOWN_LIST = [
  { name: "Inicio", path: "Inicio" },
  { name: "Mensajes", path: "Mensajes" },
  { name: "Mis regalos", path: "Regalos" },
  { name: "Mis amigos", path: "Amigos" },
  { name: "Mis grupos", path: "Grupos" },
  { name: "Mi perfil", path: "Mi perfil" },
  { name: "Ayuda", path: "Ayuda" },

]

export const LOGIN_FORM = [
  { name: "email", placeholder: "P. ej. youremail@email.com", type: "email", label: "Email *"  },
  { name: "password", placeholder: "Tu contraseña", type: "password", label: "Contraseña *"  },
]

export const RESET_PASSWORD_FORM = [
  { name: "email", placeholder: "P. ej. youremail@email.com", type: "email", label: "Email *", required: true, },
]

export const INITIAL_RESET_PASSWORD_FORM_DATA = {
  email: "",
};


export const INITIAL_NEW_USER_FORM_DATA = {
  email: "",
  password: "",
};

export const CREATE_PROFILE = [
  {
    name: "avatar",
    placeholder: "Elige un avatar de la lista de arriba",
    type: "text",
    label: "Avatar",
    disabled: true
  },
  {
    name: "name",
    placeholder: "P. ej. María Castañas",
    type: "text",
    label: "Tu nombre *",
    required: true,
  },
  {
    name: "userName",
    placeholder: "P. ej. MariCastañitas55",
    type: "text",
    label: "Nombre de usuario *",
    required: true,
  },
  {
    name: "birthday",
    placeholder: "Date",
    type: "date",
    label: "Fecha de nacimiento *",
    required: true,
  },
]

export const INITIAL_CREATE_PROFILE_DATA = {
  name: "",
  userName: "",
  avatar: "",
  birthday: "",
}

export const AVATAR_IMAGES = [
  { name: "cady-bug", image: "cady-bug.svg", alt: "Cady bug" },
  { name: "cady-gray", image: "cady-gray.svg", alt: "Cady gray" },
  { name: "cady-green", image: "cady-green.svg", alt: "Cady green" },
  { name: "cady-peach", image: "cady-peach.svg", alt: "Cady peach" },
  { name: "cady-purple", image: "cady-purple.svg", alt: "Cady purple" },
  { name: "cady-turquoise", image: "cady-turquoise.svg", alt: "Cady turquoise" },
  { name: "cady-violet", image: "cady-violet.svg", alt: "Cady violet" },
  { name: "cady-yellow", image: "cady-yellow.svg", alt: "Cady yellow" },
  { name: "gifty-bug", image: "gifty-bug.svg", alt: "Gifty bug" },
  { name: "gifty-gray", image: "gifty-gray.svg", alt: "Gifty gray" },
  { name: "gifty-green", image: "gifty-green.svg", alt: "Gifty green" },
  { name: "gifty-peach", image: "gifty-peach.svg", alt: "Gifty peach" },
  { name: "gifty-purple", image: "gifty-purple.svg", alt: "Gifty purple" },
  { name: "gifty-turquoise", image: "gifty-turquoise.svg", alt: "Gifty turquoise" },
  { name: "gifty-violet", image: "gifty-violet.svg", alt: "Gifty violet" },
  { name: "gifty-yellow", image: "gifty-yellow.svg", alt: "Gifty yellow" }
];

export const FIND_FRIEND_FORM = [
  {
    name: "userName",
    placeholder: "P. ej. manoloPetas. No hace falta @",
    type: "text",
    label: "Buscar usuario",
  },
]

export const INITIAL_FIND_FRIEND_DATA = { userName: "" }

export const CREATE_GIFT_FORM = [
  {
    name: "name",
    placeholder: "P. ej. Camiseta",
    type: "text",
    label: "Nombre del regalo *",
    required: true,
  },
  {
    name: "price",
    placeholder: "P. ej. 16",
    type: "text",
    label: "Precio (en €)",
  },
  {
    name: "comments",
    placeholder: "Escribe un comentario sobre el regalo",
    type: "textarea",
    label: "Comentarios",
  },
  {
    name: "shop_link",
    placeholder: "P. ej. https://tienda.com/regalo",
    type: "text",
    label: "Enlace a la tienda",
  },
  {
    name: "size",
    placeholder: "P. ej. XL",
    type: "text",
    label: "Talla",
  },
];

export const IMAGE_INPUT = {
  name: "image",
  type: "file",
  label: "Foto",
  accept: "image/*",
}

export const INITIAL_CREATE_GIFT_FORM_DATA = {
  name: "",
  price: "",
  comments: "",
  "shop_link": "",
  size: "",
  "added_by": "",
  "profile_id": "",
}

export const GROUP_IMAGES = [
  { name: "heart-yellow", image: "/heart-yellow.svg", alt: "heart yellow" },
  { name: "heart-bug", image: "/heart-bug.svg", alt: "heart bug" },
  { name: "heart-green", image: "/heart-green.svg", alt: "heart green" },
  { name: "heart-peach", image: "/heart-peach.svg", alt: "heart peach" },
  { name: "heart-purple", image: "/heart-purple.svg", alt: "heart purple" },
  { name: "star-yellow", image: "/star-yellow.svg", alt: "star yellow" },
  { name: "star-bug", image: "/star-bug.svg", alt: "star bug" },
  { name: "star-green", image: "/star-green.svg", alt: "star green" },
  { name: "star-peach", image: "/star-peach.svg", alt: "star peach" },
  { name: "star-purple", image: "/star-purple.svg", alt: "star purple" },
  { name: "fam-yellow", image: "/fam-yellow.svg", alt: "fam yellow" },
  { name: "fam-bug", image: "/fam-bug.svg", alt: "fam bug" },
  { name: "fam-green", image: "/fam-green.svg", alt: "fam green" },
  { name: "fam-peach", image: "/fam-peach.svg", alt: "fam peach" },
  { name: "fam-purple", image: "/fam-purple.svg", alt: "fam purple" },
]

export const CREATE_GROUP_FORM = [
  {
    name: "avatar",
    placeholder: "Elige un avatar de la lista de arriba",
    type: "text",
    label: "Imagen grupo",
    disabled: true
  },
  {
    name: "name",
    placeholder: "P. ej. Familia 💝",
    type: "text",
    label: "Nombre del grupo *",
    required: true,
  },
  {
    name: "description",
    placeholder: "Una descripción del grupo",
    type: "textarea",
    label: "Descripción",
  },
];

export const INITIAL_CREATE_GROUP_DATA = {
  name: "",
  description: "",
  avatar: "",
}

export const CREATE_EVENT_FORM = [
  {
    name: "name",
    placeholder: "P. ej. Cumple Ana",
    type: "text",
    label: "Nombre del evento *",
    required: true,
  },
  {
    name: "description",
    placeholder: "P. ej. Regalo para el cumple de Ana",
    type: "textarea",
    label: "Descripción del evento",
  },
  {
    name: "date",
    placeholder: "Date",
    type: "date",
    label: "Fecha",
  },
];

export const INITIAL_CREATE_EVENT_DATA = {
  name: "",
  description: "",
  date: new Date().toISOString().split("T")[ 0 ],
}

export const CHANGE_PASSWORD_FORM = [
  {
    name: "password",
    placeholder: "Aquí tu nueva contraseña",
    type: "password",
    label: "Contraseña nueva *",
    required: true,
    disabled: false,
  },
]

export const INITIAL_CHANGE_PASSWORD_DATA =
  {
    password: "",
  }