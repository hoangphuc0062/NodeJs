export const validate = (payload, setInvalidFields) => {
  let invalids = 0;

  const formalPayload = Object.entries(payload);
  for (let arr of formalPayload) {
    if (arr[1].trim() === "") {
      setInvalidFields((prev) => [
        ...prev,
        { name: arr[0], mes: "Require this field. " },
      ]);
      invalids++;
    }
  }
  for (let arr of formalPayload) {
    switch (arr[0]) {
      case "email":
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!arr[1].match(regex)) {
          setInvalidFields((prev) => [
            ...prev,
            { name: arr[0], mes: "Email is invalid " },
          ]);
          invalids++;
        }
        break;
      case "password":
        if (arr[1].length < 6) {
          setInvalidFields((prev) => [
            ...prev,
            { name: arr[0], mes: "Password minium 6 character." },
          ]);
          invalids++;
        }
        break;
      default:
        break;
    }
  }

  return invalids;
};
export const handleSlug = (input) => {
  return input.toLowerCase().replace(/\s+/g, "-");
};
export const handleCheckAuthen = () => {
  if (localStorage.getItem("persist:shop/user")) {
    return true;
  }
  return false;
};
