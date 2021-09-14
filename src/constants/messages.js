/*const translateMessage = (message) => {
  const messages = {
    invalid_credentials: "La combinación de usuario y clave es incorrecta.",
  };

  return messages[message] || message;
};
export default translateMessage;*/
export default (message) => {
  const messages = {
    invalid_credentials: "La combinación de correo y contraseña es incorrecta",
    '{"email":["validation.unique"]}':
      "Ya existe un conductor registrado con ese correo",
    "passwords.token": "El correo ingresado no coincide con el de la petición",
  };
  return messages[message] || message;
};
