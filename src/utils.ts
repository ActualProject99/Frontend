import { LoginForm, CommentForm, OptionCreator } from "./types";

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
        value: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
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
  comfirm: optionCreator<LoginForm>([
    "comfirm",
    {
      required: "비밀번호를 확인해주세요.",
    },
  ]),
  nickname: optionCreator<LoginForm>([
    "nickname",
    {
      required: "닉네임을 입력해주세요",
      pattern: {
        value: /^[가-힣0-9]{3,10}$/,
        message: "한글, 숫자를 혼용하여 입력해주세요",
      },
      minLength: {
        value: 3,
        message: "최소 3자 이상의 닉네임을 입력해주세요",
      },
      maxLength: {
        value: 10,
        message: "10자 이하의 닉네임만 사용가능합니다",
      },
    },
  ]),
  phoneNumber: optionCreator<LoginForm>([
    "phoneNumber",
    {
      required: "연락처를 입력해주세요",
      pattern: {
        value: /^[0-9\b -]{0,11}$/,
        message: "숫자 11자 이하만 가능합니다.",
      },
    },
  ]),
};

export const regOptComment = {
  comment: optionCreator<CommentForm>([
    "comment",
    {
      maxLength: {
        value: 300,
        message: "",
      },
      minLength: {
        value: 3,
        message: "3자 미만으로 작성할 수 없습니다.",
      },
    },
  ]),
  editcomment: optionCreator<CommentForm>([
    "editcomment",
    {
      maxLength: {
        value: 300,
        message: "",
      },
      minLength: {
        value: 3,
        message: "3자 미만으로 작성할 수 없습니다.",
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

export const filterClassStartwith = (
  className: string,
  ...starts: string[]
) => {
  return className
    .split(" ")
    .filter((cn) => starts.some((st) => cn.startsWith(st)))
    .join(" ");
};
