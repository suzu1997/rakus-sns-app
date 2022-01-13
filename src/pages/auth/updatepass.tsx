import { NextPage } from "next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TextInput } from "../../components/TextInput";
import { Button } from "../../components/Button";
/**
 * パスワードを忘れたときの画面
 * @returns パスワードを忘れたときの画面
 */
const UpdatePass: NextPage = () => {
  return (
    <>
      <div className="border-solid  border-2 border-bgc-200 m-10  shadow-lg rounded-xl text-center">
        <div className="mt-10 ">
          以下のフォームよりパスワードの更新をお願いします
        </div>
        <form name="SignupForm" noValidate>
          <div className="flex flex-col items-center mt-5">
            <div className="gap-3 w-96 mt-3">
              {/* メールアドレスのテキストフォーム */}
              <TextInput
                label="メールアドレス"
                type="text"
                fullWidth={true}
                required
                placeholder="メールアドレス"
              />
            </div>
            <div className="w-96 mt-3">
              {/* パスワードのテキストフォーム */}
              <TextInput
                label="パスワード(半角英数字)"
                type="password"
                fullWidth={true}
                required
                placeholder="8文字以上16文字以内(大文字小文字数字含む)"
              />
            </div>
            <div className="w-96 mt-3">
              {/* 確認用パスワードのテキストフォーム */}
              <TextInput
                label="確認用パスワード(半角英数字)"
                type="password"
                fullWidth={true}
                required
                placeholder="8文字以上16文字以内(大文字小文字数字含む)"
              />
            </div>
            <div className="mt-10 mb-10">
              <Button
                label="変更"
                backgroundColor="#f28728"
                color="white"
                size="md"
              />
            </div>{" "}
          </div>{" "}
        </form>
      </div>
    </>
  );
};
export default UpdatePass;
