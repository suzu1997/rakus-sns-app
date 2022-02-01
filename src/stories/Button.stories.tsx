import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button } from "../components/Button/Button";
import { action } from "@storybook/addon-actions";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Button",
  component: Button,
} as ComponentMeta<typeof Button>;

/// 1. Storybookで描画するためのコンポーネントの雛形を用意しておく
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

// 2. bindを用いて雛形を元にしたコピーを作成
// 名前付きエクスポートはデフォルトでストーリーオブジェクトを表す
export const Default: ComponentStory<typeof Button> = Template.bind({});
// 3. Propsに値を設定しない
Default.args = {
  label: "Default",
  onClick: action("clicked!"),
};
Default.storyName = "デフォルト";

export const SubButton: ComponentStory<typeof Button> = Template.bind({});
SubButton.args = {
  label: "SubButton",
  backgroundColor: "#f6f0ea",
  color: "#622d18",
};
SubButton.storyName = "サブボタン";

export const Small: ComponentStory<typeof Button> = Template.bind({});
Small.args = {
  label: "Small",
  size: "sm",
};
Small.storyName = "小さいボタン";

export const Large: ComponentStory<typeof Button> = Template.bind({});
Large.args = {
  label: "Large",
  size: "lg",
};
Large.storyName = "大きいボタン";

export const SubSmall: ComponentStory<typeof Button> = Template.bind({});
SubSmall.args = {
  label: "SubSmall",
  backgroundColor: "#f6f0ea",
  color: "#622d18",
  size: "sm",
};
SubSmall.storyName = "小さいサブボタン";
