import {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import Image from "next/image";
import Cookies from "universal-cookie";

import { TextInput } from "../../components/Form/TextInput";
import { Button } from "../../components/Button/Button";
import { Radio } from "../../components/Form/Radio";
import { TextArea } from "../../components/Form/TextArea";
import { PasswordModal } from "../../components/Modal/PasswordModal";
import { useUserEdit } from "../../hooks/useUserEdit";
import { useModal } from "../../hooks/useModal";
import { JAVA_API_URL } from "../../utils/const";
import { UserInfo } from "../../types/type";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
/**
 * ユーザー情報編集画面
 * @returns ユーザー情報を編集するためのページ
 */
const Edit: NextPage<Props> = (props) => {
  const { initialData } = props;
  const { handleSubmit, cancel, register, errors, onSubmit, userData } =
    useUserEdit(initialData.user);

  const modalStore = useModal();
  const { modalStatus, openModal, closeModal } = modalStore;

  return (
    <>
      <div>
        <PasswordModal modalStatus={modalStatus} closeModal={closeModal} />
        <div className="text-center bg-bgc border-solid  border-2 border-bgc-200 m-10 shadow-lg rounded-md">
          <div className="flex flex-col items-center">
            <div className="mt-3 text-3xl font-extrabold">ユーザー情報編集</div>
            <div>
              {userData ? (
                <Image
                  src={`/image/userIcon/${userData.userPhotoPath}`}
                  width={200}
                  height={200}
                  alt="icon"
                ></Image>
              ) : (
                <div className="flex justify-center pt-10 w-full">
                  <div className="animate-spin h-8 w-8 bg-basic rounded-xl"></div>
                </div>
              )}
            </div>
            <div
              onClick={openModal}
              className="text-text-brown my-5 cursor-pointer hover:text-basic"
            >
              パスワード変更はこちら
            </div>
            <div className="flex flex-col items-center mt-10">
              <div className="flex w-96 gap-3 mt-3">
                {/* 姓のテキストフォーム */}
                <TextInput
                  label="姓"
                  type="text"
                  fullWidth={false}
                  required
                  placeholder="姓"
                  registers={register("firstName")}
                />
                {/* registers={register} でバリデーション機能に登録される */}
                {/* errors はバリデーションエラー内容を持つ構造体で自動で更新される */}

                {/* 名のテキストフォーム */}
                <TextInput
                  label="名"
                  type="text"
                  fullWidth={false}
                  required
                  placeholder="名"
                  registers={register("lastName")}
                />
              </div>
              <div className="text-red-500">{errors.firstName?.message}</div>
              <div className="text-red-500">{errors.lastName?.message}</div>

              <div className="w-96 mt-3">
                {/* アカウント名のテキストフォーム */}
                <TextInput
                  label="アカウント名"
                  type="text"
                  fullWidth={true}
                  required
                  placeholder="アカウント名"
                  registers={register("accountName")}
                />
                <div className="text-red-500">
                  {errors.accountName?.message}
                </div>
              </div>
              <div className="w-96 mt-3">
                {/* 入社月のテキストフォーム*/}
                <TextInput
                  label="入社月"
                  type="month"
                  fullWidth={true}
                  required
                  registers={register("hireDate")}
                />
                <div className="text-red-500">{errors.hireDate?.message}</div>
              </div>
              {/* 職種のラジオボタン */}
              <div className="mt-3">職種を選択してください</div>
              <div className="text-red-500">{errors.serviceFk?.message}</div>
              <div className="flex gap-5">
                <Radio
                  id="FR"
                  value="1"
                  name="serviceFk"
                  registers={register("serviceFk")}
                />
                <Radio
                  id="Java"
                  value="2"
                  name="serviceFk"
                  registers={register("serviceFk")}
                />
                <Radio
                  id="CL"
                  value="3"
                  name="serviceFk"
                  registers={register("serviceFk")}
                />
                <Radio
                  id="QA"
                  value="4"
                  name="serviceFk"
                  registers={register("serviceFk")}
                />
                <Radio
                  id="ML"
                  value="5"
                  name="serviceFk"
                  registers={register("serviceFk")}
                />
                <Radio
                  id="内勤"
                  value="6"
                  name="serviceFk"
                  registers={register("serviceFk")}
                />
              </div>
              <div className="w-96 mt-3">
                {/* 誕生日のテキストフォーム */}
                <TextInput
                  label="誕生日"
                  type="date"
                  fullWidth={true}
                  required
                  registers={register("birthDay")}
                />
                <div className="text-red-500">{errors.birthDay?.message}</div>
              </div>
              {/* 自己紹介のテキストフォーム */}
              <div className="my-5">
                <TextArea
                  label="プロフィール"
                  rows={6}
                  cols={30}
                  registers={register("introduction")}
                />
                <div className="text-red-500">
                  {errors.introduction?.message}
                </div>
              </div>
              <div className="flex gap-3 mt-10 mb-10">
                <Button
                  label="更新"
                  backgroundColor="#f28728"
                  color="white"
                  size="md"
                  onClick={handleSubmit(onSubmit)}
                />

                <Button
                  label="キャンセル"
                  backgroundColor="#f6f0ea"
                  color="#f28728"
                  size="md"
                  onClick={cancel}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/**
 * SSRで初期データ取得.
 * @returns つぶやき詳細データ
 */
export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext,
) => {
  const cookies = new Cookies(ctx.req.headers.cookie);
  const hash = cookies.get("hash");
  const res = await fetch(`${JAVA_API_URL}/user/${hash}`);
  const initialData: UserInfo = await res.json();

  return {
    props: { initialData },
  };
};

export default Edit;
