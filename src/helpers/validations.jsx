import { useState } from "react";
import useConcerts from "../hooks/useConcerts";

export const validations = () => {
  const [alert, setAlert] = useState(false);
  const [msgAlert, setMsgAlert] = useState("");

  const { showAlert } = useConcerts();

  const validate = (user) => {
    if (user.from === "SingIn") {
      const { email, password } = user;

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

    if (user.from === "SingUp") {
      const { email, stageName, name, surname, phone, password, rePassword } =
        user;

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

    if (user.from === "EditProfile") {
      const { name, stageName, surname, phone } = user;

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
//TODO falta add concert, forgotpass y new pass
    if (user.from === "AddBalance") {
      const { balance } = user;

      if ([balance].includes("")) {
        setMsgAlert("Saldo no válido");
        setAlert(true);
        return false;
      }
      if (parseInt(balance) <= 0) {
        setMsgAlert("El saldo no puede ser negativo");
        setAlert(true);
        return false;
      }
      if (parseInt(balance) > 5000) {
        setMsgAlert("No se puede recargar mas de 5000€ por recarga");
        setAlert(true);
        return false;
      }
      if (!validNumber(balance)) {
        setMsgAlert("Saldo no válido");
        setAlert(true);
        return false;
      }
      return true;
    }

    if (user.from === "ForgotPass") {
      const { email } = user;

      if ([email].includes("")) {
        setMsgAlert("Todos los campos son obligatorios");
        setAlert(true);
        return false;
      }
      if (!validEmail(email)) {
        setMsgAlert("Email no válido");
        setAlert(true);
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
