import { Meta, Story } from "@storybook/react";
import { Button, Props } from "../components/Button";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Button",
  component: Button,
} as Meta;

/// 1. Storybookで描画するためのコンポーネントの雛形を用意しておく
const Template: Story<Props> = (args) => <Button {...args} />;

// 2. bindを用いて雛形を元にしたコピーを作成
// 名前付きエクスポートはデフォルトでストーリーオブジェクトを表す
export const Default: Story<Props> = Template.bind({});
// 3. Propsに値を設定しない
Default.args = {
  label: "Default",
};

export const SubButton: Story<Props> = Template.bind({});
SubButton.args = {
  label: "SubButton",
  backgroundColor: "#f6f0ea",
  color: "#622d18",
};

export const Small: Story<Props> = Template.bind({});
Small.args = {
  label: "Small",
  size: "sm",
};
export const Large: Story<Props> = Template.bind({});
Large.args = {
  label: "Large",
  size: "lg",
};

export const SubSmall: Story<Props> = Template.bind({});
SubSmall.args = {
  label: "SubSmall",
  backgroundColor: "#f6f0ea",
  color: "#622d18",
  size: "sm",
};

