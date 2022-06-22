import { useState } from "react";
import useConcerts from "../hooks/useConcerts";

export const validations = () => {
  const [alert, setAlert] = useState(false);
  const [msgAlert, setMsgAlert] = useState("");

  const { showAlert } = useConcerts();

  const validate = (item) => {
    if (item.from === "SingIn") {
      const { email, password } = item;

      if ([email, password].includes("")) {
        showAlert({
          msg: "Todos los campos son obligatorios",
          error: true,
        });
        return false;
      }
      if (!validEmail(email)) {
        showAlert({
          msg: "Email no válido",
          error: true,
        });
        return false;
      }
      return true;
    }

    if (item.from === "SingUp") {
      const { email, stageName, name, surname, phone, password, rePassword } =
        item;

      if (
        [email, stageName, name, surname, phone, password, rePassword].includes(
          ""
        )
      ) {
        showAlert({
          msg: "Todos los campos son obligatorios",
          error: true,
        });
        return false;
      }
      if (!validEmail(email)) {
        showAlert({
          msg: "Email no válido",
          error: true,
        });
        return false;
      }
      if (!validName(name)) {
        showAlert({
          msg: "Nombre no válido",
          error: true,
        });
        return false;
      }
      if (!validName(surname)) {
        showAlert({
          msg: "Apellido no válido",
          error: true,
        });
        return false;
      }
      if (phone.length < 9) {
        showAlert({
          msg: "El teléfono debe tener mas de 9 dígitos",
          error: true,
        });
        return false;
      }
      if (!validNumber(phone)) {
        showAlert({
          msg: "Teléfono no válido",
          error: true,
        });
        return false;
      }
      if (password.length < 6) {
        showAlert({
          msg: "La contraseña debe tener al menos 6 caracteres",
          error: true,
        });
        return false;
      }
      if (password !== rePassword) {
        showAlert({
          msg: "Las contraseñas no coinciden",
          error: true,
        });
        return false;
      }
      return true;
    }

    if (item.from === "EditProfile") {
      const { name, stageName, surname, phone } = item;

      if ([name, stageName, surname, phone].includes("")) {
        showAlert({
          msg: "Todos los campos son obligatorios",
          error: true,
        });
        return false;
      }
      if (!validName(name)) {
        showAlert({
          msg: "Nombre no válido",
          error: true,
        });
        return false;
      }
      if (!validName(surname)) {
        showAlert({
          msg: "Apellido no válido",
          error: true,
        });
        return false;
      }
      if (phone.length < 9) {
        showAlert({
          msg: "El teléfono debe tener mas de 9 dígitos",
          error: true,
        });
        return false;
      }
      if (!validNumber(phone)) {
        showAlert({
          msg: "Teléfono no válido",
          error: true,
        });
        return false;
      }
      return true;
    }

    if (item.from === "FormConcert") {
      const {
        id,
        flyer,
        title,
        genre,
        place,
        date,
        description,
        capacity,
        minimumSales,
        sold,
        gift,
        price,
        enabledSwitchImage,
      } = item;

      if (
        [
          title,
          genre,
          place,
          date,
          description,
          capacity,
          minimumSales,
          price,
        ].includes("")
      ) {
        showAlert({
          msg: "Faltan campos por llenar",
          error: true,
        });
        return false;
      }
      if (!id || enabledSwitchImage) {
        if (flyer === undefined) {
          showAlert({
            msg: "Imagen no válida",
            error: true,
          });
          return false;
        }
        if (!/^image/.test(flyer.type)) {
          showAlert({
            msg: "Formato de imagen no válido",
            error: true,
          });
          return false;
        }
        if (flyer.size > 1500000) {
          showAlert({
            msg: "La imagen no puede ser mayor a 1.5 MB",
            error: true,
          });
          return false;
        }
      }
      if (id && parseInt(capacity) < parseInt(sold)) {
        showAlert({
          msg: `Se han vendido ${sold} entradas, la capacidad no puede ser inferior`,
          error: true,
        });
        return false;
      }
      if (
        parseInt(capacity) <= 0 ||
        parseInt(minimumSales) < 0 ||
        parseInt(price) <= 0
      ) {
        showAlert({
          msg: "Capacidad, precio o ventas minimas incorrectas",
          error: true,
        });
        return false;
      }
      if (parseInt(capacity) < parseInt(minimumSales)) {
        showAlert({
          msg: "Las ventas minimas no pueden ser mayores que la capacidad",
          error: true,
        });
        return false;
      }
      const today = new Date();
      const concertDate = new Date(date.split("T")[0]);
      if (today > concertDate) {
        showAlert({
          msg: "Fecha no válida",
          error: true,
        });
        return false;
      }
      return true;
    }

    if (item.from === "ForgotPass") {
      const { email } = item;

      if ([email].includes("")) {
        showAlert({
          msg: "Todos los campos son obligatorios",
          error: true,
        });
        return false;
      }
      if (!validEmail(email)) {
        showAlert({
          msg: "Email no válido",
          error: true,
        });
        return false;
      }
      return true;
    }

    if (item.from === "NewPass") {
      const { password, rePassword } = item;

      if ([password, rePassword].includes("")) {
        showAlert({
          msg: "Todos los campos son obligatorios",
          error: true,
        });
        return false;
      }
      if (password.length < 6) {
        showAlert({
          msg: "La contraseña debe tener al menos 6 caracteres",
          error: true,
        });
        return false;
      }
      if (password !== rePassword) {
        showAlert({
          msg: "Las contraseñas no coinciden",
          error: true,
        });
        return false;
      }
      return true;
    }
  };

  const RegExpNumbers = /[^0-9]/g;
  const RegExpText =
    /[^a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]/g;

  const validEmail = (val) => {
    return /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/u.test(val);
  };
  const validNumber = (val) => {
    return /^([0-9])*$/u.test(val);
  };
  const validName = (val) => {
    return /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(
      val
    );
  };

  return {
    alert,
    setAlert,
    msgAlert,
    setMsgAlert,
    validate,
    RegExpText,
    RegExpNumbers,
  };
};
