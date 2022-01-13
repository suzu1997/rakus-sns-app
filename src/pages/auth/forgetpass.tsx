import { NextPage } from "next";
import { TextInput } from "../../components/TextInput";
import { Button } from "../../components/Button";
/**
 * パスワードを忘れたときの画面
 * @returns パスワードを忘れたときの画面
 */
const ForgetPass: NextPage = () => {
  };

  return (
    <>
      <div className="border-solid  border-2 border-bgc-200 m-10  shadow-lg rounded-xl text-center">
        <div className="mt-10 ">
          ご登録いただいているメールアドレスをご入力してください
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
            <div className="mt-10 mb-10">
              <Button
                label="送信"
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
export default ForgetPass;
