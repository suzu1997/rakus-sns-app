import { FC, useCallback, useState } from "react";
import { Button } from "../../../components/Button";
import { MenuBar } from "../../../components/MenuBar";
import { TextInput } from "../../../components/TextInput";

const RestaurantAdd: FC = () => {
  const [restaurantName, setRestaurantName] = useState("");

  const inputRestaurantName = useCallback((e) => {
    setRestaurantName(e.target.value);
  }, []);

  const search = () => {
    alert("ホットペッパー検索");
  };

  return (
    <div className="flex">
      <MenuBar />
      <div className="p-10">
        <h1 className="text-3xl">お店を新規登録するページ</h1>
        <TextInput
          label={"店名"}
          value={restaurantName}
          type={"text"}
          fullWidth={true}
          required={true}
          onChange={inputRestaurantName}
        />
        <Button label="検索" onClick={search} />
      </div>
    </div>
  );
};

export default RestaurantAdd;
