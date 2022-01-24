import { FC, memo, useCallback, useEffect, useState, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import axios from "axios";
import { Button } from "../Button/Button";
import Image from "next/image";
import toast from "react-hot-toast";
import { TextArea } from "../Form/TextArea";
import { SelectBox } from "../Form/SelectBox";
import { JAVA_API_URL } from "../../utils/const";
import { loginIdContext } from "../../providers/LoginIdProvider";
import useSWR from "swr";
import { UserInfo } from "../../types/type";

type Props = {
  isOpen: boolean; // モーダルが開いているかどうか
  closeModal: () => void; // モーダルを閉じるメソッド
  title: "レビュー" | "つぶやき" | "コメント"; // レビュー/つぶやき/コメント
  restaurantId?: number; // 店のID(レビュー投稿なら渡ってくる)。投稿の際にAPIに渡す。
  postId?: number; // タイムラインもしくはレビューのID(コメント投稿なら渡ってくる)。投稿の際にAPIに渡す
  target?: "timeline" | "reviews"; // 対象の投稿がタイムラインかレビューか(コメント投稿なら渡ってくる)
  success?: () => void; //投稿完了後、自動で更新したい場合は更新のメソッドを渡す
};

/**
 * つぶやきもしくはレビューもしくはコメントを投稿するためのモーダルのコンポーネント.
 */
export const PostModal: FC<Props> = memo((props) => {
  const {
    isOpen,
    closeModal,
    title,
    restaurantId = 0,
    postId = 0,
    target,
    success,
  } = props;

  // ログイン中のユーザーidを取得
  const userId = useContext(loginIdContext);

  //入力テキストの内容を格納するstate
  const [post, setPost] = useState<string>("");

  //入力テキスト残り文字数
  const [postLength, setPostLength] = useState<number>(0);

  // 星の数の選択オプション
  const starOptions = [
    { id: "5", name: "5" },
    { id: "4", name: "4" },
    { id: "3", name: "3" },
    { id: "2", name: "2" },
    { id: "1", name: "1" },
  ];
  // 選択した星の数を格納するstate
  const [star, setStar] = useState(starOptions[0]);

  /**
   * 入力テキストの内容をstateに格納する.
   */
  const inputPost = useCallback((e) => {
    setPost(e.target.value);
  }, []);

  /**
   * 入力内容を投稿するメソッド.
   * @remarks API完成したらこのメソッド内で送信.
   * titleによって投稿するAPIを変える。
   */
  const sendPost = async () => {
    if (post === "") {
      alert("入力して下さい");
      return;
    }
    if (post.length > 140) {
      alert(`${title}は140文字以内にして下さい`);
      return;
    }

    if (title === "レビュー") {
      try {
        //レビュー投稿
        // await axios.post(`${JAVA_API_URL}/reviews`, {
        //   userId,
        //   post,
        //   star: Number(star.id),
        // });
        toast.success(
          `id${restaurantId}のお店に${title}を投稿しました\n${title}内容: ${post}, 星の数: ${star}`,
        );
      } catch (e) {
        toast.error(`${title}の投稿に失敗しました`);
      }

      closeModal();
      setPost("");
    }
    if (title === "つぶやき") {
      try {
        const res = await axios.post(`${JAVA_API_URL}/timeline`, {
          userId: userId,
          sentence: post,
        });
        toast.success(`${title}を投稿しました\n${title}内容: ${post}`);
        if (success) {
          success();
        }
      } catch (e) {
        toast.error(`${title}の投稿に失敗しました`);
      }
      closeModal();
      setPost("");
    }
    if (title === "コメント") {
      try {
        //コメント投稿
        // await axios.post(`${JAVA_API_URL}/${target}/comment`, {
        //   userId,
        //   post, // コメント内容
        //   postId, // コメント対象の投稿のID
        // });
        toast.success(
          `id${postId}の${target}に${title}を投稿しました\n${title}内容: ${post}`,
        );
      } catch {
        toast.error(`${title}の投稿に失敗しました`);
      }
      closeModal();
      setPost("");
    }
  };

  /**
   * リアルタイムに文字数をカウントしてくれる.
   */
  useEffect(() => {
    setPostLength(140 - post.length);
  }, [post.length]);

  /**
   * APIを使用して画像データ取得.
   */
  const { data, error } = useSWR(`${JAVA_API_URL}/user/${userId}`);
  // 個人情報をdataから抽出
  const userPhoto = data?.user.userPhotoPath;

  if (!error && !data) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>データを取得できませんでした</div>;
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          {/* モーダルの背景を暗くする */}
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* モーダルを画面の中央に配置するための要素 */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            {/* モーダルの中身部分 */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-lg sm:max-w-2xl p-10 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-bold leading-6 text-text-brown text-center"
                >
                  {title}を投稿
                </Dialog.Title>
                {/* レビューの登録なら、星の数を選択してもらう */}
                <div className="mt-2">
                  <div className="mt-10">
                    {title === "レビュー" && (
                      <div className="flex gap-3 items-center mb-3">
                        評価: 星
                        <SelectBox
                          selectedOption={star}
                          select={setStar}
                          options={starOptions}
                        />
                        つ
                      </div>
                    )}
                    {title}内容を下記に入力して下さい。(140字以内)
                  </div>
                  <div className="flex flex-col sm:flex-row mt-5">
                    <div className="ml-5">
                      <Image
                        src={`/image/userIcon/${userPhoto}`}
                        width={100}
                        height={100}
                        alt="icon"
                        className="rounded-full"
                      />
                    </div>
                    <div className="sm:mx-5">
                      <form>
                        <TextArea
                          value={post}
                          rows={10}
                          cols={28}
                          onChange={inputPost}
                        />
                      </form>
                      <span className={`${postLength < 0 && "text-red-700"}`}>
                        残り文字数：{postLength}
                      </span>
                    </div>
                  </div>
                </div>
                {/* 投稿/キャンセルのボタン */}
                <div className="mt-4 flex gap-5 justify-center">
                  <Button label={"投稿"} onClick={sendPost} />
                  <Button
                    backgroundColor="#f6f0ea"
                    color="#622d18"
                    label={"キャンセル"}
                    onClick={closeModal}
                  />
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
});
