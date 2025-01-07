import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default {
  extends: [...compat.extends("next/core-web-vitals", "next/typescript")],
  rules: {
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // 사용되지 않는 변수 경고 비활성화
    "no-unused-vars": "off", // 기본 no-unused-vars 규칙 비활성화
    "react-hooks/exhaustive-deps": "off", // useEffect의 의존성 배열 경고 비활성화
  },
};
