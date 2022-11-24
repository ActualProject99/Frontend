import { LoginForm, OptionCreator } from "./types";

export const cls = (...classes: (string | undefined | boolean)[]) =>
  classes
    .filter((className) => className && typeof className === "string")
    .join(" ");

export const optionCreator: OptionCreator =
  (option) =>
  (customOpts = {}) => {
    const [name, opts] = option;
    return [name, { ...opts, ...customOpts }];
  };

export const regOptLogin = {
  email: optionCreator<LoginForm>([
    "email",
    {
      required: "email이 입력되지 않았습니다.",
      pattern: {
        value:
          /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
        message: "email 형식을 확인해주세요",
      },
    },
  ]),
  password: optionCreator<LoginForm>([
    "password",
    {
      required: "비밀번호를 입력해주세요",
      pattern: {
        value: /(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])/i,
        message: "영문, 숫자, 특수문자를 조합해서 입력해주세요.",
      },
      minLength: {
        value: 8,
        message: "비밀번호는 최소 8자 이상 입력해 주세요",
      },
      maxLength: {
        value: 16,
        message: "비밀번호는 최대 16자 까지만 입력해 주세요",
      },
    },
  ]),
};
export const scrollTo = (top: number) => {
  window.scrollTo({
    top,
    behavior: "smooth",
  });
};
export const shuffle = (array: any[]) => {
  let currentIndex = array.length;
  let randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

type baseArr = any[] | baseArr[];

export const highDimArr = (Arr: baseArr, indexs: number[]) => {
  const arrDim = (Arr: baseArr) => {
    let i = 0;
    while (Array.isArray(Arr[0])) {
      Arr = Arr.flat();
      i++;
    }
    return i + 1;
  };
  const itering = (Arr: baseArr, iter: IterableIterator<number>): any => {
    const { value } = iter.next();
    if (arrDim(Arr) !== 1) return itering(Arr[value], iter);
    return Arr[value];
  };
  if (arrDim(Arr) !== indexs.length) return;
  const iter = indexs[Symbol.iterator]();
  return itering(Arr, iter);
};
