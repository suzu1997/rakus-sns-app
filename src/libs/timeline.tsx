import useSWR from "swr";

export const GetTimelineData = () => {
  const { data, error } = useSWR("http://localhost:8080/user/1", fetch);

  console.log("発動");
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  console.dir("コンポーネント" + data);
  return data;
};
